/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from 'react';
import { useAppSelector } from "@/redux/hooks";
import { Search, Users, FileText, Clock, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const Dashboard = () => {
    const exams = useAppSelector(state => (state as any).exam.exams) || [];
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(4); // Default to 4 as requested earlier

    const totalPages = Math.ceil(exams.length / pageSize) || 1;
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedExams = exams.slice(startIndex, startIndex + pageSize);

    return (
        <div className="w-full max-w-7xl mx-auto py-4 md:py-8 px-4 md:px-8 flex flex-col min-h-full pb-16">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">Online Tests</h1>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    <div className="relative shadow-sm rounded-md w-full sm:w-auto">
                        {/* <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" /> */}
                        <input
                            type="text"
                            placeholder="Search by exam title"
                            className="pl-5 pr-4 py-2.5 border border-gray-200 rounded-lg bg-white w-full sm:w-72 focus:outline-none focus:ring-1 focus:ring-[#8376ff] text-sm text-gray-600 placeholder-gray-300"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center bg-[#8376ff]/10 rounded-full font-bold">
                            <Search className="w-3 h-3 text-[#8376ff]" />
                        </div>
                    </div>
                    <Link href="/dashboard/manage-online-test" className="w-full sm:w-auto">
                        <button className="w-full sm:w-auto px-5 py-2.5 bg-[#6633FF] text-white font-semibold rounded-lg hover:bg-[#6c61d5] transition-colors shadow-sm tracking-wide">
                            Create Online Test
                        </button>
                    </Link>
                </div>
            </div>

            {exams.length === 0 ? (
                <div className="flex flex-col items-center justify-center flex-1 py-20 md:py-40 bg-white rounded-2xl shadow-sm border border-gray-100 mt-4 px-4">
                    <div className="mb-6 relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center">
                        {/* <FolderX className="w-10 h-10 md:w-12 md:h-12 text-[#8376ff]" /> */}
                        <Image
                            src="/noexam.png"
                            alt="No tests available"
                            width={96}
                            height={96}
                        />

                    </div>
                    <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-2">No Online Test Available</h2>
                    <p className="text-gray-500 text-center  text-xs md:text-sm">
                        Currently, there are no online tests available. Please check back later for updates.
                    </p>
                </div>
            ) : (
                <div className="mt-4 flex flex-col items-center flex-1 w-full justify-between">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
                        {paginatedExams.map((exam: any) => (
                            <div key={exam.id} className="bg-white p-5 md:p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4 md:gap-6">
                                <h3 className="font-bold text-base md:text-lg text-gray-800 tracking-tight">{exam.title}</h3>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8 text-xs md:text-sm text-gray-500">
                                    <div className="flex items-center gap-1.5">
                                        <Users className="w-4 h-4 text-gray-400" />
                                        <span>Candidates: <span className="font-semibold text-gray-900">{exam.totalCandidates}</span></span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <FileText className="w-4 h-4 text-gray-400" />
                                        <span>Question Set: <span className="font-semibold text-gray-900">{exam.questionSetsCount}</span></span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="w-4 h-4 text-gray-400" />
                                        <span>Exam Slots: <span className="font-semibold text-gray-900">{exam.totalSlots}</span></span>
                                    </div>
                                </div>
                                <button className="w-full sm:w-auto px-6 py-2 md:py-2.5 border border-[#6633FF] text-[#6633FF] font-semibold text-sm rounded-lg hover:bg-[#8376ff]/5 sm:self-start transition-colors md:px-8">
                                    View Candidates
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="w-full mt-auto pt-8 flex flex-col sm:flex-row items-center sm:justify-between gap-6">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-gray-600 disabled:opacity-30 bg-white shadow-sm transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                            </button>
                            <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-sm md:text-base font-bold text-gray-900">
                                {currentPage}
                            </div>
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-gray-600 disabled:opacity-30 bg-white shadow-sm transition-colors"
                            >
                                <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                            </button>
                        </div>

                        <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm text-gray-500 font-medium tracking-wide">
                            <span>Online Test Per Page</span>
                            <div className="relative border border-gray-200 rounded-lg px-2 py-1 md:px-3 md:py-1.5 flex items-center justify-between w-12 md:w-14 bg-white shadow-sm font-semibold text-gray-700">
                                <select
                                    value={pageSize}
                                    onChange={(e) => {
                                        setPageSize(Number(e.target.value));
                                        setCurrentPage(1);
                                    }}
                                    className="appearance-none bg-transparent outline-none cursor-pointer w-full z-10"
                                >
                                    <option value={4}>4</option>
                                    <option value={8}>8</option>
                                    <option value={12}>12</option>
                                </select>
                                <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-1.5 md:right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
