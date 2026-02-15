import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import CourseGames from './pages/CourseGames';
import CourseGameMode from './pages/CourseGameMode';
import LetsPlay from './pages/LetsPlay';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import About from './pages/About';
import Chatbot from './pages/Chatbot';
import Contact from './pages/Contact';
import YouTubeGame from './components/games/YouTubeGame';

import WelcomeToast from './components/WelcomeToast';
import FloatingNotifications from './components/FloatingNotifications';
import Notifications from './pages/Notifications';

function App() {
  return (
    <AuthProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 font-sans">
          <WelcomeToast />
          <FloatingNotifications />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetails />} />
            <Route path="/courses/:id/games" element={<CourseGames />} />
            <Route path="/courses/:id/play" element={<CourseGameMode />} />
            <Route path="/lets-play" element={<LetsPlay />} />
            <Route path="/lets-play-video" element={<div className="pt-24 min-h-screen bg-gray-50"><YouTubeGame /></div>} />
            <Route path="/about" element={<About />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<AdminPanel />} />
            {/* Fallback route */}
            <Route path="*" element={<div className="p-20 text-center text-xl">404 - Page Not Found</div>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
