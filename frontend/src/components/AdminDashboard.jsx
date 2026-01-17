import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion'; // agar nahi hai to: npm install framer-motion

function AdminDashboard() {
  const [showModal, setShowModal] = useState(false);
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [newTrainer, setNewTrainer] = useState({
    name: '',
    email: '',
    role: 'Trainer'
  });

  const [editModal, setEditModal] = useState(false);
  const [editingTrainer, setEditingTrainer] = useState(null);

  const API_URL = 'https://fittrack-backend-sqno.onrender.com/api/trainers';

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await axios.get(API_URL);
        setTrainers(response.data);
      } catch (err) {
        setError('Failed to load trainers. Check backend or internet.');
        console.error('Error fetching trainers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainers();
  }, []);

  const handleAddTrainer = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_URL, newTrainer);
      setTrainers([...trainers, response.data]);
      setNewTrainer({ name: '', email: '', role: 'Trainer' });
      setShowModal(false);
    } catch (err) {
      setError('Failed to add trainer.');
      console.error('Error adding trainer:', err);
    }
  };

  const handleDeleteTrainer = async (id) => {
    if (!window.confirm("Sach mein delete karna hai is trainer ko?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      setTrainers(trainers.filter(trainer => trainer._id !== id));
    } catch (err) {
      setError('Failed to delete trainer.');
      console.error('Error deleting trainer:', err);
    }
  };

  const handleEditTrainer = (trainer) => {
    setEditingTrainer({ ...trainer });
    setEditModal(true);
  };

  const handleUpdateTrainer = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${API_URL}/${editingTrainer._id}`, editingTrainer);
      setTrainers(trainers.map(t => t._id === editingTrainer._id ? response.data : t));
      setEditModal(false);
      setEditingTrainer(null);
    } catch (err) {
      setError('Failed to update trainer.');
      console.error('Error updating trainer:', err);
    }
  };

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      {/* Sidebar – premium dark glass */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-gray-900/90 backdrop-blur-xl border-r border-gray-800/50 overflow-y-auto z-50">
        <div className="p-6">
          <h2 className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-10">
            FitTrack Pro
          </h2>
          <ul className="space-y-2">
            {[
              { name: 'Dashboard', icon: '📊', href: '/dashboard', active: true },
              { name: 'Workouts', icon: '🏋️', href: '#' },
              { name: 'Users', icon: '👥', href: '#' },
              { name: 'Trainers', icon: '👟', href: '#' },
              { name: 'Reports', icon: '📈', href: '#' },
            ].map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    item.active 
                      ? 'bg-cyan-900/30 text-cyan-400' 
                      : 'hover:bg-gray-800/50 hover:text-cyan-400 text-gray-300'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  {item.name}
                </a>
              </li>
            ))}
            <li>
              <button
                onClick={() => {
                  localStorage.removeItem('token');
                  window.location.href = '/login';
                }}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-900/30 hover:text-red-400 transition-all duration-300 text-gray-300 w-full text-left"
              >
                <span className="text-xl">🚪</span>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-0 md:ml-64 p-4 sm:p-6 lg:p-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl font-black mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
        >
          Admin Dashboard
        </motion.h1>

        {/* Stats Cards – colorful & premium */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-900/60 backdrop-blur-xl p-6 rounded-xl animate-pulse h-32" />
            ))}
          </div>
        ) : error ? (
          <p className="text-red-400 text-center text-xl mb-10">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-blue-900/80 to-blue-800/80 p-6 rounded-xl border border-blue-700/50 hover:border-blue-500 transition-all shadow-lg"
            >
              <h3 className="text-lg font-semibold text-blue-300">Total Workouts</h3>
              <p className="text-3xl font-bold text-white mt-2">1,478</p>
              <p className="text-green-400 text-sm mt-1">+18% this month</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-green-900/80 to-green-800/80 p-6 rounded-xl border border-green-700/50 hover:border-green-500 transition-all shadow-lg"
            >
              <h3 className="text-lg font-semibold text-green-300">Active Users</h3>
              <p className="text-3xl font-bold text-white mt-2">523</p>
              <p className="text-green-400 text-sm mt-1">+11% this month</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-purple-900/80 to-purple-800/80 p-6 rounded-xl border border-purple-700/50 hover:border-purple-500 transition-all shadow-lg"
            >
              <h3 className="text-lg font-semibold text-purple-300">Avg Calories</h3>
              <p className="text-3xl font-bold text-white mt-2">2,680</p>
              <p className="text-red-400 text-sm mt-1">-4% this month</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-orange-900/80 to-orange-800/80 p-6 rounded-xl border border-orange-700/50 hover:border-orange-500 transition-all shadow-lg"
            >
              <h3 className="text-lg font-semibold text-orange-300">New Signups</h3>
              <p className="text-3xl font-bold text-white mt-2">112</p>
              <p className="text-green-400 text-sm mt-1">+22% this month</p>
            </motion.div>
          </div>
        )}

        {/* Trainers Table – premium glass look */}
        <div className="bg-gray-900/60 backdrop-blur-xl p-6 rounded-2xl border border-gray-800/50 shadow-2xl shadow-black/30 overflow-x-auto">
          <h3 className="text-2xl font-bold mb-6 text-cyan-300">Trainers Management</h3>

          {loading ? (
            <div className="animate-pulse space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-800/50 rounded-lg" />
              ))}
            </div>
          ) : error ? (
            <p className="text-red-400 text-center py-10">{error}</p>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-4 px-6 text-sm font-semibold text-gray-300">Name</th>
                  <th className="py-4 px-6 text-sm font-semibold text-gray-300">Email</th>
                  <th className="py-4 px-6 text-sm font-semibold text-gray-300">Role</th>
                  <th className="py-4 px-6 text-sm font-semibold text-gray-300">Join Date</th>
                  <th className="py-4 px-6 text-sm font-semibold text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {trainers.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-10 text-center text-gray-400">No trainers found</td>
                  </tr>
                ) : (
                  trainers.map((trainer) => (
                    <tr key={trainer._id} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                      <td className="py-4 px-6 font-medium">{trainer.name}</td>
                      <td className="py-4 px-6 text-gray-300">{trainer.email}</td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          trainer.role === 'Senior Trainer' ? 'bg-purple-900/50 text-purple-300' :
                          trainer.role === 'Trainer' ? 'bg-blue-900/50 text-blue-300' :
                          'bg-gray-700/50 text-gray-300'
                        }`}>
                          {trainer.role}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-400">
                        {new Date(trainer.joinDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="py-4 px-6 flex gap-4">
                        <button 
                          className="text-cyan-400 hover:text-cyan-300 transition-colors"
                          onClick={() => handleEditTrainer(trainer)}
                        >
                          Edit
                        </button>
                        <button 
                          className="text-red-400 hover:text-red-300 transition-colors"
                          onClick={() => handleDeleteTrainer(trainer._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}

          <button 
            className="mt-6 w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg text-white font-bold hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg shadow-blue-600/30 disabled:opacity-50"
            onClick={() => setShowModal(true)}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Add New Trainer'}
          </button>
        </div>

        {/* Add Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900/95 backdrop-blur-xl p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-800/50 w-full max-w-md">
              <h3 className="text-2xl font-bold mb-6 text-cyan-300">Add New Trainer</h3>
              
              <form onSubmit={handleAddTrainer}>
                <div className="mb-5">
                  <label className="block text-gray-300 mb-2 text-base">Name</label>
                  <input 
                    type="text"
                    value={newTrainer.name}
                    onChange={(e) => setNewTrainer({ ...newTrainer, name: e.target.value })}
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 text-white"
                    placeholder="Full Name" 
                    required
                  />
                </div>
                <div className="mb-5">
                  <label className="block text-gray-300 mb-2 text-base">Email</label>
                  <input 
                    type="email"
                    value={newTrainer.email}
                    onChange={(e) => setNewTrainer({ ...newTrainer, email: e.target.value })}
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 text-white"
                    placeholder="trainer@fittrack.com" 
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-300 mb-2 text-base">Role</label>
                  <input 
                    type="text"
                    value={newTrainer.role}
                    onChange={(e) => setNewTrainer({ ...newTrainer, role: e.target.value })}
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 text-white"
                    placeholder="Trainer" 
                    required
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row justify-end gap-4">
                  <button 
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg text-white font-bold hover:from-blue-700 hover:to-cyan-700 transition"
                  >
                    Add Trainer
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Modal – same premium style */}
        {editModal && editingTrainer && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900/95 backdrop-blur-xl p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-800/50 w-full max-w-md">
              <h3 className="text-2xl font-bold mb-6 text-cyan-300">Edit Trainer</h3>
              
              <form onSubmit={handleUpdateTrainer}>
                <div className="mb-5">
                  <label className="block text-gray-300 mb-2 text-base">Name</label>
                  <input 
                    type="text"
                    value={editingTrainer.name}
                    onChange={(e) => setEditingTrainer({ ...editingTrainer, name: e.target.value })}
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 text-white"
                    required
                  />
                </div>
                <div className="mb-5">
                  <label className="block text-gray-300 mb-2 text-base">Email</label>
                  <input 
                    type="email"
                    value={editingTrainer.email}
                    onChange={(e) => setEditingTrainer({ ...editingTrainer, email: e.target.value })}
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 text-white"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-300 mb-2 text-base">Role</label>
                  <input 
                    type="text"
                    value={editingTrainer.role}
                    onChange={(e) => setEditingTrainer({ ...editingTrainer, role: e.target.value })}
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 text-white"
                    required
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row justify-end gap-4">
                  <button 
                    type="button"
                    onClick={() => setEditModal(false)}
                    className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg text-white font-bold hover:from-blue-700 hover:to-cyan-700 transition"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;