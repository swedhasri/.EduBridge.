import React, { useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Trophy, RotateCcw } from 'lucide-react';

const ScenarioGame = ({ game, onComplete }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [score, setScore] = useState(0);
    const [gameCompleted, setGameCompleted] = useState(false);

    const question = game.questions[currentQuestion];
    const totalQuestions = game.questions.length;
    const progress = ((currentQuestion + 1) / totalQuestions) * 100;

    const handleAnswerSelect = (answer) => {
        if (showExplanation) return;

        setSelectedAnswer(answer);
        setShowExplanation(true);

        const isCorrect = answer === question.correctAnswer;
        if (isCorrect) {
            setScore(score + 1);
        }
    };

    const handleNext = () => {
        if (currentQuestion < totalQuestions - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setShowExplanation(false);
        } else {
            setGameCompleted(true);
            if (onComplete) {
                onComplete({ score, total: totalQuestions, percentage: (score / totalQuestions) * 100 });
            }
        }
    };

    const handleRestart = () => {
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setShowExplanation(false);
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
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Scenario Complete!</h2>
                    <div className="text-6xl font-bold text-purple-600 mb-4">
                        {score}/{totalQuestions}
                    </div>
                    <p className="text-xl text-gray-600 mb-8">
                        You made {percentage.toFixed(0)}% correct decisions
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
                            Scenario {currentQuestion + 1} of {totalQuestions}
                        </span>
                        <span className="text-sm font-medium text-purple-600">
                            Score: {score}/{currentQuestion + (showExplanation ? 1 : 0)}
                        </span>
                    </div>

                    {/* Scenario */}
                    <div className="mb-8">
                        <div className="flex items-start gap-3 p-4 bg-amber-50 border-2 border-amber-200 rounded-lg mb-6">
                            <AlertTriangle className="text-amber-600 flex-shrink-0 mt-1" size={24} />
                            <div>
                                <h4 className="font-semibold text-amber-900 mb-1">Scenario</h4>
                                <p className="text-amber-800">{question.question}</p>
                            </div>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            What would you do?
                        </h3>
                    </div>

                    {/* Options */}
                    <div className="space-y-3 mb-8">
                        {question.options.map((option, index) => {
                            const isSelected = selectedAnswer === option;
                            const isCorrect = option === question.correctAnswer;
                            const showCorrect = showExplanation && isCorrect;
                            const showIncorrect = showExplanation && isSelected && !isCorrect;

                            return (
                                <button
                                    key={index}
                                    onClick={() => handleAnswerSelect(option)}
                                    disabled={showExplanation}
                                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${showCorrect
                                            ? 'border-green-500 bg-green-50'
                                            : showIncorrect
                                                ? 'border-red-500 bg-red-50'
                                                : isSelected
                                                    ? 'border-purple-500 bg-purple-50'
                                                    : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                                        } ${showExplanation ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium text-gray-900">{option}</span>
                                        {showCorrect && <CheckCircle className="text-green-600" size={24} />}
                                        {showIncorrect && <XCircle className="text-red-600" size={24} />}
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Explanation */}
                    {showExplanation && (
                        <div className={`p-4 rounded-lg mb-6 ${selectedAnswer === question.correctAnswer
                                ? 'bg-green-50 border-2 border-green-200'
                                : 'bg-blue-50 border-2 border-blue-200'
                            }`}>
                            <p className="font-semibold text-gray-900 mb-2">
                                {selectedAnswer === question.correctAnswer ? '✓ Excellent Decision!' : 'ℹ Why this matters:'}
                            </p>
                            <p className="text-gray-700">{question.explanation}</p>
                        </div>
                    )}

                    {/* Next Button */}
                    {showExplanation && (
                        <button
                            onClick={handleNext}
                            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
                        >
                            {currentQuestion < totalQuestions - 1 ? 'Next Scenario' : 'Finish'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ScenarioGame;
