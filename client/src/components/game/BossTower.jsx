import React, { useState, useEffect } from 'react';
import { Trophy, Zap, Shield, ChevronRight, Swords, Sparkles } from 'lucide-react';
import TagCatcher from './TagCatcher';
import StyleLab from './StyleLab';
import BugBlaster from './BugBlaster';

const BossTower = ({ onComplete, onFail, courseTitle, course }) => {
    const [phase, setPhase] = useState('intro'); // 'intro', 'catcher', 'stylelab', 'bugblaster', 'win'
    const [xp, setXp] = useState(0);

    const handleCatcherComplete = (earnedXP) => {
        setXp(prev => prev + earnedXP);
        setPhase('stylelab');
    };

    const handleStyleComplete = (earnedXP) => {
        setXp(prev => prev + earnedXP);
        setPhase('bugblaster');
    };

    const handleBugComplete = (earnedXP) => {
        setXp(prev => prev + earnedXP);
        setPhase('win');
    };

    const renderIntro = () => (
        <div className="text-center p-12 bg-gray-900 rounded-3xl border-4 border-yellow-500 max-w-lg mx-auto shadow-2xl shadow-yellow-500/20">
            <Swords className="w-20 h-20 text-yellow-500 mx-auto mb-6 animate-bounce" />
            <h2 className="text-5xl font-black mb-4 italic tracking-tighter">THE BOSS TOWER</h2>
            <p className="text-gray-300 mb-8 text-lg">
                This is it! Prove your mastery of **{courseTitle}** by clearing all challenges in one run.
                <br /><br />
                NO ROOM FOR ERROR!
            </p>
            <button
                onClick={() => setPhase('catcher')}
                className="bg-gradient-to-r from-yellow-600 to-orange-600 px-12 py-5 rounded-2xl font-black text-2xl hover:from-yellow-700 hover:to-orange-700 transition-all shadow-xl shadow-yellow-900/40 w-full"
            >
                I'M READY
            </button>
        </div>
    );

    return (
        <div className="w-full max-w-5xl mx-auto py-12">
            {phase === 'intro' && renderIntro()}

            {phase === 'catcher' && (
                <div className="space-y-4">
                    <div className="text-center font-black text-indigo-400 text-sm tracking-[0.5em] uppercase">Phase 1: Foundations</div>
                    <TagCatcher
                        courseTitle={courseTitle}
                        catcherConfig={course?.gameLevels?.[0]?.catcherConfig}
                        onComplete={handleCatcherComplete}
                        onFail={onFail}
                    />
                </div>
            )}

            {phase === 'stylelab' && (
                <div className="space-y-4">
                    <div className="text-center font-black text-green-400 text-sm tracking-[0.5em] uppercase">Phase 2: Aesthetics</div>
                    <StyleLab
                        courseTitle={courseTitle}
                        onComplete={handleStyleComplete}
                        onFail={onFail}
                    />
                </div>
            )}

            {phase === 'bugblaster' && (
                <div className="space-y-4">
                    <div className="text-center font-black text-red-400 text-sm tracking-[0.5em] uppercase">Phase 3: Resilience</div>
                    <BugBlaster
                        courseTitle={courseTitle}
                        onComplete={handleBugComplete}
                        onFail={onFail}
                    />
                </div>
            )}

            {phase === 'win' && (
                <div className="text-center p-16 bg-gray-900 rounded-3xl border-4 border-indigo-500 max-w-lg mx-auto shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-indigo-500/10 animate-pulse" />
                    <div className="relative z-10">
                        <Sparkles className="w-20 h-20 text-yellow-400 mx-auto mb-6" />
                        <h2 className="text-5xl font-black text-white mb-4 italic">COURSE MASTER!</h2>
                        <p className="text-gray-300 mb-8 text-lg">
                            You've conquered the Boss Tower and completed the gamified journey for **{courseTitle}**.
                        </p>
                        <div className="bg-gray-800/80 p-6 rounded-2xl border border-indigo-500/30 mb-8">
                            <div className="text-xs text-gray-500 uppercase font-bold mb-1">Final XP Awarded</div>
                            <div className="text-4xl font-black text-indigo-400">+{xp + 200}</div>
                        </div>
                        <button
                            onClick={() => onComplete(xp + 200)}
                            className="bg-indigo-600 px-12 py-5 rounded-2xl font-black text-2xl hover:bg-indigo-700 transition w-full shadow-xl shadow-indigo-900/40"
                        >
                            FINISH JOURNEY
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BossTower;
