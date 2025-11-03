/*
  # QuickWash 2.0 Database Schema

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text, unique)
      - `password` (text, hashed)
      - `role` (text, either 'customer' or 'provider')
      - `eco_points` (integer, default 0)
      - `address` (text, optional)
      - `created_at` (timestamptz)
    
    - `services`
      - `id` (uuid, primary key)
      - `name` (text)
      - `price` (integer)
      - `description` (text)
      - `icon` (text)
      - `created_at` (timestamptz)
    
    - `bookings`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users)
      - `service_id` (uuid, foreign key to services)
      - `email` (text)
      - `pickup_date` (timestamptz)
      - `pickup_time` (text)
      - `address` (text)
      - `status` (text, default 'pending')
      - `payment_status` (text, default 'completed')
      - `rating` (integer, optional)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public access since we're using mock auth
*/

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  password text NOT NULL,
  role text NOT NULL CHECK (role IN ('customer', 'provider')),
  eco_points integer DEFAULT 0,
  address text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read users"
  ON users
  FOR SELECT
  USING (true);

CREATE POLICY "Public can create user"
  ON users
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public can update users"
  ON users
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price integer NOT NULL,
  description text NOT NULL,
  icon text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view services"
  ON services
  FOR SELECT
  USING (true);

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  service_id uuid REFERENCES services(id),
  email text NOT NULL,
  pickup_date timestamptz NOT NULL,
  pickup_time text NOT NULL,
  address text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'completed', 'rejected')),
  payment_status text DEFAULT 'completed',
  rating integer CHECK (rating >= 1 AND rating <= 5),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view bookings"
  ON bookings
  FOR SELECT
  USING (true);

CREATE POLICY "Public can create booking"
  ON bookings
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public can update bookings"
  ON bookings
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

INSERT INTO services (name, price, description, icon) VALUES
  ('Laundry', 199, 'Complete wash and fold service', 'Shirt'),
  ('Ironing', 99, 'Professional ironing service', 'Wind'),
  ('Shoe Clean', 149, 'Deep cleaning for shoes', 'FootprintsIcon'),
  ('Dry Clean', 299, 'Premium dry cleaning', 'Sparkles')
ON CONFLICT DO NOTHING;