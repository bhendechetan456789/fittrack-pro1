import { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('https://fittrack-backend-sqno.onrender.com/api/auth/register', {
        name,
        email,
        password
      });

      setSuccess('Signup successful! Now login.');
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000); // 2 sec baad login page pe redirect
    } catch (err) {
      setError(err.response?.data?.msg || 'Signup failed. Try again.');
      console.log('Signup error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6">
          Sign Up for FitTrack Pro
        </h2>

        {error && <p className="text-red-500 text-center mb-4 text-sm sm:text-base">{error}</p>}
        {success && <p className="text-green-400 text-center mb-4 text-sm sm:text-base">{success}</p>}

        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2 text-sm sm:text-base">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="w-full p-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-base"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-2 text-sm sm:text-base">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="chet@fittrack.com"
              className="w-full p-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-base"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-300 mb-2 text-sm sm:text-base">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="chet123"
              className="w-full p-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-base"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-bold text-sm sm:text-base transition"
          >
            Sign Up Free
          </button>
        </form>

        <p className="text-gray-400 text-center mt-4 text-sm">
          Already have an account? <a href="/login" className="text-blue-400 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;