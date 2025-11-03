# QuickWash 2.0 - Project Structure

## Directory Overview

```
quickwash-2.0/
├── server/                      # Backend API server
│   ├── index.js                # Express server with all API routes
│   ├── package.json            # Backend dependencies
│   └── .env                    # Backend environment variables
│
├── src/                        # Frontend source code
│   ├── components/             # Reusable React components
│   │   └── AIAssistant.tsx    # Floating AI chatbot widget
│   │
│   ├── context/               # React context for global state
│   │   ├── AuthContext.tsx   # User authentication state
│   │   └── ThemeContext.tsx  # Dark mode state
│   │
│   ├── pages/                 # Page components (routes)
│   │   ├── Splash.tsx        # Splash screen with animation
│   │   ├── Login.tsx         # Login page
│   │   ├── Signup.tsx        # Registration page
│   │   ├── Home.tsx          # Main dashboard
│   │   ├── BookService.tsx   # Service booking page
│   │   ├── MyBookings.tsx    # Customer bookings list
│   │   ├── Profile.tsx       # User profile & eco-points
│   │   └── Admin.tsx         # Provider dashboard
│   │
│   ├── utils/                # Utility functions
│   │   └── api.ts           # API call wrappers
│   │
│   ├── App.tsx              # Main app with routing
│   ├── main.tsx             # App entry point
│   └── index.css            # Global styles
│
├── .env                     # Frontend environment variables
├── package.json            # Frontend dependencies
├── tailwind.config.js      # Tailwind CSS configuration
├── vite.config.ts         # Vite build configuration
└── README.md              # Documentation

```

## Key Files Explained

### Backend (server/)

**index.js** - Express server with RESTful API endpoints:
- `GET /api/services` - Fetch all available services
- `POST /api/signup` - Create new user account
- `POST /api/login` - Authenticate user
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/:email` - Get user's bookings
- `GET /api/bookings` - Get all bookings (admin)
- `PATCH /api/bookings/:id` - Update booking status
- `GET /api/profile/:email` - Get user profile

### Frontend (src/)

**Context Providers:**
- `AuthContext` - Manages user login state and localStorage
- `ThemeContext` - Manages dark mode preference

**Pages:**
- `Splash` - Animated intro screen, redirects to login
- `Login` - User authentication for customers and providers
- `Signup` - Account registration with role selection
- `Home` - Service browsing, search, and quick actions
- `BookService` - Complete booking flow with date/time selection
- `MyBookings` - View orders, rate services, track status
- `Profile` - User info, eco-points, water saved statistics
- `Admin` - Provider dashboard with analytics and order management

**Components:**
- `AIAssistant` - Floating chatbot with predefined responses

**Utils:**
- `api.ts` - Axios-based API client for backend communication

## Database Schema (Supabase)

### users
- id (uuid, primary key)
- name (text)
- email (text, unique)
- password (text, hashed with bcrypt)
- role (text: 'customer' or 'provider')
- eco_points (integer, default 0)
- address (text, optional)
- created_at (timestamptz)

### services
- id (uuid, primary key)
- name (text)
- price (integer)
- description (text)
- icon (text)
- created_at (timestamptz)

### bookings
- id (uuid, primary key)
- user_id (uuid, foreign key)
- service_id (uuid, foreign key)
- email (text)
- pickup_date (timestamptz)
- pickup_time (text)
- address (text)
- status (text: pending/accepted/completed/rejected)
- payment_status (text, default 'completed')
- rating (integer, 1-5, optional)
- created_at (timestamptz)

## Features Implemented

### Authentication
- Dual role system (Customer/Provider)
- Bcrypt password hashing
- LocalStorage-based session management
- Protected routes based on user role

### Service Booking
- Date picker for pickup scheduling
- Time slot selection (10:00 AM, 2:00 PM, 6:00 PM)
- Address input with prefill from user profile
- Mock payment with instant confirmation

### Eco-Points System
- +10 points per booking completion
- +20 bonus points for rating services
- Water saved calculation (2.5L per 10 points)
- Visual stats on profile page

### Provider Dashboard
- Real-time booking management
- Accept/Reject/Complete order actions
- Analytics with Chart.js visualizations
- Revenue and customer tracking

### AI Assistant
- Floating chat widget on all pages
- Context-aware responses for:
  - Pricing inquiries
  - Combo offers
  - Eco-benefits
  - Pickup scheduling
  - Service recommendations

### Dark Mode
- Toggle switch in navigation
- Preference saved in localStorage
- Full app theme support with Tailwind dark: classes

### Animations
- Framer Motion page transitions
- Smooth hover effects on cards
- Loading states for async operations
- Splash screen animation

## Tech Stack Details

### Frontend Dependencies
- **React 18** - UI library
- **TypeScript** - Type safety
- **React Router v6** - Client-side routing with lazy loading
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **Axios** - HTTP client
- **Chart.js + react-chartjs-2** - Data visualization

### Backend Dependencies
- **Express.js** - Web server framework
- **@supabase/supabase-js** - Database client
- **bcryptjs** - Password hashing
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## Running the Project

### Development Mode

**Terminal 1 - Backend:**
```bash
cd server
npm start
```
Server runs on http://localhost:5000

**Terminal 2 - Frontend:**
```bash
npm run dev
```
App runs on http://localhost:5173

### Production Build

```bash
npm run build
npm run preview
```

## Environment Setup

Both `.env` files are pre-configured with Supabase credentials. No additional setup needed for database connectivity.

## Color Scheme

- **Primary**: Teal (#00BFA5)
- **Dark Background**: Gray-900 (#0D0D0D)
- **Light Background**: Gray-50 (#F5F5F5)
- **Success**: Green
- **Warning**: Yellow
- **Error**: Red
- **Info**: Blue

## Font

**Poppins** - Google Fonts
- Used throughout the app for modern, clean typography
- Weights: 300, 400, 500, 600, 700, 800
