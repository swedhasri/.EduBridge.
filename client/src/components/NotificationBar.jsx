import React, { useState, useEffect } from 'react';
import { X, BookOpen } from 'lucide-react';

const NotificationBar = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [message, setMessage] = useState('');

    const messages = [
        "📚 Reminder: Study daily to achieve your goals!",
        "💡 Tip: Practice coding for at least 30 minutes today.",
        "🚀 Keep pushing! Consistency is the key to mastery.",
        "🎓 Don't forget to review your latest course materials.",
        "🌟 You're doing great! Take a break and come back refreshed."
    ];

    useEffect(() => {
        // Check if previously dismissed in this session
        const dismissed = sessionStorage.getItem('notificationDismissed');
        if (dismissed) {
            setIsVisible(false);
            return;
        }

        // Select a random message
        const randomMsg = messages[Math.floor(Math.random() * messages.length)];
        setMessage(randomMsg);
    }, []);

    const handleDismiss = () => {
        setIsVisible(false);
        sessionStorage.setItem('notificationDismissed', 'true');
    };

    if (!isVisible) return null;

    return (
        <div className="bg-indigo-600 text-white px-4 py-2 text-sm font-medium relative z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-2 mx-auto sm:mx-0">
                    <BookOpen size={16} className="text-indigo-200" />
                    <span>{message}</span>
                </div>
                <button
                    onClick={handleDismiss}
                    className="text-indigo-200 hover:text-white transition-colors p-1 rounded-full hover:bg-indigo-500/50 absolute right-4 sm:relative sm:right-auto"
                    aria-label="Dismiss notification"
                >
                    <X size={16} />
                </button>
            </div>
        </div>
    );
};

export default NotificationBar;
