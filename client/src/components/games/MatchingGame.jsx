import React, { useState, useEffect } from 'react';
import { CheckCircle, Trophy, RotateCcw, Shuffle } from 'lucide-react';

const MatchingGame = ({ game, onComplete }) => {
    const [pairs, setPairs] = useState([]);
    const [shuffledDefinitions, setShuffledDefinitions] = useState([]);
    const [selectedTerm, setSelectedTerm] = useState(null);
    const [selectedDefinition, setSelectedDefinition] = useState(null);
    const [matches, setMatches] = useState([]);
    const [attempts, setAttempts] = useState(0);
    const [gameCompleted, setGameCompleted] = useState(false);

    useEffect(() => {
        if (game.questions && game.questions[0] && game.questions[0].pairs) {
            const gamePairs = game.questions[0].pairs;
            setPairs(gamePairs);

            // Shuffle definitions
            const definitions = [...gamePairs].sort(() => Math.random() - 0.5);
            setShuffledDefinitions(definitions);
        }
    }, [game]);

    const handleTermClick = (term) => {
        if (matches.some(m => m.term === term)) return;
        setSelectedTerm(term);

        if (selectedDefinition) {
            checkMatch(term, selectedDefinition);
        }
    };

    const handleDefinitionClick = (definition) => {
        if (matches.some(m => m.definition === definition)) return;
        setSelectedDefinition(definition);

        if (selectedTerm) {
            checkMatch(selectedTerm, definition);
        }
    };

    const checkMatch = (term, definition) => {
        setAttempts(attempts + 1);

        const correctPair = pairs.find(p => p.term === term && p.definition === definition);

        if (correctPair) {
            const newMatches = [...matches, { term, definition }];
            setMatches(newMatches);
            setSelectedTerm(null);
            setSelectedDefinition(null);

            if (newMatches.length === pairs.length) {
                setGameCompleted(true);
                if (onComplete) {
                    const accuracy = (pairs.length / attempts) * 100;
                    onComplete({ score: pairs.length, total: pairs.length, accuracy: accuracy.toFixed(0) });
                }
            }
        } else {
            // Show incorrect feedback briefly
            setTimeout(() => {
                setSelectedTerm(null);
                setSelectedDefinition(null);
            }, 500);
        }
    };

    const handleRestart = () => {
        setMatches([]);
        setSelectedTerm(null);
        setSelectedDefinition(null);
        setAttempts(0);
        setGameCompleted(false);
        const definitions = [...pairs].sort(() => Math.random() - 0.5);
        setShuffledDefinitions(definitions);
    };

    if (gameCompleted) {
        const accuracy = (pairs.length / attempts) * 100;
        return (
            <div className="max-w-4xl mx-auto p-8">
                <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                    <div className="mb-6">
                        <Trophy className="w-20 h-20 mx-auto text-yellow-500" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">All Matched!</h2>
                    <div className="text-6xl font-bold text-purple-600 mb-4">
                        {pairs.length}/{pairs.length}
                    </div>
                    <p className="text-xl text-gray-600 mb-2">
                        Completed in {attempts} attempts
                    </p>
                    <p className="text-lg text-gray-500 mb-8">
                        Accuracy: {accuracy.toFixed(0)}%
                    </p>
                    <button
                        onClick={handleRestart}
                        className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
                    >
                        <RotateCcw size={20} />
                        Play Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Match the Pairs</h2>
                        <p className="text-gray-600">Click a term and then its matching definition</p>
                    </div>
                    <div className="text-right">
                        <div className="text-sm text-gray-500">Matches</div>
                        <div className="text-2xl font-bold text-purple-600">
                            {matches.length}/{pairs.length}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">Attempts: {attempts}</div>
                    </div>
                </div>

                {/* Game Board */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Terms Column */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                            <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
                            Terms
                        </h3>
                        {pairs.map((pair, index) => {
                            const isMatched = matches.some(m => m.term === pair.term);
                            const isSelected = selectedTerm === pair.term;

                            return (
                                <button
                                    key={index}
                                    onClick={() => handleTermClick(pair.term)}
                                    disabled={isMatched}
                                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${isMatched
                                            ? 'border-purple-500 bg-purple-50 cursor-not-allowed'
                                            : isSelected
                                                ? 'border-purple-500 bg-purple-50 shadow-lg scale-105'
                                                : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50 cursor-pointer'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className={`font-semibold ${isMatched ? 'text-purple-700' : 'text-gray-900'}`}>
                                            {pair.term}
                                        </span>
                                        {isMatched && <CheckCircle className="text-purple-600" size={20} />}
                                        {isMatched && <CheckCircle className="text-green-600" size={20} />}
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Definitions Column */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                            <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
                            Definitions
                        </h3>
                        {shuffledDefinitions.map((pair, index) => {
                            const isMatched = matches.some(m => m.definition === pair.definition);
                            const isSelected = selectedDefinition === pair.definition;

                            return (
                                <button
                                    key={index}
                                    onClick={() => handleDefinitionClick(pair.definition)}
                                    disabled={isMatched}
                                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${isMatched
                                            ? 'border-green-500 bg-green-50 cursor-not-allowed'
                                            : isSelected
                                                ? 'border-purple-500 bg-purple-50 shadow-lg scale-105'
                                                : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50 cursor-pointer'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className={`${isMatched ? 'text-green-700' : 'text-gray-700'}`}>
                                            {pair.definition}
                                        </span>
                                        {isMatched && <CheckCircle className="text-green-600" size={20} />}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Hint */}
                {matches.length === 0 && attempts === 0 && (
                    <div className="mt-8 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                        <p className="text-blue-800 text-center">
                            💡 <strong>Tip:</strong> Click a term on the left, then click its matching definition on the right
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MatchingGame;
