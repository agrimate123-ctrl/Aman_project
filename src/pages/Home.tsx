import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Shirt, Wind, Footprints, Sparkles, Moon, Sun, LogOut, User } from 'lucide-react';
import { api } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

interface Service {
  id: string;
  name: string;
  price: number;
  description: string;
  icon: string;
}

const iconMap: { [key: string]: any } = {
  Shirt: Shirt,
  Wind: Wind,
  FootprintsIcon: Footprints,
  Sparkles: Sparkles,
};

const Home = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const data = await api.getServices();
      setServices(data);
    } catch (error) {
      console.error('Failed to load services:', error);
    }
  };

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <nav className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Sparkles className="text-teal-500 mr-2" size={28} />
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                QuickWash 2.0
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-600" />}
              </button>
              <button
                onClick={() => navigate('/profile')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-500 hover:bg-teal-600 text-white transition-colors"
              >
                <User size={20} />
                <span className="hidden sm:inline">{user?.name}</span>
              </button>
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Find Your Perfect Laundry Partner
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
            Smart laundry services at your doorstep
          </p>

          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for laundry services..."
              className="w-full pl-14 pr-4 py-4 rounded-full border-2 border-gray-300 dark:border-gray-600 focus:border-teal-500 focus:outline-none text-lg dark:bg-gray-800 dark:text-white"
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {filteredServices.map((service, index) => {
            const Icon = iconMap[service.icon] || Sparkles;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => navigate(`/book/${service.id}`)}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1"
              >
                <div className="bg-teal-100 dark:bg-teal-900 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Icon className="text-teal-500" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {service.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {service.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-teal-500">
                    ₹{service.price}
                  </span>
                  <button className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors">
                    Book Now
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/my-bookings')}
            className="bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl p-6 text-left shadow-lg"
          >
            <h3 className="text-xl font-bold mb-2">My Bookings</h3>
            <p className="text-white/80">View and manage your orders</p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/profile')}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6 text-left shadow-lg"
          >
            <h3 className="text-xl font-bold mb-2">Eco Points</h3>
            <p className="text-white/80">Track your environmental impact</p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6 text-left shadow-lg"
          >
            <h3 className="text-xl font-bold mb-2">Special Offers</h3>
            <p className="text-white/80">Check out combo deals</p>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Home;
