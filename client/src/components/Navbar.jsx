import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, BookOpen, LogOut, Gamepad2, Bell } from 'lucide-react';
import axios from 'axios';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || '');
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  // Temporary mock auth state - will replace with Context later
  const user = JSON.parse(localStorage.getItem('userInfo'));

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  useEffect(() => {
    // Force light mode always
    const current = 'light';
    setTheme(current);
    const root = document.documentElement;
    root.classList.remove('dark');
    localStorage.setItem('theme', current);
  }, []);

  // Fetch Notifications
  useEffect(() => {
    if (user && user.token) {
      const fetchNotifications = async () => {
        try {
          const config = {
            headers: { Authorization: `Bearer ${user.token}` }
          };
          const { data } = await axios.get('/api/notifications', config);
          setNotifications(data);
        } catch (error) {
          console.error('Error fetching notifications:', error);
        }
      };

      fetchNotifications();
      // Poll every 30 seconds for new notifications
      const interval = setInterval(fetchNotifications, 30000);
      return () => clearInterval(interval);
    }
  }, [user]);

  const markAsRead = async (id) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };
      await axios.put(`/api/notifications/${id}/read`, {}, config);
      setNotifications(notifications.map(n => n._id === id ? { ...n, isRead: true } : n));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <nav className="bg-gray-900/80 backdrop-blur-md shadow-xl sticky w-full z-50 top-0 left-0 border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <BookOpen className="h-8 w-8 text-purple-400" />
              <span className="font-bold text-2xl tracking-tighter text-white">Edu<span className="text-purple-400">Bridge</span></span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-300 hover:text-purple-400 font-medium transition">Home</Link>
            <Link to="/courses" className="text-gray-300 hover:text-purple-400 font-medium transition">Courses</Link>
            <Link to="/lets-play" className="flex items-center gap-1 text-gray-300 hover:text-purple-400 font-medium transition">
              <Gamepad2 size={18} />
              Let's Play
            </Link>
            <Link to="/dashboard" className="text-gray-300 hover:text-purple-400 font-medium transition">My Profile</Link>
            <Link to="/chatbot" className="text-gray-300 hover:text-purple-400 font-medium transition">Kiru</Link>
            <Link to="/contact" className="text-gray-300 hover:text-purple-400 font-medium transition">Contact</Link>
            {user ? (
              <div className="flex items-center gap-4 relative">
                {/* Notification Bell */}
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-300 hover:text-purple-400 transition"
                >
                  <Bell size={20} />
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-red-100 transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notification Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 top-12 w-80 bg-gray-900/95 backdrop-blur-md rounded-xl shadow-xl border border-purple-500/20 overflow-hidden z-50">
                    <div className="p-3 border-b border-purple-500/20 font-semibold text-gray-200 flex justify-between items-center">
                      <span>Notifications</span>
                      <span className="text-xs text-purple-400">{unreadCount} new</span>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-4 text-center text-gray-400 text-sm">No notifications</div>
                      ) : (
                        notifications.map(notification => (
                          <div
                            key={notification._id}
                            className={`p-3 border-b border-purple-500/10 hover:bg-purple-500/10 transition cursor-pointer ${!notification.isRead ? 'bg-purple-500/20' : ''}`}
                            onClick={() => markAsRead(notification._id)}
                          >
                            <p className={`text-sm ${!notification.isRead ? 'font-semibold text-gray-100' : 'text-gray-300'}`}>{notification.message}</p>
                            <span className="text-xs text-gray-500 mt-1 block">{new Date(notification.createdAt).toLocaleDateString()}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                <button onClick={handleLogout} className="flex items-center gap-2 bg-red-500/20 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/30 transition border border-red-500/30">
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-gray-300 hover:text-purple-400 font-medium transition">Login</Link>
                <Link to="/register" className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-5 py-2 rounded-full hover:from-purple-600 hover:to-purple-700 transition shadow-lg shadow-purple-500/25">Get Started</Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            {/* Mobile Notification Bell */}
            {user && (
              <button
                onClick={() => setShowNotifications(!showNotifications)} // Simplified for mobile
                className="relative p-2 text-gray-300 hover:text-purple-400 transition"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-red-100 transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>
            )}
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white focus:outline-none">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-md border-t border-purple-500/20">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-purple-400 hover:bg-purple-500/10">Home</Link>
            <Link to="/courses" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-purple-400 hover:bg-purple-500/10">Courses</Link>
            <Link to="/lets-play" className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-purple-400 hover:bg-purple-500/10">
              <Gamepad2 size={18} />
              Let's Play
            </Link>
            <Link to="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-purple-400 hover:bg-purple-500/10">My Profile</Link>
            <Link to="/chatbot" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-purple-400 hover:bg-purple-500/10">Kiru</Link>
            <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-purple-400 hover:bg-purple-500/10">Contact</Link>

            {user ? (
              <>
                <button onClick={handleLogout} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-400 hover:bg-red-500/10">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-purple-400 hover:bg-purple-500/10">Login</Link>
                <Link to="/register" className="block px-3 py-2 rounded-md text-base font-medium text-purple-400 hover:bg-purple-500/20">Get Started</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
