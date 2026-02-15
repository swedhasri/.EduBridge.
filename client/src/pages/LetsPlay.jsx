import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Gamepad2, Trophy, Brain, Code, Shield, Users, Sparkles, ArrowRight, Star, Youtube, PlayCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const LetsPlay = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [userStats, setUserStats] = useState({ xp: 0, badges: 0 });

    useEffect(() => {
        // Load user stats from localStorage (or defaults)
        const savedStats = JSON.parse(localStorage.getItem('eduBridge_userGames') || '{}');
        const xp = Object.values(savedStats).reduce((sum, s) => sum + (s.xp || 0), 0);
        const badges = Object.values(savedStats).reduce((sum, s) => sum + (s.badges?.length || 0), 0);

        // Detailed course-by-course stats for the cards
        setUserStats({
            totalXp: xp,
            totalBadges: badges,
            ...savedStats
        });
    }, []);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const { data } = await axios.get('/api/courses');

                // Defensive check: ensure data is an array
                if (!Array.isArray(data)) {
                    console.error('Expected array from API, got:', typeof data);
                    setLoading(false);
                    return;
                }

                // Filter courses that have games OR game journeys
                const coursesWithGames = data.filter(course =>
                    (course.games && course.games.length > 0) ||
                    (course.gameLevels && course.gameLevels.length > 0)
                );
                setCourses(coursesWithGames);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching courses:', error);
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const getGameIcon = (type) => {
        switch (type) {
            case 'quiz': return <Brain className="w-6 h-6" />;
            case 'code-challenge': return <Code className="w-6 h-6" />;
            case 'scenario': return <Shield className="w-6 h-6" />;
            case 'matching': return <Users className="w-6 h-6" />;
            default: return <Gamepad2 className="w-6 h-6" />;
        }
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'easy': return 'text-green-600 bg-green-100';
            case 'medium': return 'text-yellow-600 bg-yellow-100';
            case 'hard': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const categories = ['All', ...new Set(courses.map(c => c.category))];

    const filteredCourses = selectedCategory === 'All'
        ? courses
        : courses.filter(c => c.category === selectedCategory);

    const totalQuickGames = courses.reduce((sum, course) => sum + (course.games?.length || 0), 0);
    const totalJourneyLevels = courses.reduce((sum, course) => sum + (course.gameLevels?.length || 0), 0);
    const totalActivities = totalQuickGames + totalJourneyLevels;

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            {/* Hero Section */}
            <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-blue-600 text-white pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <Sparkles className="w-12 h-12 animate-pulse" />
                            <h1 className="text-5xl md:text-6xl font-bold">Let's Play!</h1>
                            <Sparkles className="w-12 h-12 animate-pulse" />
                        </div>
                        <p className="text-2xl text-white/90 mb-4">
                            Learn Through Interactive Games
                        </p>
                        <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
                            Master new skills while having fun! Choose from {totalActivities} educational games across {courses.length} courses.
                        </p>

                        {/* Stats */}
                        <div className="flex flex-wrap justify-center gap-8 mt-12">
                            <div className="text-center">
                                <div className="text-4xl font-bold mb-2">{totalActivities}</div>
                                <div className="text-white/80 uppercase text-xs font-bold tracking-widest">Activities</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold mb-2 text-yellow-300">{userStats.totalXp || 0}</div>
                                <div className="text-white/80 uppercase text-xs font-bold tracking-widest">Your XP</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold mb-2 text-purple-300">{userStats.totalBadges || 0}</div>
                                <div className="text-white/80 uppercase text-xs font-bold tracking-widest">Badges</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Category Filter */}
            <div className="bg-white border-b sticky top-16 z-10 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full font-medium transition ${selectedCategory === category
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Games Grid by Course */}
            <div className="flex-1 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {filteredCourses.length === 0 ? (
                        <div className="text-center py-20">
                            <Gamepad2 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Games Available</h3>
                            <p className="text-gray-600">Try selecting a different category</p>
                        </div>
                    ) : (
                        <div className="space-y-12">
                            {filteredCourses.map((course) => (
                                <div key={course._id} className="space-y-6">
                                    {/* Course Header */}
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <h2 className="text-3xl font-bold text-gray-900">{course.title}</h2>
                                                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                                                    {course.games.length} game{course.games.length !== 1 ? 's' : ''}
                                                </span>
                                            </div>
                                            <p className="text-gray-600">{course.category} • {course.level}</p>
                                        </div>
                                        <Link
                                            to={`/courses/${course._id}`}
                                            className="hidden md:flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
                                        >
                                            View Course
                                            <ArrowRight size={20} />
                                        </Link>
                                    </div>

                                    {/* Games Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {/* Play YouTube Video Challenge (New Component Link) */}
                                        <Link
                                            to="/lets-play-video"
                                            className="bg-gradient-to-br from-red-600 to-red-800 rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group border-2 border-red-400/30"
                                        >
                                            <div className="p-6">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="p-3 bg-red-500/20 rounded-lg text-red-300">
                                                        <Youtube size={24} />
                                                    </div>
                                                    <span className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-xs font-bold border border-red-500/30">
                                                        NEW
                                                    </span>
                                                </div>
                                                <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                                                    Interactive Video Challenge
                                                </h3>
                                                <p className="text-red-100/70 text-sm mb-6">
                                                    Watch carefully and master technical concepts through precision playback!
                                                </p>
                                                <div className="flex items-center justify-center gap-2 w-full bg-white text-red-900 py-3 rounded-lg font-bold group-hover:bg-red-50 transition shadow-lg">
                                                    <PlayCircle size={20} className="text-red-600" />
                                                    START CHALLENGE
                                                </div>
                                            </div>
                                        </Link>

                                        {/* Play Course Game Feature Card (Prominent) */}
                                        {course.gameLevels && (
                                            <Link
                                                to={`/courses/${course._id}/play`}
                                                className="bg-gradient-to-br from-purple-900 to-blue-900 rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group border-2 border-purple-400/30"
                                            >
                                                <div className="p-6 relative">
                                                    <div className="absolute top-4 right-4 text-purple-400">
                                                        <Trophy className={`w-8 h-8 ${userStats[course._id]?.completedLevels?.length === course.gameLevels.length ? 'text-yellow-400 opacity-100' : 'opacity-30'}`} />
                                                    </div>
                                                    <div className="flex items-start justify-between mb-4">
                                                        <div className="p-3 bg-purple-500/20 rounded-lg text-purple-300">
                                                            <Gamepad2 className="w-6 h-6" />
                                                        </div>
                                                        <div className="flex flex-col items-end">
                                                            <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-xs font-bold border border-yellow-500/30 mb-1">
                                                                Level {userStats[course._id]?.completedLevels?.length || 0} / {course.gameLevels.length}
                                                            </span>
                                                            <span className="text-[10px] text-purple-300 font-bold uppercase tracking-wider">
                                                                {userStats[course._id]?.xp || 0} XP
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                                                        {course.title}
                                                    </h3>

                                                    {/* Badges Row */}
                                                    <div className="flex gap-1 mb-4">
                                                        {userStats[course._id]?.badges?.map((b, i) => (
                                                            <span key={i} title={b.name} className="text-2xl drop-shadow-md">{b.icon}</span>
                                                        ))}
                                                        {(!userStats[course._id]?.badges || userStats[course._id].badges.length === 0) && (
                                                            <div className="h-8 flex items-center gap-1 text-white/30 text-xs italic">
                                                                No badges yet
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="flex items-center justify-center gap-2 w-full bg-white text-purple-900 py-3 rounded-lg font-bold group-hover:bg-purple-50 transition shadow-lg">
                                                        <Sparkles size={20} className="text-purple-600" />
                                                        {userStats[course._id]?.completedLevels?.length > 0 ? 'CONTINUE JOURNEY' : 'START JOURNEY'}
                                                    </div>
                                                </div>
                                            </Link>
                                        )}

                                        {/* Individual Games */}
                                        {course.games.map((game, index) => (
                                            <Link
                                                key={index}
                                                to={`/courses/${course._id}/games`}
                                                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border border-gray-100"
                                            >
                                                <div className="p-6">
                                                    {/* Game Icon & Difficulty */}
                                                    <div className="flex items-start justify-between mb-4">
                                                        <div className="p-3 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg text-purple-600 group-hover:scale-110 transition">
                                                            {getGameIcon(game.type)}
                                                        </div>
                                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(game.difficulty)}`}>
                                                            {game.difficulty}
                                                        </span>
                                                    </div>

                                                    {/* Game Title & Description */}
                                                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition">
                                                        {game.title}
                                                    </h3>
                                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                                        {game.description}
                                                    </p>

                                                    {/* Game Stats */}
                                                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                                        <span>{game.questions?.length || 0} questions</span>
                                                        <span className="capitalize">{game.type.replace('-', ' ')}</span>
                                                    </div>

                                                    {/* Play Button */}
                                                    <div className="flex items-center justify-center gap-2 w-full bg-gray-50 text-purple-600 py-3 rounded-lg font-semibold border border-purple-100 group-hover:bg-purple-600 group-hover:text-white transition">
                                                        <Gamepad2 size={20} />
                                                        Quick Play
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default LetsPlay;
