import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Landing Page 
function LandingPage() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Navbar */}
      <nav className="bg-gray-800 p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">FitTrack Pro</h1>
        <div>
          <a href="/login" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded mr-4 text-white">
            Login
          </a>
          <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white">
            Sign Up Free
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 text-center">
        <h2 className="text-5xl font-bold mb-4">Track Your Fitness Journey</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Log workouts, track progress, get personalized plans, and connect with trainers.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4 rounded-lg font-semibold">
          Get Started Free
        </button>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Why Choose FitTrack Pro?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-center">
              <h4 className="text-xl font-semibold mb-2">Log Workouts Easily</h4>
              <p>Track exercises, duration, and calories in seconds.</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-center">
              <h4 className="text-xl font-semibold mb-2">Progress Tracking</h4>
              <p>Charts and stats to see your improvement over time.</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-center">
              <h4 className="text-xl font-semibold mb-2">Trainer Support</h4>
              <p>Connect with professional trainers for guidance.</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-center">
              <h4 className="text-xl font-semibold mb-2">Personalized Plans</h4>
              <p>Get custom workout plans based on your goals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 p-6 text-center">
        <p>© 2026 FitTrack Pro. All rights reserved.</p>
      </footer>
    </div>
  );
}

// Login Page 
function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">Login to FitTrack Pro</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              className="w-full p-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="your@email.com"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Password</label>
            <input
              type="password"
              className="w-full p-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-semibold"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-400 mt-4">
          Don't have an account? <span className="text-blue-500 cursor-pointer">Sign Up</span>
        </p>
      </div>
    </div>
  );
}

// Admin Dashboard 
function AdminDashboard() {
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

        {/* Trainer Table */}
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
                <tr className="border-b border-gray-700">
                  <td className="py-3 px-2">Amit Kumar</td>
                  <td className="py-3 px-2">Amit@fittrack.com</td>
                  <td className="py-3 px-2">Trainer</td>
                  <td className="py-3 px-2">Jan 10, 2026</td>
                  <td className="py-3 px-2">
                    <button className="text-blue-400 hover:underline mr-2">Edit</button>
                    <button className="text-red-400 hover:underline">Delete</button>
                  </td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-3 px-2">Sushil Kumar</td>
                  <td className="py-3 px-2">Sushil@fittrack.com</td>
                  <td className="py-3 px-2">Trainer</td>
                  <td className="py-3 px-2">Dec 15, 2025</td>
                  <td className="py-3 px-2">
                    <button className="text-blue-400 hover:underline mr-2">Edit</button>
                    <button className="text-red-400 hover:underline">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            Add New Trainer
          </button>
        </div>
      </main>
    </div>
  );
}

//Routing
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;