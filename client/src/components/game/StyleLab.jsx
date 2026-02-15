import React, { useState, useEffect } from 'react';
import { Target, CheckCircle2, RotateCcw, Play, Sparkles } from 'lucide-react';

const StyleLab = ({ onComplete, onFail, courseTitle }) => {
    const targets = [
        { name: 'Rounded Button', styles: { borderRadius: '20px', padding: '15px', backgroundColor: '#4f46e5' } },
        { name: 'Spaced Box', styles: { borderRadius: '0px', padding: '40px', backgroundColor: '#e11d48' } },
        { name: 'Pill Shape', styles: { borderRadius: '50px', padding: '10px', backgroundColor: '#059669' } },
    ];

    const [level, setLevel] = useState(0);
    const [userStyles, setUserStyles] = useState({ borderRadius: 0, padding: 0, color: '#6366f1' });
    const [gameState, setGameState] = useState('tutorial'); // 'tutorial', 'playing', 'win', 'complete'

    const currentTarget = targets[level];

    const handleComplete = () => {
        if (level < targets.length - 1) {
            setLevel(l => l + 1);
            setUserStyles({ borderRadius: 0, padding: 0, color: '#6366f1' });
        } else {
            setGameState('complete');
            onComplete(100); // 100 XP
        }
    };

    const isMatch = () => {
        const target = currentTarget.styles;
        const brMatch = Math.abs(parseInt(userStyles.borderRadius) - parseInt(target.borderRadius)) < 15;
        const pMatch = Math.abs(parseInt(userStyles.padding) - parseInt(target.padding)) < 15;
        return brMatch && pMatch;
    };

    const renderTutorial = () => (
        <div className="text-center p-8 bg-gray-900 rounded-3xl border-2 border-indigo-500 max-w-md mx-auto">
            <Sparkles className="w-16 h-16 text-indigo-400 mx-auto mb-6 animate-pulse" />
            <h2 className="text-3xl font-bold mb-4">Style Lab!</h2>
            <p className="text-gray-300 mb-8 leading-relaxed">
                Adjust the CSS sliders to make the **User Box** match the **Target Box**.
                <br /><br />
                Master the art of Padding and Border-Radius!
            </p>
            <button
                onClick={() => setGameState('playing')}
                className="bg-indigo-600 px-10 py-4 rounded-2xl font-black text-xl hover:bg-indigo-700 transition w-full"
            >
                START EXPERIMENT
            </button>
        </div>
    );

    const renderGame = () => (
        <div className="bg-gray-800 p-8 rounded-3xl border-2 border-gray-700 shadow-2xl max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-12 items-center justify-center mb-12">
                {/* Target */}
                <div className="text-center">
                    <div className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-4">Target</div>
                    <div
                        className="w-48 h-48 flex items-center justify-center text-white font-bold transition-all duration-300"
                        style={{
                            borderRadius: currentTarget.styles.borderRadius,
                            padding: currentTarget.styles.padding,
                            backgroundColor: currentTarget.styles.backgroundColor
                        }}
                    >
                        {currentTarget.name}
                    </div>
                </div>

                <div className="text-4xl text-gray-600 font-bold">VS</div>

                {/* User Preview */}
                <div className="text-center">
                    <div className="text-xs font-bold text-green-400 uppercase tracking-widest mb-4">Your Lab</div>
                    <div
                        className="w-48 h-48 flex items-center justify-center text-white font-bold transition-all duration-100 shadow-xl shadow-indigo-500/20"
                        style={{
                            borderRadius: `${userStyles.borderRadius}px`,
                            padding: `${userStyles.padding}px`,
                            backgroundColor: userStyles.color
                        }}
                    >
                        Lab Result
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="space-y-8 bg-gray-900 p-8 rounded-2xl border border-gray-700">
                <div>
                    <label className="flex justify-between text-sm font-bold text-gray-400 mb-2">
                        <span>Border Radius</span>
                        <span className="text-indigo-400">{userStyles.borderRadius}px</span>
                    </label>
                    <input
                        type="range" min="0" max="100"
                        value={userStyles.borderRadius}
                        onChange={(e) => setUserStyles({ ...userStyles, borderRadius: e.target.value })}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                </div>

                <div>
                    <label className="flex justify-between text-sm font-bold text-gray-400 mb-2">
                        <span>Padding</span>
                        <span className="text-indigo-400">{userStyles.padding}px</span>
                    </label>
                    <input
                        type="range" min="0" max="60"
                        value={userStyles.padding}
                        onChange={(e) => setUserStyles({ ...userStyles, padding: e.target.value })}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                </div>

                <button
                    onClick={handleComplete}
                    disabled={!isMatch()}
                    className={`w-full py-4 rounded-xl font-black text-xl transition-all duration-300 flex items-center justify-center gap-3 ${isMatch()
                        ? 'bg-green-600 text-white hover:bg-green-700 scale-105'
                        : 'bg-gray-800 text-gray-500 cursor-not-allowed opacity-50'
                        }`}
                >
                    {isMatch() ? <CheckCircle2 /> : <Target />}
                    {isMatch() ? 'MATCH FOUND!' : 'KEEP ADJUSTING'}
                </button>
            </div>

            <div className="mt-6 flex justify-center gap-2">
                {targets.map((_, i) => (
                    <div key={i} className={`h-2 w-8 rounded-full ${i <= level ? 'bg-indigo-500' : 'bg-gray-700'}`} />
                ))}
            </div>
        </div>
    );

    return (
        <div className="w-full max-w-4xl mx-auto py-12 relative z-30">
            {gameState === 'tutorial' && renderTutorial()}
            {gameState === 'playing' && renderGame()}
            {gameState === 'complete' && (
                <div className="text-center p-12 bg-gray-900 rounded-3xl border-2 border-green-500 max-w-md mx-auto">
                    <PartyPopper size={64} className="text-yellow-400 mx-auto mb-6" />
                    <h2 className="text-4xl font-black text-white mb-4">STYLE MASTER!</h2>
                    <p className="text-gray-300 mb-8">You've successfully completed the Style Lab.</p>
                    <button
                        onClick={() => onComplete(100)}
                        className="bg-green-600 px-10 py-4 rounded-2xl font-black text-xl hover:bg-green-700 transition w-full"
                    >
                        CONTINUE
                    </button>
                </div>
            )}
        </div>
    );
};

const PartyPopper = ({ size, className }) => (
    <svg
        width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        className={className}
    >
        <path d="M5.8 11.3 2 22l10.7-3.8" />
        <path d="m4 18 2.5 2.5" />
        <path d="M7 16l-1.5-1.5" />
        <circle cx="17" cy="6" r="2" />
        <path d="M19 14.5a1.5 1.5 0 0 1-3 0V11a1 1 0 0 1 1-1h1.5a1.5 1.5 0 0 1 0 3H17" />
        <path d="M11 3.5a1.5 1.5 0 0 1 3 0V7a1 1 0 0 1-1 1h-1.5a1.5 1.5 0 0 1 0-3H12" />
    </svg>
);

export default StyleLab;
