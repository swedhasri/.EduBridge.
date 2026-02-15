import React, { useState, useEffect, useRef } from 'react';
import { Bell, X, BookOpen, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FloatingNotifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [user, setUser] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [studyTips, setStudyTips] = useState([]);
    const [dismissedTips, setDismissedTips] = useState([]);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const defaultTips = [
        { id: 'tip1', message: "📚 Reminder: Study daily to achieve your goals!", type: 'tip' },
        { id: 'tip2', message: "💡 Tip: Practice coding for at least 30 minutes today.", type: 'tip' },
        { id: 'tip3', message: "🚀 Keep pushing! Consistency is the key to mastery.", type: 'tip' },
        { id: 'tip4', message: "🎓 Don't forget to review your latest course materials.", type: 'tip' },
        { id: 'tip5', message: "🌟 You're doing great! Take a break and come back refreshed.", type: 'tip' }
    ];

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        setUser(userInfo);

        const dismissed = JSON.parse(sessionStorage.getItem('dismissedTips') || '[]');
        setDismissedTips(dismissed);

        const availableTips = defaultTips.filter(tip => !dismissed.includes(tip.id));
        setStudyTips(availableTips);
    }, []);

    useEffect(() => {
        if (user && user.token) {
            const fetchNotifications = async () => {
                try {
                    const config = { headers: { Authorization: `Bearer ${user.token}` } };
                    const { data } = await axios.get('/api/notifications', config);
                    setNotifications(data);
                } catch (error) {
                    console.error('Error fetching notifications:', error);
                }
            };
            fetchNotifications();
            const interval = setInterval(fetchNotifications, 30000);
            return () => clearInterval(interval);
        }
    }, [user]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleDismissTip = (tipId) => {
        const newDismissed = [...dismissedTips, tipId];
        setDismissedTips(newDismissed);
        sessionStorage.setItem('dismissedTips', JSON.stringify(newDismissed));
        setStudyTips(studyTips.filter(tip => tip.id !== tipId));
    };

    const markAsRead = async (notificationId) => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.put(`/api/notifications/${notificationId}/read`, {}, config);
            setNotifications(notifications.map(n => n._id === notificationId ? { ...n, isRead: true } : n));
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    const unreadCount = notifications.filter(n => !n.isRead).length + studyTips.length;

    return (
        <div className="fixed bottom-6 right-6 z-50" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="group relative bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-lg shadow-purple-500/40 transition-all hover:scale-110 active:scale-95 flex items-center justify-center"
            >
                <Bell size={24} />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white shadow-sm border-2 border-white animate-pulse">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute bottom-full right-0 mb-3 w-96 bg-gray-900 rounded-xl shadow-2xl border border-purple-500/30 overflow-hidden max-h-[500px] overflow-y-auto">
                    <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
                        <div className="flex items-center gap-2">
                            <Bell size={18} className="text-white" />
                            <span className="text-white font-semibold">Notifications</span>
                            {unreadCount > 0 && (
                                <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">{unreadCount}</span>
                            )}
                        </div>
                    </div>

                    {studyTips.length > 0 && (
                        <div className="border-b border-gray-800">
                            <div className="px-4 py-2 bg-gray-800/50">
                                <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Study Tips</span>
                            </div>
                            {studyTips.map((tip) => (
                                <div key={tip.id} className="px-4 py-3 bg-purple-900/20 border-l-4 border-purple-500 flex items-start justify-between group">
                                    <div className="flex items-start gap-3 flex-1">
                                        <BookOpen size={16} className="text-purple-400 mt-0.5 flex-shrink-0" />
                                        <p className="text-sm text-gray-200">{tip.message}</p>
                                    </div>
                                    <button onClick={() => handleDismissTip(tip.id)} className="text-gray-500 hover:text-white transition p-1 ml-2 flex-shrink-0">
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="px-4 py-2 bg-gray-800/50">
                        <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Your Notifications</span>
                    </div>

                    {notifications.length === 0 ? (
                        <div className="px-4 py-6 text-center">
                            <Bell size={32} className="text-gray-600 mx-auto mb-2" />
                            <p className="text-sm text-gray-400">No notifications yet</p>
                        </div>
                    ) : (
                        <div>
                            {notifications.map((notification) => (
                                <div
                                    key={notification._id}
                                    onClick={() => {
                                        if (!notification.isRead) markAsRead(notification._id);
                                        if (notification.link) navigate(notification.link);
                                    }}
                                    className={`px-4 py-3 border-b border-gray-800 cursor-pointer transition hover:bg-gray-800/50 ${!notification.isRead ? 'bg-blue-900/10 border-l-4 border-l-blue-500' : ''}`}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <p className={`text-sm ${!notification.isRead ? 'text-white font-medium' : 'text-gray-300'}`}>{notification.title}</p>
                                            <p className="text-xs text-gray-500 mt-1">{notification.message}</p>
                                            <p className="text-xs text-gray-600 mt-1">{new Date(notification.createdAt).toLocaleDateString()}</p>
                                        </div>
                                        {!notification.isRead && <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1.5"></span>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="px-4 py-3 bg-gray-800/50 border-t border-gray-800 sticky bottom-0">
                        <button
                            onClick={() => { setIsOpen(false); navigate('/notifications'); }}
                            className="flex items-center justify-center gap-2 w-full text-sm text-purple-400 hover:text-purple-300 transition"
                        >
                            View All Notifications
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FloatingNotifications;
