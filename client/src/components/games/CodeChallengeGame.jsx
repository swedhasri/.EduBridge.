import React, { useState } from 'react';
import { CheckCircle, XCircle, Code, Trophy, RotateCcw } from 'lucide-react';

const CodeChallengeGame = ({ game, onComplete }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [gameCompleted, setGameCompleted] = useState(false);

    const question = game.questions[currentQuestion];
    const totalQuestions = game.questions.length;
    const progress = ((currentQuestion + 1) / totalQuestions) * 100;

    const handleSubmit = () => {
        const isCorrect = userAnswer.trim() === question.correctAnswer.trim();
        if (isCorrect) {
            setScore(score + 1);
        }
        setShowResult(true);
    };

    const handleNext = () => {
        if (currentQuestion < totalQuestions - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setUserAnswer('');
            setShowResult(false);
        } else {
            setGameCompleted(true);
            if (onComplete) {
                onComplete({ score, total: totalQuestions, percentage: (score / totalQuestions) * 100 });
            }
        }
    };

    const handleRestart = () => {
        setCurrentQuestion(0);
        setUserAnswer('');
        setShowResult(false);
        setScore(0);
        setGameCompleted(false);
    };

    if (gameCompleted) {
        const percentage = (score / totalQuestions) * 100;
        return (
            <div className="max-w-3xl mx-auto p-8">
                <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                    <div className="mb-6">
                        <Trophy className="w-20 h-20 mx-auto text-yellow-500" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Challenge Complete!</h2>
                    <div className="text-6xl font-bold text-purple-600 mb-4">
                        {score}/{totalQuestions}
                    </div>
                    <p className="text-xl text-gray-600 mb-8">
                        You scored {percentage.toFixed(0)}%
                    </p>
                    <button
                        onClick={handleRestart}
                        className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
                    >
                        <RotateCcw size={20} />
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-8">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Progress Bar */}
                <div className="bg-gray-100 h-2">
                    <div
                        className="bg-purple-600 h-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="p-8">
                    {/* Question Counter */}
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-sm font-medium text-gray-500">
                            Challenge {currentQuestion + 1} of {totalQuestions}
                        </span>
                        <span className="text-sm font-medium text-purple-600">
                            Score: {score}/{currentQuestion + (showResult ? 1 : 0)}
                        </span>
                    </div>

                    {/* Question */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Code className="text-purple-600" size={24} />
                            <h3 className="text-xl font-bold text-gray-900">
                                {question.question}
                            </h3>
                        </div>

                        {/* Code Display */}
                        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm mb-4 overflow-x-auto">
                            <pre>{question.code}</pre>
                        </div>
                    </div>

                    {/* Answer Input */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Your Answer:
                        </label>
                        <input
                            type="text"
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            disabled={showResult}
                            placeholder="Type your answer here..."
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none font-mono disabled:bg-gray-100"
                        />
                    </div>

                    {/* Result */}
                    {showResult && (
                        <div className={`p-4 rounded-lg mb-6 ${userAnswer.trim() === question.correctAnswer.trim()
                                ? 'bg-green-50 border-2 border-green-200'
                                : 'bg-red-50 border-2 border-red-200'
                            }`}>
                            <div className="flex items-start gap-3 mb-2">
                                {userAnswer.trim() === question.correctAnswer.trim() ? (
                                    <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={24} />
                                ) : (
                                    <XCircle className="text-red-600 flex-shrink-0 mt-1" size={24} />
                                )}
                                <div>
                                    <p className="font-semibold text-gray-900 mb-1">
                                        {userAnswer.trim() === question.correctAnswer.trim() ? 'Correct!' : 'Incorrect'}
                                    </p>
                                    {userAnswer.trim() !== question.correctAnswer.trim() && (
                                        <p className="text-sm text-gray-700 mb-2">
                                            Correct answer: <code className="bg-white px-2 py-1 rounded">{question.correctAnswer}</code>
                                        </p>
                                    )}
                                    <p className="text-sm text-gray-700">{question.explanation}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    {!showResult ? (
                        <button
                            onClick={handleSubmit}
                            disabled={!userAnswer.trim()}
                            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            Submit Answer
                        </button>
                    ) : (
                        <button
                            onClick={handleNext}
                            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
                        >
                            {currentQuestion < totalQuestions - 1 ? 'Next Challenge' : 'Finish'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CodeChallengeGame;
