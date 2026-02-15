import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BookOpen, TrendingUp, Clock, PlayCircle, Trophy, BarChart, CheckCircle } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart as RBarChart, Bar, PieChart, Pie, Cell, Legend } from 'recharts';
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dailyHistory, setDailyHistory] = useState([]);

    // Logic for Daily History (Graph Data) - copied from About.jsx to ensure consistent experience
    useEffect(() => {
        const savedHistory = localStorage.getItem('progressHistory');
        if (savedHistory) {
            setDailyHistory(JSON.parse(savedHistory));
        } else {
            const days = 14;
            const today = new Date();
            const defaults = Array.from({ length: days }, (_, i) => {
                const d = new Date(today);
                d.setDate(today.getDate() - (days - 1 - i));
                const key = d.toISOString().split('T')[0];
                return { date: key, value: Math.floor(Math.random() * 40) + 10, active: Math.random() > 0.3 };
            });
            setDailyHistory(defaults);
            localStorage.setItem('progressHistory', JSON.stringify(defaults));
        }
    }, []);

    const history14 = dailyHistory.slice(-14);
    const progressSeries = history14.map(d => ({ name: d.date.slice(5), value: d.value }));
    const consistencySeries = history14.map(d => ({ name: d.date.slice(5), active: d.active ? 1 : 0 }));

    // Latest Hits data (line chart) - by course category
    const latestHitsData = [
        { month: 'January', webDev: 65, dataScience: 40, cyberSecurity: 30 },
        { month: 'February', webDev: 70, dataScience: 35, cyberSecurity: 20 },
        { month: 'March', webDev: 80, dataScience: 30, cyberSecurity: 40 },
        { month: 'April', webDev: 50, dataScience: 50, cyberSecurity: 78 },
        { month: 'May', webDev: 55, dataScience: 70, cyberSecurity: 70 },
        { month: 'June', webDev: 70, dataScience: 70, cyberSecurity: 55 },
        { month: 'July', webDev: 75, dataScience: 55, cyberSecurity: 80 },
    ];

    // Storage Information data (pie chart)
    const storageData = [
        { name: 'Web Development', value: 18.24, color: '#e07a5f' },
        { name: 'Data Science', value: 6.5, color: '#81b29a' },
        { name: 'Cyber Security', value: 9.15, color: '#a8d5ba' },
    ];

    useEffect(() => {
        const fetchEnrollments = async () => {
            if (!user) return;
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                const { data } = await axios.get('/api/enrollments/myenrollments', config);
                if (!Array.isArray(data)) {
                    console.error('Expected array from /api/enrollments/myenrollments, got:', typeof data);
                    setEnrollments([]);
                } else {
                    setEnrollments(data);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching enrollments:', error);
                // Dummy data for visual check if API empty or fail
                setEnrollments([
                    {
                        _id: 'e1',
                        course: {
                            _id: '1',
                            title: 'Complete Web Development Bootcamp',
                            thumbnailUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                            totalLessons: 50
                        },
                        progress: 35,
                        completedLessons: []
                    },
                    {
                        _id: 'e2',
                        course: {
                            _id: '2',
                            title: 'Python for Data Science',
                            thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                            totalLessons: 40
                        },
                        progress: 10,
                        completedLessons: []
                    }
                ]);
                setLoading(false);
            }
        };

        fetchEnrollments();
    }, [user]);

    if (!user) return <div className="p-10">Please login</div>;

    const chartTooltipStyle = { backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: 4 };

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
            <Navbar />

            <div className="pt-28 pb-20 max-w-[1800px] mx-auto px-6 lg:px-12 w-full">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
                    <div>
                        <h1 className="font-display text-3xl lg:text-4xl font-bold text-white">Welcome back, {user.name.split(' ')[0]}!</h1>
                        <p className="text-white/60 mt-2 flex items-center gap-2">
                            <span className="inline-block px-2 py-0.5 border border-white/20 text-white/80 text-[10px] font-medium uppercase tracking-wider">
                                {user.educationLevel || 'Professional'}
                            </span>
                            {user.cgpa && <span className="text-white/60">GPA: {user.cgpa}</span>}
                        </p>
                    </div>
                    <div className="border border-white/[0.08] p-4 lg:p-6 flex gap-6 lg:gap-10">
                        <div className="text-center">
                            <p className="text-[11px] text-white/50 uppercase font-medium tracking-wider">Courses</p>
                            <p className="text-2xl font-bold text-white mt-1">{enrollments.length}</p>
                        </div>
                        <div className="w-px bg-white/10"></div>
                        <div className="text-center">
                            <p className="text-[11px] text-white/50 uppercase font-medium tracking-wider">Skills</p>
                            <p className="text-2xl font-bold text-white mt-1">{user.skills?.length || 0}</p>
                        </div>
                        <div className="w-px bg-white/10"></div>
                        <div className="text-center">
                            <p className="text-[11px] text-white/50 uppercase font-medium tracking-wider">XP</p>
                            <p className="text-2xl font-bold text-white mt-1">1,250</p>
                        </div>
                    </div>
                </div>

                {/* Latest Hits & Storage Information - from design */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    <div className="lg:col-span-2 border border-white/[0.08] p-6 lg:p-8">
                        <h2 className="text-white/80 text-lg font-medium mb-6">Monthly Progress</h2>
                        <div className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={latestHitsData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                    <XAxis dataKey="month" stroke="rgba(255,255,255,0.6)" tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }} />
                                    <YAxis domain={[10, 90]} stroke="rgba(255,255,255,0.6)" tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }} label={{ value: 'HITS', angle: -90, position: 'insideLeft', fill: 'rgba(255,255,255,0.5)' }} />
                                    <Tooltip contentStyle={chartTooltipStyle} labelStyle={{ color: 'rgba(255,255,255,0.8)' }} />
                                    <Legend wrapperStyle={{ paddingTop: 16 }} formatter={(value) => <span className="text-white/70 text-sm">{value}</span>} />
                                    <Line type="monotone" dataKey="webDev" name="Web Development" stroke="#22d3ee" strokeWidth={2} dot={{ fill: '#22d3ee' }} />
                                    <Line type="monotone" dataKey="dataScience" name="Data Science" stroke="#f472b6" strokeWidth={2} dot={{ fill: '#f472b6' }} />
                                    <Line type="monotone" dataKey="cyberSecurity" name="Cyber Security" stroke="#a78bfa" strokeWidth={2} dot={{ fill: '#a78bfa' }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="border border-white/[0.08] p-6 lg:p-8">
                        <h2 className="text-white/80 text-lg font-medium mb-6">Progress Overview</h2>
                        <div className="h-72 flex flex-col items-center justify-center">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={storageData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={50}
                                        outerRadius={90}
                                        paddingAngle={2}
                                        dataKey="value"
                                    >
                                        {storageData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={chartTooltipStyle} formatter={(value) => [`${value} GB`, '']} />
                                    <Legend formatter={(value) => <span className="text-white/70 text-sm">{value}</span>} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Technical Skills Row */}
                {user.skills && user.skills.length > 0 && (
                    <div className="mb-8 flex flex-wrap gap-2">
                        {user.skills.map((skill, i) => (
                            <span key={i} className="px-3 py-1 border border-white/20 text-white/80 text-xs font-medium">
                                {skill}
                            </span>
                        ))}
                    </div>
                )}

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="border border-white/[0.08] p-6 lg:p-8">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-display font-semibold text-lg text-white">Study Goal</h3>
                            <TrendingUp className="text-white/60" />
                        </div>
                        <div className="flex items-end gap-2 mb-2">
                            <span className="text-4xl font-bold text-white">4.5</span>
                            <span className="text-white/50 mb-1">/ 6 hrs</span>
                        </div>
                        <div className="w-full bg-white/10 h-2">
                            <div className="bg-white h-2 w-[75%]"></div>
                        </div>
                        <p className="text-sm mt-3 text-white/60">Daily target almost reached!</p>
                    </div>

                    <div className="border border-white/[0.08] p-6 lg:p-8">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-display font-semibold text-lg text-white">Next Reminder</h3>
                            <Clock className="text-white/60" />
                        </div>
                        <p className="text-xl font-bold text-white mb-1">Web Dev Live Class</p>
                        <p className="text-white/60 text-sm mb-4">Today, 5:00 PM</p>
                        <button className="w-full py-2.5 border border-white/30 text-white font-medium hover:bg-white/5 transition">
                            Join Session
                        </button>
                    </div>

                    <div className="border border-white/[0.08] p-6 lg:p-8">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-display font-semibold text-lg text-white">Achievements</h3>
                            <Trophy className="text-white/60" />
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-white/80">
                                <CheckCircle size={18} className="text-white/60" />
                                <span className="text-sm">Completed first EDA report</span>
                            </div>
                            <div className="flex items-center gap-2 text-white/80">
                                <CheckCircle size={18} className="text-white/60" />
                                <span className="text-sm">Reached 50% in DS/ML course</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Daily Progress & Consistency */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    <div className="border border-white/[0.08] p-6 lg:p-8">
                        <h2 className="font-display text-xl font-bold text-white mb-6">Daily Progress</h2>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={progressSeries} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" tick={{ fill: 'rgba(255,255,255,0.6)' }} />
                                    <YAxis domain={[0, 100]} stroke="rgba(255,255,255,0.5)" tick={{ fill: 'rgba(255,255,255,0.6)' }} />
                                    <Tooltip contentStyle={chartTooltipStyle} />
                                    <Line type="monotone" dataKey="value" stroke="#fff" strokeWidth={2} dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="border border-white/[0.08] p-6 lg:p-8">
                        <h2 className="font-display text-xl font-bold text-white mb-6">Consistency</h2>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <RBarChart data={consistencySeries} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" tick={{ fill: 'rgba(255,255,255,0.6)' }} />
                                    <YAxis domain={[0, 1]} tickFormatter={(v) => (v ? 'On' : 'Off')} stroke="rgba(255,255,255,0.5)" tick={{ fill: 'rgba(255,255,255,0.6)' }} />
                                    <Tooltip contentStyle={chartTooltipStyle} />
                                    <Bar dataKey="active" fill="rgba(255,255,255,0.8)" />
                                </RBarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <h2 className="font-display text-2xl font-bold text-white mb-6">My Courses</h2>
                {loading ? (
                    <div className="flex justify-center p-12 text-white/50">Loading...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {enrollments.map((enrollment) => (
                            <div key={enrollment._id} className="border border-white/[0.08] overflow-hidden flex flex-col group hover:border-white/20 transition-colors">
                                <div className="relative h-40">
                                    <img src={enrollment.course.thumbnailUrl} alt={enrollment.course.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                    <div className="absolute inset-0 bg-black/30"></div>
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <div className="w-full bg-white/20 h-1.5 mb-2">
                                            <div
                                                className="bg-white h-1.5 transition-all duration-1000"
                                                style={{ width: `${enrollment.progress}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-white text-xs font-medium">{enrollment.progress}% Completed</span>
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col flex-grow border-t border-white/[0.08]">
                                    <h3 className="font-display text-lg font-bold text-white mb-4 line-clamp-1">{enrollment.course.title}</h3>
                                    <Link
                                        to={`/courses/${enrollment.course._id}/play`}
                                        className="mt-auto flex items-center justify-center gap-2 w-full py-2.5 border border-white/30 text-white font-medium hover:bg-white/5 transition"
                                    >
                                        <PlayCircle size={18} />
                                        Continue Learning
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
