import React, { useState, useEffect, useCallback } from 'react';
import { Heart, Zap, Play, RotateCcw } from 'lucide-react';

const DEFAULT_CONFIG = {
    validItems: ['<div>', '<h1>', '<p>', '<a>', '<img>', '<span>', '<ul>', '<li>', '<section>'],
    noiseItems: ['[block]', '{box}', '<header1>', '(div)', 'item', 'tag', 'data'],
    tutorialTitle: 'Tag Catcher!',
    tutorialValidLabel: 'valid HTML tags',
    tutorialNoiseLabel: 'fake noise tags'
};

const TagCatcher = ({ onComplete, onFail, courseTitle, catcherConfig }) => {
    const [items, setItems] = useState([]);
    const [score, setScore] = useState(0);
    const [health, setHealth] = useState(3);
    const [gameState, setGameState] = useState('tutorial'); // 'tutorial', 'playing', 'win', 'lose'
    const [caughtTags, setCaughtTags] = useState([]);

    const config = catcherConfig || DEFAULT_CONFIG;
    const validTags = config.validItems || DEFAULT_CONFIG.validItems;
    const noise = config.noiseItems || DEFAULT_CONFIG.noiseItems;

    const spawnItem = useCallback(() => {
        const isCorrect = Math.random() > 0.4;
        const content = isCorrect
            ? validTags[Math.floor(Math.random() * validTags.length)]
            : noise[Math.floor(Math.random() * noise.length)];

        const newItem = {
            id: Date.now() + Math.random(),
            content,
            isCorrect,
            x: Math.random() * 80 + 10, // 10% to 90%
            y: -10,
            speed: Math.random() * 1.5 + 0.8 // Slower speed for better playability
        };

        setItems(prev => [...prev, newItem]);
    }, []);

    useEffect(() => {
        if (gameState !== 'playing') return;

        const gameLoop = setInterval(() => {
            setItems(prev => {
                const next = prev.map(item => ({ ...item, y: item.y + item.speed }));

                // Check for missed items
                next.forEach(item => {
                    if (item.y > 100 && item.isCorrect) {
                        setHealth(h => {
                            const newHealth = h - 1;
                            if (newHealth <= 0) setGameState('lose');
                            return newHealth;
                        });
                    }
                });

                return next.filter(item => item.y <= 100);
            });
        }, 50);

        const spawner = setInterval(spawnItem, 1500);

        return () => {
            clearInterval(gameLoop);
            clearInterval(spawner);
        };
    }, [gameState, spawnItem, validTags, noise]);

    const handleCatch = (item) => {
        if (gameState !== 'playing') return;

        setItems(prev => prev.filter(i => i.id !== item.id));

        if (item.isCorrect) {
            setScore(s => {
                const newScore = s + 10;
                if (newScore >= 100) setGameState('win');
                return newScore;
            });
            setCaughtTags(prev => [...new Set([...prev, item.content])]);
        } else {
            setHealth(h => {
                const newHealth = h - 1;
                if (newHealth <= 0) setGameState('lose');
                return newHealth;
            });
        }
    };

    const renderTutorial = () => (
        <div className="text-center p-8 bg-gray-900/80 rounded-3xl border-2 border-indigo-500 max-w-md mx-auto">
            <Zap className="w-16 h-16 text-yellow-400 mx-auto mb-6 animate-bounce" />
            <h2 className="text-3xl font-bold mb-4">{config.tutorialTitle}</h2>
            <p className="text-gray-300 mb-8 leading-relaxed">
                Catch the {config.tutorialValidLabel} to score. Avoid the {config.tutorialNoiseLabel}!
                <br /><br />
                Get **100 XP** to win. Don&apos;t lose all your ❤️!
            </p>
            <button
                onClick={() => setGameState('playing')}
                className="bg-indigo-600 px-10 py-4 rounded-2xl font-black text-xl hover:bg-indigo-700 transition flex items-center gap-3 mx-auto"
            >
                <Play fill="currentColor" /> START PLAYING
            </button>
        </div>
    );

    const renderGame = () => (
        <div className="relative h-[600px] w-full bg-gray-900 overflow-hidden rounded-3xl border-2 border-gray-800 shadow-2xl">
            {/* HUD */}
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10 bg-gradient-to-b from-black/50 to-transparent pointer-events-none">
                <div className="flex gap-2">
                    {[...Array(3)].map((_, i) => (
                        <Heart
                            key={i}
                            className={`w-8 h-8 ${i < health ? 'text-red-500 fill-red-500' : 'text-gray-700'}`}
                        />
                    ))}
                </div>

                <div className="text-right">
                    <div className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Score</div>
                    <div className="text-4xl font-black">{score}</div>
                </div>
            </div>

            {/* Page Preview (Building real-time) */}
            <div className="absolute left-6 bottom-6 flex flex-wrap gap-2 max-w-[30%] z-10 opacity-50">
                {caughtTags.map((tag, i) => (
                    <span key={i} className="px-2 py-1 bg-green-500/20 text-green-400 text-[10px] font-mono rounded border border-green-500/30">
                        {tag}
                    </span>
                ))}
            </div>

            {/* Falling Items */}
            {items.map(item => (
                <button
                    key={item.id}
                    onPointerDown={(e) => {
                        e.preventDefault();
                        handleCatch(item);
                    }}
                    className={`absolute transform -translate-x-1/2 px-6 py-3 rounded-2xl font-mono text-base font-black shadow-xl transition-all hover:scale-110 active:scale-95 z-30 cursor-pointer touch-none select-none ${item.isCorrect
                        ? 'bg-indigo-600 text-white border-2 border-indigo-300'
                        : 'bg-red-900 text-red-100 border-2 border-red-500'
                        }`}
                    style={{
                        left: `${item.x}%`,
                        top: `${item.y}%`,
                        touchAction: 'none'
                    }}
                >
                    {item.content}
                </button>
            ))}

            {/* Background Grid */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle, #4f46e5 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        </div>
    );

    const renderWin = () => (
        <div className="text-center p-12 bg-gray-900/80 rounded-3xl border-2 border-green-500 max-w-md mx-auto shadow-2xl shadow-green-500/20">
            <div className="text-6xl mb-6">🏆</div>
            <h2 className="text-4xl font-black text-white mb-4">LEVEL CLEAR!</h2>
            <p className="text-gray-300 mb-8">
                You've mastered the foundations of **{courseTitle}**.
                <br />
                XP Earned: **{score}**
            </p>
            <button
                onClick={() => onComplete(score)}
                className="bg-green-600 px-10 py-4 rounded-2xl font-black text-xl hover:bg-green-700 transition w-full"
            >
                CLAIM REWARDS
            </button>
        </div>
    );

    const renderLose = () => (
        <div className="text-center p-12 bg-gray-900/80 rounded-3xl border-2 border-red-500 max-w-md mx-auto shadow-2xl shadow-red-500/20">
            <div className="text-6xl mb-6">💔</div>
            <h2 className="text-4xl font-black text-white mb-4">GAME OVER</h2>
            <p className="text-gray-300 mb-8">
                The complexity was too high! Don't give up, try again.
            </p>
            <button
                onClick={() => {
                    setHealth(3);
                    setScore(0);
                    setItems([]);
                    setGameState('playing');
                }}
                className="bg-red-600 px-10 py-4 rounded-2xl font-black text-xl hover:bg-red-700 transition w-full flex items-center justify-center gap-3"
            >
                <RotateCcw /> RETRY
            </button>
        </div>
    );

    return (
        <div className="w-full max-w-4xl mx-auto py-12">
            {gameState === 'tutorial' && renderTutorial()}
            {gameState === 'playing' && renderGame()}
            {gameState === 'win' && renderWin()}
            {gameState === 'lose' && renderLose()}
        </div>
    );
};

export default TagCatcher;
