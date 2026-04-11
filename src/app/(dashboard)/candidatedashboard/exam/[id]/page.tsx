/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect, use } from 'react';
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from 'next/navigation';
import { Clock, ChevronRight,  CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
// import { toast } from 'sonner';

const ExamPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = use(params);
    const router = useRouter();
    const exams = useAppSelector(state => (state as any).exam.exams) || [];
    const exam = exams.find((e: any) => e.id === id);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState<number | null>(null);
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [isFinished, setIsFinished] = useState(false);
    const [isTimeout, setIsTimeout] = useState(false);

    useEffect(() => {
        if (exam && timeLeft === null) {
            setTimeLeft(Number(exam.duration) * 60);
        }
    }, [exam, timeLeft]);

    useEffect(() => {
        if (timeLeft === null || isFinished) return;

        if (timeLeft <= 0) {
            handleTimeout();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prev => (prev !== null ? prev - 1 : null));
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, isFinished]);

    const formatTime = (seconds: number | null) => {
        if (seconds === null) return "Loading...";
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')} left`;
    };

    const handleTimeout = () => {
        setIsTimeout(true);
        setIsFinished(true);
    };

    const handleOptionSelect = (questionId: string, optionIndex: number) => {
        const question = exam.questions[currentQuestionIndex];
        if (question.type === 'radio') {
            setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
        } else if (question.type === 'checkbox') {
            const currentAnswers = answers[questionId] || [];
            if (currentAnswers.includes(optionIndex)) {
                setAnswers(prev => ({ ...prev, [questionId]: currentAnswers.filter((i: number) => i !== optionIndex) }));
            } else {
                setAnswers(prev => ({ ...prev, [questionId]: [...currentAnswers, optionIndex] }));
            }
        }
    };

    const handleTextAnswer = (questionId: string, value: string) => {
        setAnswers(prev => ({ ...prev, [questionId]: value }));
    };

    const handleNext = () => {
        if (currentQuestionIndex < exam.questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setIsFinished(true);
        }
    };

    if (!exam) return <div className="p-20 text-center font-bold text-xl">Exam not found</div>;

    const currentQuestion = exam.questions[currentQuestionIndex];

    // Success Screen
    if (isFinished && !isTimeout) {
        return (
            <div className="fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center p-8">
                <div className="w-full max-w-2xl bg-white border border-gray-100 rounded-3xl shadow-2xl p-12 text-center flex flex-col items-center gap-8 animate-in fade-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-[#8376ff]">
                        <CheckCircle2 className="w-12 h-12" />
                    </div>
                    <div className="space-y-4">
                        <h1 className="text-3xl font-bold text-gray-900">Test Completed</h1>
                        <p className="text-gray-500 max-w-md mx-auto">
                            For completion of this Online Test. You have successfully finished your {exam.title}. Thank you for participating.
                        </p>
                    </div>
                    <button 
                         onClick={() => router.push('/candidatedashboard')}
                         className="text-[#8376ff] font-bold hover:underline"
                    >
                        Back to Dashboard
                    </button>
                </div>
                <div className="mt-20 w-full max-w-4xl opacity-30 flex justify-center">
                    <Image src="/footer.png" alt="Footer Logo" width={150} height={40} className="grayscale" />
                </div>
            </div>
        );
    }

    // Timeout Modal/Screen
    if (isTimeout) {
        return (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                <div className="bg-white rounded-[40px] shadow-2xl p-12 text-center flex flex-col items-center gap-8 max-w-lg w-full transform animate-in slide-in-from-bottom-8 duration-300">
                    <div className="relative w-24 h-24 mb-2">
                        <Image src="/timeout.png" alt="Timeout" fill className="object-contain" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold text-gray-900">Timeout!</h2>
                        <p className="text-gray-500 text-sm">Oops! No Time Remaining. You have reached the test time limit. Thanks for your participating.</p>
                    </div>
                    <button 
                         onClick={() => router.push('/candidatedashboard')}
                         className="w-full py-4 bg-[#8376ff] text-white font-bold rounded-2xl hover:bg-[#6c61d5] transition-all shadow-lg shadow-[#8376ff]/20"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-5xl mx-auto py-12 px-8 flex flex-col gap-10 min-h-[calc(100vh-150px)]">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="bg-white border border-gray-100 shadow-sm rounded-xl px-6 py-3 flex items-center gap-4">
                   <p className="text-gray-500 font-medium tracking-wide">Question {currentQuestionIndex + 1}/{exam.questions.length}</p>
                </div>

                <div className="bg-white border border-gray-100 shadow-sm rounded-xl px-10 py-3 flex items-center gap-4">
                    <Clock className="w-5 h-5 text-[#8376ff]" />
                    <p className={`font-black text-xl tracking-wider ${timeLeft !== null && timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-gray-900'}`}>
                        {formatTime(timeLeft)}
                    </p>
                </div>
            </div>

            {/* Question Area */}
            <div className="bg-white border border-gray-100 shadow-sm rounded-3xl p-10 flex flex-col gap-8 flex-1">
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-900 leading-snug">
                       Q{currentQuestionIndex + 1}. {currentQuestion.title}
                    </h2>

                    {/* Options */}
                    <div className="space-y-4">
                        {currentQuestion.type === 'text' ? (
                            <textarea 
                                className="w-full p-5 border border-gray-200 rounded-2xl bg-gray-50/30 focus:outline-none focus:ring-1 focus:ring-[#8376ff] min-h-[200px] text-gray-700 leading-relaxed"
                                placeholder="Write your answer here..."
                                value={answers[currentQuestion.id] || ""}
                                onChange={(e) => handleTextAnswer(currentQuestion.id, e.target.value)}
                            />
                        ) : (
                            <div className="grid grid-cols-1 gap-4">
                                {currentQuestion.options?.map((option: any, index: number) => {
                                    const isSelected = currentQuestion.type === 'radio' 
                                        ? answers[currentQuestion.id] === index
                                        : (answers[currentQuestion.id] || []).includes(index);

                                    return (
                                        <button 
                                            key={index}
                                            onClick={() => handleOptionSelect(currentQuestion.id, index)}
                                            className={`flex items-center gap-4 p-5 rounded-2xl border transition-all text-left ${
                                                isSelected 
                                                ? 'border-[#8376ff] bg-[#8376ff]/5' 
                                                : 'border-gray-100 hover:border-gray-300 bg-white'
                                            }`}
                                        >
                                            <div className={`w-6 h-6 flex items-center justify-center border-2 transition-all ${
                                                isSelected ? 'border-[#8376ff]' : 'border-gray-300'
                                            } ${currentQuestion.type === 'radio' ? 'rounded-full' : 'rounded-md'}`}>
                                                {isSelected && <div className={`bg-[#8376ff] ${currentQuestion.type === 'radio' ? 'w-2.5 h-2.5 rounded-full' : 'w-full h-full'}`} />}
                                            </div>
                                            <span className={`font-medium ${isSelected ? 'text-[#8376ff]' : 'text-gray-700'}`}>
                                               {option.text}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer Controls */}
                <div className="mt-auto pt-10 flex items-center justify-between sm:flex-row flex-col gap-4">
                    <button 
                        onClick={handleNext}
                        className="text-gray-400 font-bold text-sm tracking-wide hover:text-gray-600 transition-colors"
                    >
                        Skip this question
                    </button>
                    <button 
                        onClick={handleNext}
                        className="px-8 py-3.5 bg-[#6633FF] text-white font-bold rounded-2xl hover:bg-[#6c61d5] transition-all flex items-center gap-2 shadow-lg shadow-[#8376ff]/20"
                    >
                        {currentQuestionIndex === exam.questions.length - 1 ? 'Finish Test' : 'Save & Continue'}
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExamPage;
