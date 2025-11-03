import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Package, Star } from 'lucide-react';
import { api } from '../utils/api';
import { useAuth } from '../context/AuthContext';

interface Booking {
  id: string;
  pickup_date: string;
  pickup_time: string;
  address: string;
  status: string;
  payment_status: string;
  rating?: number;
  service: {
    name: string;
    price: number;
  };
}

const MyBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    if (!user) return;
    try {
      const data = await api.getUserBookings(user.email);
      setBookings(data);
    } catch (error) {
      console.error('Failed to load bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRating = async (bookingId: string) => {
    try {
      await api.updateBooking(bookingId, { rating, status: 'completed' });
      setSelectedBooking(null);
      setRating(0);
      loadBookings();
    } catch (error) {
      console.error('Failed to submit rating:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'accepted':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/home')}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-teal-500 mb-6"
        >
          <ArrowLeft size={20} />
          Back to Home
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            My Bookings
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track and manage your laundry orders
          </p>
        </motion.div>

        {bookings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center"
          >
            <Package size={64} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              No bookings yet
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start booking our services to see them here
            </p>
            <button
              onClick={() => navigate('/home')}
              className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors"
            >
              Browse Services
            </button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                        {booking.service.name}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>
                    <div className="space-y-1 text-gray-600 dark:text-gray-400">
                      <p>
                        <strong>Pickup:</strong> {new Date(booking.pickup_date).toLocaleDateString()} at{' '}
                        {booking.pickup_time}
                      </p>
                      <p>
                        <strong>Address:</strong> {booking.address}
                      </p>
                      <p>
                        <strong>Price:</strong> ₹{booking.service.price}
                      </p>
                    </div>
                  </div>

                  {booking.status === 'completed' && !booking.rating && (
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => {
                              setSelectedBooking(booking.id);
                              setRating(star);
                            }}
                            className="focus:outline-none"
                          >
                            <Star
                              size={24}
                              className={
                                selectedBooking === booking.id && star <= rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300 dark:text-gray-600'
                              }
                            />
                          </button>
                        ))}
                      </div>
                      {selectedBooking === booking.id && rating > 0 && (
                        <button
                          onClick={() => handleRating(booking.id)}
                          className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg text-sm transition-colors"
                        >
                          Submit Rating
                        </button>
                      )}
                    </div>
                  )}

                  {booking.rating && (
                    <div className="flex items-center gap-1">
                      <span className="text-gray-600 dark:text-gray-400">Rated:</span>
                      <div className="flex">
                        {[...Array(booking.rating)].map((_, i) => (
                          <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
