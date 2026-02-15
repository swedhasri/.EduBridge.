import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Gamepad2, Trophy, Brain, Code, Shield, Users, ArrowLeft, Star } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import QuizGame from '../components/games/QuizGame';
import CodeChallengeGame from '../components/games/CodeChallengeGame';
import ScenarioGame from '../components/games/ScenarioGame';
import MatchingGame from '../components/games/MatchingGame';

const CourseGames = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedGame, setSelectedGame] = useState(null);
    const [gameResults, setGameResults] = useState({});

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const { data } = await axios.get(`/api/courses/${id}`);
                setCourse(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching course:', error);
                setLoading(false);
            }
        };

        fetchCourse();
    }, [id]);

    const handleGameComplete = (gameTitle, result) => {
        setGameResults({
            ...gameResults,
            [gameTitle]: result
        });

        // Auto-return to game selection after a delay
        setTimeout(() => {
            setSelectedGame(null);
        }, 3000);
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'easy': return 'text-green-600 bg-green-100';
            case 'medium': return 'text-yellow-600 bg-yellow-100';
            case 'hard': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getGameIcon = (type) => {
        switch (type) {
            case 'quiz': return <Brain className="w-8 h-8" />;
            case 'code-challenge': return <Code className="w-8 h-8" />;
            case 'scenario': return <Shield className="w-8 h-8" />;
            case 'matching': return <Users className="w-8 h-8" />;
            default: return <Gamepad2 className="w-8 h-8" />;
        }
    };

    const renderGame = () => {
        if (!selectedGame) return null;

        const gameProps = {
            game: selectedGame,
            onComplete: (result) => handleGameComplete(selectedGame.title, result)
        };

        switch (selectedGame.type) {
            case 'quiz':
                return <QuizGame {...gameProps} />;
            case 'code-challenge':
                return <CodeChallengeGame {...gameProps} />;
            case 'scenario':
                return <ScenarioGame {...gameProps} />;
            case 'matching':
                return <MatchingGame {...gameProps} />;
            default:
                return <div>Game type not supported</div>;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Course not found</h2>
                    <Link to="/courses" className="text-indigo-600 hover:underline">
                        Back to Courses
                    </Link>
                </div>
            </div>
        );
    }

    if (!course.games || course.games.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center pt-20">
                    <div className="text-center max-w-md p-8">
                        <Gamepad2 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">No Games Available</h2>
                        <p className="text-gray-600 mb-6">
                            This course doesn't have any games yet. Check back later!
                        </p>
                        <Link
                            to={`/courses/${id}`}
                            className="inline-flex items-center gap-2 text-indigo-600 hover:underline"
                        >
                            <ArrowLeft size={20} />
                            Back to Course
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (selectedGame) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Navbar />
                <div className="flex-1 pt-24 pb-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
                        <button
                            onClick={() => setSelectedGame(null)}
                            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
                        >
                            <ArrowLeft size={20} />
                            Back to Games
                        </button>
                    </div>
                    {renderGame()}
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white pt-32 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link
                        to={`/courses/${id}`}
                        className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition"
                    >
                        <ArrowLeft size={20} />
                        Back to Course
                    </Link>
                    <div className="flex items-center gap-4 mb-4">
                        <Gamepad2 className="w-12 h-12" />
                        <h1 className="text-4xl font-bold">Interactive Learning Games</h1>
                    </div>
                    <p className="text-xl text-white/90">{course.title}</p>
                    <p className="text-white/70 mt-2">
                        Test your knowledge and reinforce your learning with {course.games.length} interactive game{course.games.length !== 1 ? 's' : ''}
                    </p>
                </div>
            </div>

            {/* Games Grid */}
            <div className="flex-1 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {course.games.map((game, index) => {
                            const result = gameResults[game.title];

                            return (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                                    onClick={() => setSelectedGame(game)}
                                >
                                    <div className="p-6">
                                        {/* Game Icon & Title */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="p-3 bg-indigo-100 rounded-lg text-indigo-600">
                                                {getGameIcon(game.type)}
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(game.difficulty)}`}>
                                                {game.difficulty}
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            {game.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-4">
                                            {game.description}
                                        </p>

                                        {/* Game Stats */}
                                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                            <span>{game.questions?.length || 0} questions</span>
                                            <span className="capitalize">{game.type.replace('-', ' ')}</span>
                                        </div>

                                        {/* Result Badge */}
                                        {result && (
                                            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                                                <Trophy className="text-green-600" size={20} />
                                                <div className="flex-1">
                                                    <div className="text-sm font-semibold text-green-900">
                                                        Last Score: {result.score}/{result.total}
                                                    </div>
                                                    <div className="text-xs text-green-700">
                                                        {result.percentage}% {result.accuracy ? `• ${result.accuracy}% accuracy` : ''}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Play Button */}
                                        <button className="w-full mt-4 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-2">
                                            <Gamepad2 size={20} />
                                            {result ? 'Play Again' : 'Start Game'}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default CourseGames;
