import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 5000;

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(cors());
app.use(express.json());

app.get('/api/services', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*');

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password, role, address } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from('users')
      .insert([{ name, email, password: hashedPassword, role, address }])
      .select()
      .single();

    if (error) throw error;

    const userResponse = { ...data };
    delete userResponse.password;

    res.json({ success: true, user: userResponse });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (error) throw error;
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const userResponse = { ...user };
    delete userResponse.password;

    res.json({ success: true, user: userResponse });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/bookings', async (req, res) => {
  try {
    const { user_id, service_id, email, pickup_date, pickup_time, address } = req.body;

    const { data, error } = await supabase
      .from('bookings')
      .insert([{
        user_id,
        service_id,
        email,
        pickup_date,
        pickup_time,
        address,
        status: 'pending',
        payment_status: 'completed'
      }])
      .select()
      .single();

    if (error) throw error;

    const { data: userData } = await supabase
      .from('users')
      .select('eco_points')
      .eq('id', user_id)
      .single();

    if (userData) {
      await supabase
        .from('users')
        .update({ eco_points: userData.eco_points + 10 })
        .eq('id', user_id);
    }

    res.json({ success: true, booking: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/bookings/:email', async (req, res) => {
  try {
    const { email } = req.params;

    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        service:services(*)
      `)
      .eq('email', email)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/bookings', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        service:services(*),
        user:users(name, email)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch('/api/bookings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const { data, error } = await supabase
      .from('bookings')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    if (updates.status === 'completed' && updates.rating) {
      const { data: booking } = await supabase
        .from('bookings')
        .select('user_id')
        .eq('id', id)
        .single();

      if (booking) {
        const { data: userData } = await supabase
          .from('users')
          .select('eco_points')
          .eq('id', booking.user_id)
          .single();

        if (userData) {
          await supabase
            .from('users')
            .update({ eco_points: userData.eco_points + 20 })
            .eq('id', booking.user_id);
        }
      }
    }

    res.json({ success: true, booking: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/profile/:email', async (req, res) => {
  try {
    const { email } = req.params;

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userResponse = { ...data };
    delete userResponse.password;

    res.json(userResponse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`QuickWash 2.0 server running on port ${PORT}`);
});
