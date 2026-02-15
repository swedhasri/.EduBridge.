import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import {
    Gamepad2, Trophy, Brain, Code, Shield,
    ArrowLeft, Star, Lock, CheckCircle,
    Clock, Zap, Award, ChevronRight,
    RefreshCcw, PartyPopper, Heart
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TagCatcher from '../components/game/TagCatcher';
import StyleLab from '../components/game/StyleLab';
import BugBlaster from '../components/game/BugBlaster';
import BossTower from '../components/game/BossTower';

const CourseGameMode = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    // Game State
    const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
    const [currentChallengeIdx, setCurrentChallengeIdx] = useState(0);
    const [userXP, setUserXP] = useState(0);
    const [unlockedLevels, setUnlockedLevels] = useState([0]); // Level indices
    const [earnedBadges, setEarnedBadges] = useState([]);
    const [gameState, setGameState] = useState('selection'); // 'selection', 'playing', 'level-complete', 'game-over'

    // Gameplay State
    const [timeLeft, setTimeLeft] = useState(30);
    const [selectedOption, setSelectedOption] = useState(null);
    const [codeResponse, setCodeResponse] = useState('');
    const [isCorrect, setIsCorrect] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [levelScore, setLevelScore] = useState(0);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const { data } = await axios.get(`/api/courses/${id}`);
                setCourse(data);

                // Load progress from localStorage
                const savedData = JSON.parse(localStorage.getItem('eduBridge_userGames') || '{}');
                if (savedData[id]) {
                    setUserXP(savedData[id].xp || 0);
                    setUnlockedLevels(savedData[id].completedLevels || [0]);
                    setEarnedBadges(savedData[id].badges || []);
                }

                setLoading(false);
            } catch (error) {
                console.error('Error fetching course:', error);
                setLoading(false);
            }
        };
        fetchCourse();
    }, [id]);

    // Persistence Effect
    useEffect(() => {
        if (!course) return;
        const savedData = JSON.parse(localStorage.getItem('eduBridge_userGames') || '{}');
        savedData[id] = {
            xp: userXP,
            completedLevels: unlockedLevels,
            badges: earnedBadges
        };
        localStorage.setItem('eduBridge_userGames', JSON.stringify(savedData));
    }, [userXP, unlockedLevels, earnedBadges, id, course]);

    // Timer Effect
    useEffect(() => {
        let timer;
        if (gameState === 'playing' && !showFeedback && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && gameState === 'playing' && !showFeedback) {
            handleAnswer(null); // Timeout is an incorrect answer
        }
        return () => clearInterval(timer);
    }, [gameState, showFeedback, timeLeft]);

    const startLevel = (idx) => {
        if (!unlockedLevels.includes(idx)) return;
        setCurrentLevelIdx(idx);
        setCurrentChallengeIdx(0);
        setLevelScore(0); // Reset score for new level
        setGameState('playing');
        resetChallenge(0, idx);
    };

    const resetChallenge = (challengeIdx, levelIdx) => {
        const challenge = course.gameLevels[levelIdx].challenges[challengeIdx];
        setTimeLeft(challenge.timeLimit || 30);
        setSelectedOption(null);
        setCodeResponse('');
        setIsCorrect(null);
        setShowFeedback(false);
    };

    const handleAnswer = (option) => {
        if (showFeedback) return;

        const level = course.gameLevels[currentLevelIdx];
        const challenge = level.challenges[currentChallengeIdx];
        const correct = option === challenge.correctAnswer;

        setSelectedOption(option);
        setIsCorrect(correct);
        setShowFeedback(true);

        if (correct) {
            let earnedXP = challenge.xpReward;
            // Speed bonus
            if (timeLeft > challenge.timeLimit * 0.5) earnedXP += 5;

            setUserXP(prev => prev + earnedXP);
            setLevelScore(prev => {
                const newScore = prev + 1;
                console.log(`Correct answer! Score increased from ${prev} to ${newScore}`);
                return newScore;
            });
        } else {
            console.log(`Wrong answer! Score remains: ${levelScore}`);
        }

        setTimeout(() => {
            if (currentChallengeIdx < level.challenges.length - 1) {
                setCurrentChallengeIdx(prev => prev + 1);
                resetChallenge(currentChallengeIdx + 1, currentLevelIdx);
            } else {
                completeLevel();
            }
        }, 2000);
    };

    const handleGameComplete = (earnedXP) => {
        setUserXP(prev => prev + earnedXP);
        setLevelScore(course.gameLevels[currentLevelIdx].challenges.length); // Max score
        completeLevel();
    };

    const handleGameFail = () => {
        setGameState('game-over');
    };

    const completeLevel = () => {
        const level = course.gameLevels[currentLevelIdx];
        const totalChallenges = level.challenges.length;

        // Debug logging
        console.log(`Level Score: ${levelScore}, Total Challenges: ${totalChallenges}, Required: ${totalChallenges / 2}`);

        // Check if passed (e.g., 50% correct)
        if (levelScore >= totalChallenges / 2) {
            // Badge awarding
            if (level.badge && !earnedBadges.find(b => b.name === level.badge.name)) {
                setEarnedBadges(prev => [...prev, level.badge]);
            }

            // Unlock next level
            if (currentLevelIdx < course.gameLevels.length - 1) {
                setUnlockedLevels(prev => [...new Set([...prev, currentLevelIdx + 1])]);
            }
            setGameState('level-complete');
        } else {
            setGameState('game-over');
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-900"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo-500"></div></div>;
    if (!course) return <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">Course not found</div>;

    const currentLevel = course.gameLevels[currentLevelIdx];
    const currentChallenge = currentLevel.challenges[currentChallengeIdx];

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col font-sans">
            <Navbar />

            {/* Game Header */}
            <div className="pt-24 pb-8 px-4 sm:px-6 lg:px-8 bg-gray-800/50 border-b border-gray-700">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-4">
                        <Link to="/lets-play" className="p-2 hover:bg-gray-700 rounded-lg transition">
                            <ArrowLeft size={24} />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                {course.title}: THE GAME
                            </h1>
                            <div className="flex items-center gap-3 mt-1">
                                <div className="flex items-center gap-1 text-yellow-400">
                                    <Zap size={16} fill="currentColor" />
                                    <span className="font-bold">{userXP} XP</span>
                                </div>
                                <span className="text-gray-500">•</span>
                                <div className="flex items-center gap-1 text-indigo-400">
                                    <Trophy size={16} />
                                    <span>{earnedBadges.length} Badges</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full md:w-64">
                        <div className="flex justify-between text-xs mb-1 text-gray-400">
                            <span>Overall Progress</span>
                            <span>{Math.round((unlockedLevels.length / course.gameLevels.length) * 100)}%</span>
                        </div>
                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
                                style={{ width: `${(unlockedLevels.length / course.gameLevels.length) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Areas */}
            <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8">

                {/* Level Selection View */}
                {gameState === 'selection' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-8">
                        {course.gameLevels && course.gameLevels.length > 0 ? (
                            course.gameLevels.map((lvl, idx) => {
                                const isUnlocked = unlockedLevels.includes(idx);
                                return (
                                    <div
                                        key={idx}
                                        onClick={() => isUnlocked && startLevel(idx)}
                                        className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${isUnlocked
                                            ? 'bg-gray-800 border-indigo-500/50 hover:border-indigo-500 hover:scale-105 cursor-pointer'
                                            : 'bg-gray-800/50 border-gray-700 opacity-60 grayscale'
                                            }`}
                                    >
                                        {!isUnlocked && <Lock className="absolute top-4 right-4 text-gray-500" size={20} />}
                                        {isUnlocked && <Star className="absolute top-4 right-4 text-yellow-500 animate-pulse" size={20} />}

                                        <div className={`text-4xl font-black mb-4 ${isUnlocked ? 'text-indigo-400' : 'text-gray-600'}`}>
                                            0{lvl.level}
                                        </div>
                                        <h3 className="text-xl font-bold mb-2">{lvl.title}</h3>
                                        <p className="text-sm text-gray-400 mb-6">{lvl.description}</p>

                                        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                                            <span className={isUnlocked ? 'text-indigo-400' : 'text-gray-600'}>
                                                {isUnlocked ? 'Play Level' : 'Locked'}
                                            </span>
                                            {lvl.badge && <span title={lvl.badge.name}>{lvl.badge.icon}</span>}
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="col-span-full text-center py-20 bg-gray-800/30 rounded-3xl border-2 border-dashed border-gray-700">
                                <Gamepad2 className="w-16 h-16 mx-auto text-gray-600 mb-4" />
                                <h3 className="text-xl font-bold text-gray-400">No Journey Missions Available</h3>
                                <p className="text-gray-500 mt-2">Check back later for gamified levels for this course!</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Playing View */}
                {gameState === 'playing' && (
                    <div className="max-w-4xl mx-auto py-12 relative z-30">
                        {currentLevel.mechanicType === 'catcher' ? (
                            <TagCatcher
                                courseTitle={course.title}
                                catcherConfig={currentLevel.catcherConfig}
                                onComplete={handleGameComplete}
                                onFail={handleGameFail}
                            />
                        ) : currentLevel.mechanicType === 'stylelab' ? (
                            <StyleLab
                                courseTitle={course.title}
                                onComplete={handleGameComplete}
                                onFail={handleGameFail}
                            />
                        ) : currentLevel.mechanicType === 'bugblaster' ? (
                            <BugBlaster
                                courseTitle={course.title}
                                onComplete={handleGameComplete}
                                onFail={handleGameFail}
                            />
                        ) : currentLevel.mechanicType === 'bosstower' ? (
                            <BossTower
                                courseTitle={course.title}
                                course={course}
                                onComplete={handleGameComplete}
                                onFail={handleGameFail}
                            />
                        ) : (
                            <>
                                {/* Level & Challenge Info */}
                                <div className="flex justify-between items-end mb-8">
                                    <div>
                                        <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1 block">Level {currentLevel.level}</span>
                                        <h2 className="text-3xl font-bold">{currentLevel.title}</h2>
                                    </div>
                                    <div className="text-right">
                                        <div className={`text-2xl font-mono font-bold ${timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-gray-300'}`}>
                                            00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
                                        </div>
                                        <div className="text-xs text-gray-500">Time Left</div>
                                    </div>
                                </div>

                                {/* Question Card */}
                                <div className="bg-gray-800 border-2 border-gray-700 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                                    {/* Progress dots */}
                                    <div className="flex gap-2 mb-8">
                                        {currentLevel.challenges.map((_, i) => (
                                            <div key={i} className={`h-1.5 flex-1 rounded-full ${i < currentChallengeIdx ? 'bg-indigo-500' : i === currentChallengeIdx ? 'bg-indigo-500 animate-pulse' : 'bg-gray-700'}`} />
                                        ))}
                                    </div>

                                    <h4 className="text-2xl font-bold mb-8 leading-relaxed">
                                        {currentChallenge.question}
                                    </h4>

                                    {currentChallenge.type === 'code' && (
                                        <div className="bg-gray-900 p-6 rounded-xl font-mono text-indigo-300 mb-8 border border-gray-700">
                                            <pre>{currentChallenge.code}</pre>
                                        </div>
                                    )}

                                    <div className="space-y-4">
                                        {currentChallenge.options?.map((opt, i) => {
                                            const isSelected = selectedOption === opt;
                                            const showCorrect = showFeedback && opt === currentChallenge.correctAnswer;
                                            const showWrong = showFeedback && isSelected && !isCorrect;

                                            return (
                                                <button
                                                    key={i}
                                                    disabled={showFeedback}
                                                    onClick={() => handleAnswer(opt)}
                                                    className={`relative w-full p-4 rounded-xl border-2 text-left transition-all duration-200 flex items-center justify-between cursor-pointer hover:scale-[1.01] active:scale-95 z-40 ${showCorrect ? 'bg-green-500/20 border-green-500 text-green-100' :
                                                        showWrong ? 'bg-red-500/20 border-red-500 text-red-100' :
                                                            isSelected ? 'bg-indigo-500 border-indigo-500 text-white' :
                                                                'bg-gray-700/50 border-gray-600 hover:border-indigo-400 hover:bg-gray-700'
                                                        }`}
                                                >
                                                    <span className="font-semibold">{opt}</span>
                                                    {showCorrect && <CheckCircle size={20} />}
                                                    {showWrong && <Lock size={20} />}
                                                </button>
                                            );
                                        })}

                                        {currentChallenge.type === 'code' && !showFeedback && (
                                            <div className="flex gap-3 relative z-40">
                                                <input
                                                    type="text"
                                                    placeholder="Type your answer..."
                                                    value={codeResponse}
                                                    onChange={(e) => setCodeResponse(e.target.value)}
                                                    className="flex-1 bg-gray-900 border-2 border-gray-700 p-4 rounded-xl focus:border-indigo-500 outline-none"
                                                    onKeyPress={(e) => e.key === 'Enter' && handleAnswer(codeResponse)}
                                                />
                                                <button
                                                    onClick={() => handleAnswer(codeResponse)}
                                                    className="bg-indigo-600 px-6 rounded-xl font-bold hover:bg-indigo-700 transition cursor-pointer active:scale-95"
                                                >
                                                    Go
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                )}

                {/* Level Complete View */}
                {gameState === 'level-complete' && (
                    <div className="max-w-md mx-auto py-20 text-center">
                        <div className="mb-8 relative inline-block">
                            <PartyPopper size={80} className="text-yellow-400 mx-auto" />
                            <div className="absolute inset-0 animate-ping rounded-full border-4 border-yellow-400/30" />
                        </div>
                        <h2 className="text-4xl font-black mb-2 italic">LEVEL CLEARED!</h2>
                        <p className="text-gray-400 mb-8">Excellent work! You've mastered {currentLevel.title}.</p>

                        <div className="bg-gray-800 p-8 rounded-3xl border-2 border-indigo-500/30 mb-8">
                            <div className="flex justify-around items-center gap-4">
                                <div>
                                    <div className="text-3xl font-black text-white">{levelScore}</div>
                                    <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">Accuracy</div>
                                </div>
                                <div className="h-10 w-px bg-gray-700" />
                                <div>
                                    <div className="text-3xl font-black text-yellow-400">+{levelScore * 20}</div>
                                    <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">Total XP</div>
                                </div>
                            </div>

                            {currentLevel.badge && (
                                <div className="mt-8 pt-6 border-t border-gray-700 flex flex-col items-center">
                                    <div className="text-5xl mb-3">{currentLevel.badge.icon}</div>
                                    <div className="text-lg font-bold">Earned Badge: {currentLevel.badge.name}</div>
                                    <p className="text-xs text-gray-500">{currentLevel.badge.description}</p>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={() => setGameState('selection')}
                                className="flex-1 p-4 rounded-2xl bg-gray-800 font-bold hover:bg-gray-700 transition border border-gray-700"
                            >
                                Map
                            </button>
                            <button
                                onClick={() => {
                                    if (currentLevelIdx < course.gameLevels.length - 1) {
                                        startLevel(currentLevelIdx + 1);
                                    } else {
                                        setGameState('selection');
                                    }
                                }}
                                className="flex-1 p-4 rounded-2xl bg-indigo-600 font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-900/40"
                            >
                                {currentLevelIdx < course.gameLevels.length - 1 ? 'Next Level' : 'Finish'}
                            </button>
                        </div>
                    </div>
                )}

                {/* Game Over View */}
                {gameState === 'game-over' && (
                    <div className="max-w-md mx-auto py-20 text-center">
                        <RefreshCcw size={80} className="text-red-500 mx-auto mb-6 animate-spin-slow" />
                        <h2 className="text-4xl font-black mb-2 italic">LEVEL FAILED</h2>
                        <p className="text-gray-400 mb-8">You need to score at least 50% to clear this level.</p>
                        <button
                            onClick={() => startLevel(currentLevelIdx)}
                            className="w-full p-4 rounded-2xl bg-indigo-600 font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-900/40"
                        >
                            Try Again
                        </button>
                    </div>
                )}

            </main>

            <Footer />
        </div>
    );
};

export default CourseGameMode;
