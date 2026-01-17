import { useState } from 'react';
import { motion } from 'framer-motion';

function Workouts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newWorkout, setNewWorkout] = useState({
    name: '',
    category: 'Chest',
    sets: '',
    reps: '',
    weight: '',
    notes: ''
  });

  // Dummy data (baad mein backend se fetch kar lenge)
  const [workouts, setWorkouts] = useState([
    { id: 1, name: 'Bench Press', category: 'Chest', sets: 4, reps: 8, weight: 80, notes: 'Increase weight next time' },
    { id: 2, name: 'Deadlift', category: 'Back', sets: 5, reps: 5, weight: 120, notes: 'Good form today' },
    { id: 3, name: 'Squats', category: 'Legs', sets: 4, reps: 10, weight: 100, notes: 'Knee pain, reduce weight' },
    { id: 4, name: 'Treadmill Run', category: 'Cardio', sets: 1, reps: 30, weight: 0, notes: '30 min @ 10 km/h' },
    { id: 5, name: 'Pull Ups', category: 'Back', sets: 3, reps: 12, weight: 0, notes: 'Bodyweight' },
  ]);

  const categories = ['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Cardio', 'Core'];

  const filteredWorkouts = workouts.filter(workout => {
    const matchesSearch = workout.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || workout.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleAddWorkout = (e) => {
    e.preventDefault();
    const newId = workouts.length + 1;
    setWorkouts([...workouts, { id: newId, ...newWorkout }]);
    setNewWorkout({ name: '', category: 'Chest', sets: '', reps: '', weight: '', notes: '' });
    setShowAddModal(false);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-950 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Workouts Management
        </h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg text-white font-bold hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg shadow-blue-600/30"
        >
          + Add New Workout
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search workouts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 p-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 text-white"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="p-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 text-white"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Workout Table */}
      <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl border border-gray-800/50 overflow-x-auto shadow-2xl shadow-black/30">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-4 px-6 text-sm font-semibold text-gray-300">Workout</th>
              <th className="py-4 px-6 text-sm font-semibold text-gray-300">Category</th>
              <th className="py-4 px-6 text-sm font-semibold text-gray-300">Sets × Reps</th>
              <th className="py-4 px-6 text-sm font-semibold text-gray-300">Weight (kg)</th>
              <th className="py-4 px-6 text-sm font-semibold text-gray-300">Notes</th>
            </tr>
          </thead>
          <tbody>
            {filteredWorkouts.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-12 text-center text-gray-400">No workouts found</td>
              </tr>
            ) : (
              filteredWorkouts.map((workout) => (
                <tr key={workout.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                  <td className="py-4 px-6 font-medium">{workout.name}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      workout.category === 'Chest' ? 'bg-red-900/50 text-red-300' :
                      workout.category === 'Back' ? 'bg-purple-900/50 text-purple-300' :
                      workout.category === 'Legs' ? 'bg-green-900/50 text-green-300' :
                      workout.category === 'Cardio' ? 'bg-orange-900/50 text-orange-300' :
                      'bg-gray-700/50 text-gray-300'
                    }`}>
                      {workout.category}
                    </span>
                  </td>
                  <td className="py-4 px-6">{workout.sets} × {workout.reps}</td>
                  <td className="py-4 px-6">{workout.weight > 0 ? `${workout.weight} kg` : '-'}</td>
                  <td className="py-4 px-6 text-gray-400 truncate max-w-xs">{workout.notes || '-'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Workout Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-900/95 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-gray-800/50 shadow-2xl w-full max-w-lg"
          >
            <h3 className="text-2xl font-bold mb-6 text-cyan-300">Add New Workout</h3>
            
            <form onSubmit={handleAddWorkout}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                <div>
                  <label className="block text-gray-300 mb-2">Workout Name</label>
                  <input
                    type="text"
                    value={newWorkout.name}
                    onChange={(e) => setNewWorkout({ ...newWorkout, name: e.target.value })}
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 text-white"
                    placeholder="e.g. Bench Press"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Category</label>
                  <select
                    value={newWorkout.category}
                    onChange={(e) => setNewWorkout({ ...newWorkout, category: e.target.value })}
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 text-white"
                  >
                    {['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Cardio', 'Core'].map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Sets</label>
                  <input
                    type="number"
                    value={newWorkout.sets}
                    onChange={(e) => setNewWorkout({ ...newWorkout, sets: e.target.value })}
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 text-white"
                    placeholder="4"
                    min="1"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Reps</label>
                  <input
                    type="number"
                    value={newWorkout.reps}
                    onChange={(e) => setNewWorkout({ ...newWorkout, reps: e.target.value })}
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 text-white"
                    placeholder="8-12"
                    min="1"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Weight (kg)</label>
                  <input
                    type="number"
                    value={newWorkout.weight}
                    onChange={(e) => setNewWorkout({ ...newWorkout, weight: e.target.value })}
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 text-white"
                    placeholder="80"
                    min="0"
                    step="0.5"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-gray-300 mb-2">Notes</label>
                  <textarea
                    value={newWorkout.notes}
                    onChange={(e) => setNewWorkout({ ...newWorkout, notes: e.target.value })}
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 text-white"
                    placeholder="Form tips, pain notes, etc."
                    rows="3"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-white transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg text-white font-bold hover:from-blue-700 hover:to-cyan-700 transition shadow-lg shadow-blue-600/30"
                >
                  Add Workout
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default Workouts;