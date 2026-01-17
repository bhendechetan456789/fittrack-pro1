import { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [showModal, setShowModal] = useState(false);
  const [trainers, setTrainers] = useState([]);

  const [newTrainer, setNewTrainer] = useState({
    name: '',
    email: '',
    role: 'Trainer'
  });

  const [editModal, setEditModal] = useState(false);
  const [editingTrainer, setEditingTrainer] = useState(null);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/trainers');
        setTrainers(response.data);
      } catch (err) {
        console.log('Error fetching trainers:', err);
      }
    };

    fetchTrainers();
  }, []);

  const handleAddTrainer = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/trainers', newTrainer);
      setTrainers([...trainers, response.data]);
      setNewTrainer({ name: '', email: '', role: 'Trainer' });
      setShowModal(false);
    } catch (err) {
      console.log('Error adding trainer:', err);
    }
  };

  const handleDeleteTrainer = async (id) => {
    const sure = window.confirm("Sach mein delete karna hai is trainer ko?");
    if (!sure) return;

    try {
      await axios.delete(`http://localhost:5000/api/trainers/${id}`);
      setTrainers(trainers.filter(trainer => trainer._id !== id));
    } catch (err) {
      console.log('Error deleting trainer:', err);
    }
  };

  const handleEditTrainer = (trainer) => {
    setEditingTrainer({ ...trainer });
    setEditModal(true);
  };

  const handleUpdateTrainer = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/trainers/${editingTrainer._id}`, editingTrainer);
      setTrainers(trainers.map(t => t._id === editingTrainer._id ? response.data : t));
      setEditModal(false);
      setEditingTrainer(null);
    } catch (err) {
      console.log('Error updating trainer:', err);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Top Sidebar on Mobile, Left Sidebar on Desktop */}
      <aside className="bg-gray-800 border-b border-gray-700 md:border-r md:border-b-0 md:w-64 md:fixed md:h-full md:overflow-y-auto">
        <div className="p-4 md:p-6">
          <h2 className="text-2xl font-bold mb-4 text-center md:text-left">FitTrack Pro</h2>
          <ul className="flex flex-wrap justify-center md:flex-col md:justify-start gap-3 md:gap-4">
            <li><a href="/dashboard" className="hover:text-blue-400 text-sm md:text-base px-3 py-1">Dashboard</a></li>
            <li><a href="#" className="hover:text-blue-400 text-sm md:text-base px-3 py-1">Workouts</a></li>
            <li><a href="#" className="hover:text-blue-400 text-sm md:text-base px-3 py-1">Users</a></li>
            <li><a href="#" className="hover:text-blue-400 text-sm md:text-base px-3 py-1">Trainers</a></li>
            <li><a href="#" className="hover:text-blue-400 text-sm md:text-base px-3 py-1">Reports</a></li>
            <li>
              <button 
                onClick={() => {
                  localStorage.removeItem('token');
                  window.location.href = '/login';
                }}
                className="hover:text-blue-400 text-sm md:text-base px-3 py-1 bg-transparent border-none cursor-pointer"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content – push down on mobile, shift right on desktop */}
      <main className="p-4 sm:p-6 md:p-10 md:ml-0 lg:ml-64">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Admin Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10">
          <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow">
            <h3 className="text-base sm:text-lg font-semibold">Total Workouts</h3>
            <p className="text-2xl sm:text-3xl">1,234</p>
            <p className="text-green-400 text-sm">+12% this month</p>
          </div>
          {/* Other stats cards same */}
          <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow">
            <h3 className="text-base sm:text-lg font-semibold">Active Users</h3>
            <p className="text-2xl sm:text-3xl">456</p>
            <p className="text-green-400 text-sm">+8% this month</p>
          </div>
          <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow">
            <h3 className="text-base sm:text-lg font-semibold">Avg Calories</h3>
            <p className="text-2xl sm:text-3xl">2,450</p>
            <p className="text-red-400 text-sm">-5% this month</p>
          </div>
          <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow">
            <h3 className="text-base sm:text-lg font-semibold">New Signups</h3>
            <p className="text-2xl sm:text-3xl">89</p>
            <p className="text-green-400 text-sm">+15% this month</p>
          </div>
        </div>

        {/* Trainer Table */}
        <div className="bg-gray-800 p-4 sm:p-6 rounded-lg overflow-x-auto">
          <h3 className="text-xl sm:text-2xl font-bold mb-4">Trainers Management</h3>
          <table className="w-full text-left min-w-[600px]">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-3 px-2 text-sm sm:text-base">Name</th>
                <th className="py-3 px-2 text-sm sm:text-base">Email</th>
                <th className="py-3 px-2 text-sm sm:text-base">Role</th>
                <th className="py-3 px-2 text-sm sm:text-base">Join Date</th>
                <th className="py-3 px-2 text-sm sm:text-base">Actions</th>
              </tr>
            </thead>
            <tbody>
              {trainers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-3 px-2 text-center text-sm">No trainers found</td>
                </tr>
              ) : (
                trainers.map((trainer) => (
                  <tr key={trainer._id} className="border-b border-gray-700">
                    <td className="py-3 px-2 text-sm">{trainer.name}</td>
                    <td className="py-3 px-2 text-sm">{trainer.email}</td>
                    <td className="py-3 px-2 text-sm">{trainer.role}</td>
                    <td className="py-3 px-2 text-sm">{new Date(trainer.joinDate).toLocaleDateString()}</td>
                    <td className="py-3 px-2 flex flex-col sm:flex-row gap-2 text-sm">
                      <button 
                        className="text-blue-400 hover:underline"
                        onClick={() => handleEditTrainer(trainer)}
                      >
                        Edit
                      </button>
                      <button 
                        className="text-red-400 hover:underline"
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
          <button 
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm sm:text-base"
            onClick={() => setShowModal(true)}
          >
            Add New Trainer
          </button>
        </div>
      </main>

      {/* Modals – already good, no change needed */}
      {/* ... keep your modal code as is ... */}
    </div>
  );
}

export default AdminDashboard;