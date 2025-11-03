import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Award, Droplets, Gift, User, Mail, MapPin } from 'lucide-react';
import { api } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    if (!user) return;
    try {
      const data = await api.getProfile(user.email);
      setProfile(data);
      updateUser(data);
    } catch (error) {
      console.error('Failed to load profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const waterSaved = profile ? Math.round((profile.eco_points / 10) * 2.5) : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
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
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <User size={40} />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{profile?.name}</h1>
                <p className="text-white/80">{profile?.email}</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-green-400 to-green-600 rounded-xl p-6 text-white"
              >
                <Award size={32} className="mb-3" />
                <div className="text-3xl font-bold mb-1">{profile?.eco_points || 0}</div>
                <div className="text-white/80">Eco Points</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl p-6 text-white"
              >
                <Droplets size={32} className="mb-3" />
                <div className="text-3xl font-bold mb-1">{waterSaved}L</div>
                <div className="text-white/80">Water Saved</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl p-6 text-white"
              >
                <Gift size={32} className="mb-3" />
                <div className="text-3xl font-bold mb-1">{Math.floor((profile?.eco_points || 0) / 100)}</div>
                <div className="text-white/80">Rewards Available</div>
              </motion.div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                  Profile Information
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <User className="text-gray-400 mt-1" size={20} />
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Full Name</div>
                      <div className="text-lg text-gray-800 dark:text-white">{profile?.name}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="text-gray-400 mt-1" size={20} />
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Email</div>
                      <div className="text-lg text-gray-800 dark:text-white">{profile?.email}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="text-gray-400 mt-1" size={20} />
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Address</div>
                      <div className="text-lg text-gray-800 dark:text-white">
                        {profile?.address || 'No address provided'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Award className="text-gray-400 mt-1" size={20} />
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Account Type</div>
                      <div className="text-lg text-gray-800 dark:text-white capitalize">
                        {profile?.role}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                  Environmental Impact
                </h3>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                  <p className="text-green-800 dark:text-green-200 text-lg">
                    You've saved approximately <strong>{waterSaved} liters</strong> of water this month!
                  </p>
                  <p className="text-green-700 dark:text-green-300 mt-2">
                    Keep up the great work and continue making a positive impact on the environment.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => alert('Redeem feature coming soon!')}
                  className="flex-1 bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  Redeem Points
                </button>
                <button
                  onClick={() => alert('Edit profile feature coming soon!')}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
