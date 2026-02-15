import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { Bell, Check, Trash2, Calendar, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchNotifications = async () => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo) {
            navigate('/login');
            return;
        }

        try {
            const config = {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            };
            const { data } = await axios.get('/api/notifications', config);
            setNotifications(data);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    const markAsRead = async (id) => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        try {
            const config = {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            };
            await axios.put(`/api/notifications/${id}/read`, {}, config);
            setNotifications(notifications.map(n => n._id === id ? { ...n, isRead: true } : n));
        } catch (error) {
            console.error('Error marking as read:', error);
        }
    };

    const deleteNotification = async (id) => {
        // optimistically remove for now as backend might not have delete endpoint yet,
        // but we can just hide it or mark read. 
        // For now let's just mark read as "archived" visually or actually implement delete if user asked, 
        // but standard is usually just mark read. 
        // Let's stick to mark read functionality for now to match verified backend.
        markAsRead(id);
    };

    const markAllRead = async () => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        // Loop for now or create a bulk endpoint later. 
        // For simplicity and speed without backend changes, we'll map through unread.
        const unread = notifications.filter(n => !n.isRead);
        for (const n of unread) {
            await markAsRead(n._id);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <div className="pt-24 pb-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="bg-indigo-100 p-3 rounded-full text-indigo-600">
                            <Bell size={28} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
                            <p className="text-gray-500">Stay updated with your learning journey</p>
                        </div>
                    </div>
                    {notifications.some(n => !n.isRead) && (
                        <button
                            onClick={markAllRead}
                            className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-2 px-4 py-2 hover:bg-indigo-50 rounded-lg transition"
                        >
                            <Check size={18} /> Mark all read
                        </button>
                    )}
                </div>

                {loading ? (
                    <div className="text-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                        <p className="mt-4 text-gray-500">Loading notifications...</p>
                    </div>
                ) : notifications.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-gray-100">
                        <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Bell className="text-gray-300 h-10 w-10" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No notifications yet</h3>
                        <p className="text-gray-500 max-w-sm mx-auto">
                            When you get course updates, reminders, or achievements, they'll show up here.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {notifications.map((notification) => (
                            <div
                                key={notification._id}
                                className={`bg-white rounded-xl p-5 shadow-sm border transition-all hover:shadow-md ${!notification.isRead ? 'border-l-4 border-l-indigo-500 border-y-gray-100 border-r-gray-100' : 'border-gray-100 opacity-75'}`}
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-start gap-4">
                                        <div className={`mt-1 p-2 rounded-lg ${!notification.isRead ? 'bg-indigo-50 text-indigo-600' : 'bg-gray-100 text-gray-400'}`}>
                                            <MessageSquare size={20} />
                                        </div>
                                        <div>
                                            <p className={`text-lg ${!notification.isRead ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                                                {notification.message}
                                            </p>
                                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                                <span className="flex items-center gap-1">
                                                    <Calendar size={14} />
                                                    {new Date(notification.createdAt).toLocaleDateString()} at {new Date(notification.createdAt).toLocaleTimeString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    {!notification.isRead && (
                                        <button
                                            onClick={() => markAsRead(notification._id)}
                                            className="text-gray-400 hover:text-indigo-600 p-2 hover:bg-gray-50 rounded-full transition"
                                            title="Mark as read"
                                        >
                                            <Check size={20} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Notifications;
