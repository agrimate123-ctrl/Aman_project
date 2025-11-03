# QuickWash 2.0

A smart, AI-assisted laundry platform that connects customers with service providers and offers intelligent laundry management features.

## Features

- **User Authentication**: Dual role system for customers and service providers
- **Service Booking**: Easy booking flow with pickup time selection
- **Payment Integration**: Mock payment system for demonstration
- **Eco-Points System**: Track environmental impact and earn rewards
- **AI Assistant**: Intelligent chatbot for service recommendations
- **Dark Mode**: Full dark mode support
- **Provider Dashboard**: Analytics and booking management for service providers
- **Responsive Design**: Mobile-first design with smooth animations

## Tech Stack

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion (animations)
- React Router v6
- Axios
- Chart.js (analytics)

### Backend
- Node.js
- Express.js
- Supabase (PostgreSQL database)
- bcryptjs (password hashing)

## Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Installation

1. Install frontend dependencies:
```bash
npm install
```

2. Install backend dependencies:
```bash
cd server
npm install
cd ..
```

### Running the Application

1. Start the backend server (in a separate terminal):
```bash
cd server
npm start
```
The server will run on http://localhost:5000

2. Start the frontend development server:
```bash
npm run dev
```
The app will run on http://localhost:5173

## Application Routes

- `/` - Splash screen with auto-redirect
- `/login` - Login page for both customers and providers
- `/signup` - Registration page with role selection
- `/home` - Main dashboard with service listings
- `/book/:serviceId` - Service booking page
- `/my-bookings` - View and manage bookings
- `/profile` - User profile with eco-points tracker
- `/admin` - Provider dashboard with analytics

## User Roles

### Customer
- Browse and book laundry services
- Track bookings and delivery status
- Earn eco-points for completed bookings
- Rate services
- View environmental impact

### Service Provider
- View all incoming bookings
- Accept/reject booking requests
- Mark orders as completed
- View analytics dashboard
- Track earnings and ratings

## Environment Variables

The project uses Supabase for the database. Environment variables are already configured in `.env` files.

## Features in Detail

### EcoScore Tracker
Every completed booking adds eco-points to the user's account. Points represent water saved and environmental impact.

### AI Laundry Assistant
A floating chatbot widget provides:
- Service recommendations
- Combo offers
- Pricing information
- Eco-benefits information
- Pickup scheduling help

### Mock Payment System
For demonstration purposes, the payment system is mocked. Clicking "Confirm & Pay" will show a success alert and create the booking.

### Dark Mode
Toggle between light and dark themes. Preference is saved in localStorage.

## Database Schema

### Users Table
- id, name, email, password (hashed)
- role (customer/provider)
- eco_points, address
- created_at

### Services Table
- id, name, price, description, icon
- created_at

### Bookings Table
- id, user_id, service_id, email
- pickup_date, pickup_time, address
- status (pending/accepted/completed/rejected)
- payment_status, rating
- created_at

## Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

## License

MIT
