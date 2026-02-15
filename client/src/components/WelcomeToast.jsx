import React, { useState, useEffect } from 'react';
import { UserCheck } from 'lucide-react';

const WelcomeToast = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Check if user just logged in
        const justLoggedIn = sessionStorage.getItem('justLoggedIn');

        if (justLoggedIn) {
            setVisible(true);
            // Clear the flag so it doesn't show on reload
            sessionStorage.removeItem('justLoggedIn');

            // Auto hide after 4 seconds
            const timer = setTimeout(() => {
                setVisible(false);
            }, 4000);

            return () => clearTimeout(timer);
        }
    }, []);

    if (!visible) return null;

    return (
        <div className="fixed top-20 right-4 z-50 animate-fade-in-down">
            <div className="bg-white/90 backdrop-blur-md border border-indigo-100 text-indigo-900 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4">
                <div className="bg-indigo-100 p-2 rounded-full">
                    <UserCheck className="text-indigo-600 h-6 w-6" />
                </div>
                <div>
                    <h3 className="font-bold text-lg">Welcome back!</h3>
                    <p className="text-sm text-indigo-700">Keep learning and growing!</p>
                </div>
            </div>
        </div>
    );
};

export default WelcomeToast;
