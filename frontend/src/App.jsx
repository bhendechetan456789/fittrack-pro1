import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './components/LandingPage';
import LoginPage from './pages/Login';          
import AdminDashboard from './components/AdminDashboard';
import PrivateRoute from './components/PrivateRoute';
import Signup from './pages/Signup';
// import Workouts from './pages/Workouts';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
     <Route path="/signup" element={<Signup />} />
     {/* <Route path="/workouts" element={<Workouts />} /> */}
        <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;