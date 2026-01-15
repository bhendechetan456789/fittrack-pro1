import { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [showModal, setShowModal] = useState(false);
  const [trainers, setTrainers] = useState([]); // real trainers store karne ke liye

  // Add trainer ke liye form data
  const [newTrainer, setNewTrainer] = useState({
    name: '',
    email: '',
    role: 'Trainer'
  });

  // Edit ke liye naya state (edit modal aur selected trainer)
  const [editModal, setEditModal] = useState(false);
  const [editingTrainer, setEditingTrainer] = useState(null);

  // Page load pe trainers list fetch karo
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

  // Add new trainer (real POST)
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

  // Delete trainer (real DELETE)
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

  // Edit button pe modal khol do + purana data pre-fill kar do
  const handleEditTrainer = (trainer) => {
    setEditingTrainer({ ...trainer }); // purana data copy kar do
    setEditModal(true);
  };

  // Edit save hone pe update karo (real PUT)
  const handleUpdateTrainer = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:5000/api/trainers/${editingTrainer._id}`, editingTrainer);

      // Table mein updated trainer daal do (real-time)
      setTrainers(trainers.map(t => t._id === editingTrainer._id ? response.data : t));

      setEditModal(false);
      setEditingTrainer(null);
    } catch (err) {
      console.log('Error updating trainer:', err);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-6 fixed h-full">
        <h2 className="text-2xl font-bold mb-10">FitTrack Pro</h2>
        <ul className="space-y-4">
          <li><a href="/dashboard" className="hover:text-blue-400">Dashboard</a></li>
          <li><a href="#" className="hover:text-blue-400">Workouts</a></li>
          <li><a href="#" className="hover:text-blue-400">Users</a></li>
          <li><a href="#" className="hover:text-blue-400">Trainers</a></li>
          <li><a href="#" className="hover:text-blue-400">Reports</a></li>
          <li><a href="/" className="hover:text-blue-400">Logout</a></li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 ml-64">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Total Workouts</h3>
            <p className="text-3xl">1,234</p>
            <p className="text-green-400">+12% this month</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Active Users</h3>
            <p className="text-3xl">456</p>
            <p className="text-green-400">+8% this month</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Avg Calories</h3>
            <p className="text-3xl">2,450</p>
            <p className="text-red-400">-5% this month</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold">New Signups</h3>
            <p className="text-3xl">89</p>
            <p className="text-green-400">+15% this month</p>
          </div>
        </div>

        {/* Trainer Table – real data */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Trainers Management</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-3 px-2">Name</th>
                  <th className="py-3 px-2">Email</th>
                  <th className="py-3 px-2">Role</th>
                  <th className="py-3 px-2">Join Date</th>
                  <th className="py-3 px-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {trainers.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-3 px-2 text-center">No trainers found</td>
                  </tr>
                ) : (
                  trainers.map((trainer) => (
                    <tr key={trainer._id} className="border-b border-gray-700">
                      <td className="py-3 px-2">{trainer.name}</td>
                      <td className="py-3 px-2">{trainer.email}</td>
                      <td className="py-3 px-2">{trainer.role}</td>
                      <td className="py-3 px-2">{new Date(trainer.joinDate).toLocaleDateString()}</td>
                      <td className="py-3 px-2">
                        <button 
                          className="text-blue-400 hover:underline mr-2"
                          onClick={() => handleEditTrainer(trainer)}  // ← Edit button real call
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
          </div>
          <button 
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            onClick={() => setShowModal(true)}
          >
            Add New Trainer
          </button>
        </div>
      </main>

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-2xl font-bold mb-6 text-white">Add New Trainer</h3>
            
            <form onSubmit={handleAddTrainer}>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Name</label>
                <input 
                  type="text"
                  value={newTrainer.name}
                  onChange={(e) => setNewTrainer({ ...newTrainer, name: e.target.value })}
                  className="w-full p-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-600" 
                  placeholder="Full Name" 
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Email</label>
                <input 
                  type="email"
                  value={newTrainer.email}
                  onChange={(e) => setNewTrainer({ ...newTrainer, email: e.target.value })}
                  className="w-full p-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-600" 
                  placeholder="trainer@fittrack.com" 
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Role</label>
                <input 
                  type="text"
                  value={newTrainer.role}
                  onChange={(e) => setNewTrainer({ ...newTrainer, role: e.target.value })}
                  className="w-full p-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-600" 
                  placeholder="Trainer" 
                  required
                />
              </div>
              
              <div className="flex justify-end gap-4">
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded text-white"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
                >
                  Add Trainer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal – naya modal */}
      {editModal && editingTrainer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-2xl font-bold mb-6 text-white">Edit Trainer</h3>
            
            <form onSubmit={handleUpdateTrainer}>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Name</label>
                <input 
                  type="text"
                  value={editingTrainer.name}
                  onChange={(e) => setEditingTrainer({ ...editingTrainer, name: e.target.value })}
                  className="w-full p-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-600" 
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Email</label>
                <input 
                  type="email"
                  value={editingTrainer.email}
                  onChange={(e) => setEditingTrainer({ ...editingTrainer, email: e.target.value })}
                  className="w-full p-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-600" 
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Role</label>
                <input 
                  type="text"
                  value={editingTrainer.role}
                  onChange={(e) => setEditingTrainer({ ...editingTrainer, role: e.target.value })}
                  className="w-full p-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-600" 
                  required
                />
              </div>

              <div className="flex justify-end gap-4">
                <button 
                  type="button"
                  onClick={() => setEditModal(false)}
                  className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded text-white"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;