import React, { useState, useEffect, useCallback } from 'react';
import { Shield, Zap, Bug, Play, RotateCcw, CheckCircle } from 'lucide-react';

const BugBlaster = ({ onComplete, onFail, courseTitle }) => {
    const [bugs, setBugs] = useState([]);
    const [health, setHealth] = useState(100);
    const [score, setScore] = useState(0);
    const [gameState, setGameState] = useState('tutorial'); // 'tutorial', 'playing', 'win', 'lose'
    const [activeBug, setActiveBug] = useState(null);

    const bugPool = [
        { type: 'syntax', error: 'for (let i=0; i<10 i++)', fix: 'i++', options: ['i--', 'i++', 'i+1'] },
        { type: 'logic', error: 'if (x = 5)', fix: 'x === 5', options: ['x == 5', 'x === 5', 'x => 5'] },
        { type: 'reference', error: 'console.log(y)', fix: 'let y = 10;', options: ['let y = 10;', 'var y;', 'y = y'] },
        { type: 'type', error: '"1" + 1', fix: 'Number("1") + 1', options: ['"1" - 1', 'Number("1") + 1', '1 + 1'] },
    ];

    const spawnBug = useCallback(() => {
        const template = bugPool[Math.floor(Math.random() * bugPool.length)];
        const newBug = {
            id: Date.now() + Math.random(),
            ...template,
            x: Math.random() * 60 + 20, // 20% to 80%
            y: -10,
            speed: 0.5 + Math.random() * 0.5
        };
        setBugs(prev => [...prev, newBug]);
    }, []);

    useEffect(() => {
        if (gameState !== 'playing') return;

        const gameLoop = setInterval(() => {
            setBugs(prev => {
                const next = prev.map(bug => ({ ...bug, y: bug.y + bug.speed }));

                // Check for damage
                next.forEach(bug => {
                    if (bug.y > 85) { // Hit the core
                        setHealth(h => {
                            const newHealth = h - 20;
                            if (newHealth <= 0) setGameState('lose');
                            return newHealth;
                        });
                    }
                });

                return next.filter(bug => bug.y <= 85);
            });
        }, 50);

        const spawner = setInterval(spawnBug, 3000);

        return () => {
            clearInterval(gameLoop);
            clearInterval(spawner);
        };
    }, [gameState, spawnBug]);

    const handleBugClick = (bug) => {
        if (gameState !== 'playing') return;
        setActiveBug(bug);
    };

    const handleFix = (option) => {
        if (option === activeBug.fix) {
            setScore(s => {
                const newScore = s + 25;
                if (newScore >= 150) setGameState('win');
                return newScore;
            });
            setBugs(prev => prev.filter(b => b.id !== activeBug.id));
        } else {
            setHealth(h => h - 10);
        }
        setActiveBug(null);
    };

    const renderTutorial = () => (
        <div className="text-center p-8 bg-gray-900 rounded-3xl border-2 border-red-500 max-w-md mx-auto">
            <Bug className="w-16 h-16 text-red-500 mx-auto mb-6 animate-pulse" />
            <h2 className="text-3xl font-bold mb-4">Bug Blaster!</h2>
            <p className="text-gray-300 mb-8">
                Bugs are attacking the **Core Code**! Click a bug and select the **Correct Fix** to blast it.
                <br /><br />
                Defend the core at all costs!
            </p>
            <button
                onClick={() => setGameState('playing')}
                className="bg-red-600 px-10 py-4 rounded-2xl font-black text-xl hover:bg-red-700 transition w-full"
            >
                DEFEND CORE
            </button>
        </div>
    );

    const renderGame = () => (
        <div className="relative h-[600px] w-full bg-gray-950 overflow-hidden rounded-3xl border-2 border-gray-800 shadow-2xl">
            {/* HUD */}
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-20">
                <div className="w-48 bg-gray-800 h-4 rounded-full overflow-hidden border border-gray-700">
                    <div className="h-full bg-red-500 transition-all duration-300" style={{ width: `${health}%` }} />
                </div>
                <div className="text-4xl font-black text-white">{score} XP</div>
            </div>

            {/* The Core */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-indigo-900/50 to-transparent flex flex-col items-center justify-center border-t border-indigo-500/30">
                <Shield className="w-12 h-12 text-indigo-400 animate-pulse mb-2" />
                <div className="text-xs font-bold text-indigo-300 uppercase tracking-widest">Core Database</div>
            </div>

            {/* Falling Bugs */}
            {bugs.map(bug => (
                <button
                    key={bug.id}
                    onClick={() => handleBugClick(bug)}
                    className="absolute transform -translate-x-1/2 p-5 bg-red-600 rounded-full shadow-2xl shadow-red-900/50 transition-all hover:scale-125 active:scale-95 z-30"
                    style={{ left: `${bug.x}%`, top: `${bug.y}%` }}
                >
                    <Bug className="w-8 h-8 text-white" />
                </button>
            ))}

            {/* Fix Menu */}
            {activeBug && (
                <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-30 p-6">
                    <div className="bg-gray-800 p-8 rounded-3xl border-2 border-indigo-500 max-w-sm w-full">
                        <h3 className="text-xs font-bold text-red-400 uppercase tracking-widest mb-2">Error Found</h3>
                        <div className="bg-gray-900 p-4 rounded-xl font-mono text-sm mb-6 border border-gray-700">
                            {activeBug.error}
                        </div>
                        <div className="space-y-3">
                            {activeBug.options.map((opt, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleFix(opt)}
                                    className="w-full p-4 bg-gray-700 rounded-xl font-bold hover:bg-indigo-600 transition text-left"
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Background Matrix Effect (Static) */}
            <div className="absolute inset-0 opacity-10 pointer-events-none font-mono text-[10px] text-green-500 overflow-hidden leading-tight p-4">
                {Array(20).fill('101001010101010101010101010101010101010101010101010101010101').map((line, i) => <div key={i}>{line}</div>)}
            </div>
        </div>
    );

    return (
        <div className="w-full max-w-4xl mx-auto py-12">
            {gameState === 'tutorial' && renderTutorial()}
            {gameState === 'playing' && renderGame()}
            {gameState === 'win' && (
                <div className="text-center p-12 bg-gray-900 rounded-3xl border-2 border-green-500 max-w-md mx-auto">
                    <div className="text-6xl mb-6">🎯</div>
                    <h2 className="text-4xl font-black text-white mb-4">BUG HUNTER!</h2>
                    <p className="text-gray-300 mb-8">You defended the core successfully. Your logic is sharp!</p>
                    <button
                        onClick={() => onComplete(score)}
                        className="bg-green-600 px-10 py-4 rounded-2xl font-black text-xl hover:bg-green-700 transition w-full"
                    >
                        CONTINUE
                    </button>
                </div>
            )}
            {gameState === 'lose' && (
                <div className="text-center p-12 bg-gray-900 rounded-3xl border-2 border-red-500 max-w-md mx-auto">
                    <div className="text-6xl mb-6">💥</div>
                    <h2 className="text-4xl font-black text-white mb-4">CORE BREACH</h2>
                    <p className="text-gray-300 mb-8">Too many bugs overwhelmed the system.</p>
                    <button
                        onClick={() => {
                            setHealth(100);
                            setScore(0);
                            setBugs([]);
                            setGameState('playing');
                        }}
                        className="bg-red-600 px-10 py-4 rounded-2xl font-black text-xl hover:bg-red-700 transition w-full flex items-center justify-center gap-3"
                    >
                        <RotateCcw /> REBOOT SYSTEM
                    </button>
                </div>
            )}
        </div>
    );
};

export default BugBlaster;
