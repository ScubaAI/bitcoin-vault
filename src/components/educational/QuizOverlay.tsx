'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * QuizOverlayProps - Propiedades del componente QuizOverlay
 * QuizOverlay component properties
 */
interface QuizOverlayProps {
  lang?: string;
}

/**
 * QuizQuestion - Pregunta del quiz
 * Quiz question interface
 */
interface QuizQuestion {
  id: string;
  question: string;
  questionES: string;
  options: string[];
  optionsES: string[];
  correctAnswer: number;
  explanation: string;
  explanationES: string;
}

/**
 * QuizOverlay - Overlay de quizzes educativos
 * Educational quiz overlay component
 * 
 * Presenta preguntas para reforzar el aprendizaje sobre Bitcoin
 * Presents questions to reinforce Bitcoin learning
 */
export function QuizOverlay({ lang = 'es' }: QuizOverlayProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions: QuizQuestion[] = [
    {
      id: '1',
      question: 'What is the maximum supply of Bitcoin?',
      questionES: '¿Cuál es el suministro máximo de Bitcoin?',
      options: ['10 million', '21 million', '100 million', 'Unlimited'],
      optionsES: ['10 millones', '21 millones', '100 millones', 'Ilimitado'],
      correctAnswer: 1,
      explanation: 'Bitcoin has a maximum supply of 21 million coins, ensuring scarcity.',
      explanationES: 'Bitcoin tiene un suministro máximo de 21 millones de monedas, asegurando escasez.',
    },
    {
      id: '2',
      question: 'What is the Lightning Network?',
      questionES: '¿Qué es la Lightning Network?',
      options: [
        'A weather tracking system',
        'A second layer payment protocol',
        'A mining algorithm',
        'A cryptocurrency exchange',
      ],
      optionsES: [
        'Un sistema de seguimiento del clima',
        'Un protocolo de pago de segunda capa',
        'Un algoritmo de minería',
        'Un exchange de criptomonedas',
      ],
      correctAnswer: 1,
      explanation: 'Lightning Network is a second layer that enables fast, low-cost Bitcoin transactions.',
      explanationES: 'Lightning Network es una segunda capa que permite transacciones rápidas y baratas de Bitcoin.',
    },
    {
      id: '3',
      question: 'How often does Bitcoin halving occur?',
      questionES: '¿Con qué frecuencia ocurre el halving de Bitcoin?',
      options: ['Every year', 'Every 2 years', 'Every 4 years', 'Every 10 years'],
      optionsES: ['Cada año', 'Cada 2 años', 'Cada 4 años', 'Cada 10 años'],
      correctAnswer: 2,
      explanation: 'Bitcoin halving occurs approximately every 4 years, or every 210,000 blocks.',
      explanationES: 'El halving de Bitcoin ocurre aproximadamente cada 4 años, o cada 210,000 bloques.',
    },
  ];

  const isSpanish = lang === 'es';
  const currentQ = questions[currentQuestion];

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setShowResult(true);
    if (index === currentQ.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizCompleted(false);
  };

  return (
    <>
      {/* Botón para abrir quiz / Button to open quiz */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full shadow-lg"
      >
        {isSpanish ? '📝 Probar Conocimientos' : '📝 Test Knowledge'}
      </motion.button>

      {/* Modal del quiz / Quiz modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-2xl border border-purple-500/30 p-8 max-w-lg w-full"
            >
              {!quizCompleted ? (
                <>
                  {/* Header / Encabezado */}
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-purple-400">
                      {isSpanish ? 'Quiz de Bitcoin' : 'Bitcoin Quiz'}
                    </h2>
                    <span className="text-gray-400">
                      {currentQuestion + 1} / {questions.length}
                    </span>
                  </div>

                  {/* Progreso / Progress */}
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
                    <div
                      className="bg-purple-500 h-2 rounded-full transition-all"
                      style={{
                        width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                      }}
                    />
                  </div>

                  {/* Pregunta / Question */}
                  <h3 className="text-lg text-white mb-4">
                    {isSpanish ? currentQ.questionES : currentQ.question}
                  </h3>

                  {/* Opciones / Options */}
                  <div className="space-y-2 mb-4">
                    {(isSpanish ? currentQ.optionsES : currentQ.options).map(
                      (option, index) => (
                        <button
                          key={index}
                          onClick={() => !showResult && handleAnswer(index)}
                          disabled={showResult}
                          className={`w-full p-3 rounded-lg text-left transition ${
                            showResult
                              ? index === currentQ.correctAnswer
                                ? 'bg-green-500/20 border-green-500'
                                : index === selectedAnswer
                                ? 'bg-red-500/20 border-red-500'
                                : 'bg-gray-800'
                              : 'bg-gray-800 hover:bg-gray-700'
                          } border ${
                            showResult && index === currentQ.correctAnswer
                              ? 'border-green-500'
                              : 'border-transparent'
                          }`}
                        >
                          {option}
                        </button>
                      )
                    )}
                  </div>

                  {/* Explicación / Explanation */}
                  {showResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-lg mb-4 ${
                        selectedAnswer === currentQ.correctAnswer
                          ? 'bg-green-500/20'
                          : 'bg-red-500/20'
                      }`}
                    >
                      <p className="text-sm">
                        {isSpanish ? currentQ.explanationES : currentQ.explanation}
                      </p>
                    </motion.div>
                  )}

                  {/* Botón siguiente / Next button */}
                  {showResult && (
                    <button
                      onClick={handleNext}
                      className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-bold transition"
                    >
                      {currentQuestion === questions.length - 1
                        ? isSpanish
                          ? 'Ver Resultados'
                          : 'View Results'
                        : isSpanish
                        ? 'Siguiente'
                        : 'Next'}
                    </button>
                  )}
                </>
              ) : (
                /* Resultados / Results */
                <div className="text-center">
                  <div className="text-6xl mb-4">
                    {score === questions.length ? '🏆' : score > 0 ? '⭐' : '📚'}
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {isSpanish ? '¡Quiz Completado!' : 'Quiz Completed!'}
                  </h2>
                  <p className="text-xl text-purple-400 mb-4">
                    {isSpanish
                      ? `Puntuación: ${score} de ${questions.length}`
                      : `Score: ${score} of ${questions.length}`}
                  </p>
                  <button
                    onClick={resetQuiz}
                    className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition"
                  >
                    {isSpanish ? 'Intentar de Nuevo' : 'Try Again'}
                  </button>
                </div>
              )}

              {/* Botón cerrar / Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
