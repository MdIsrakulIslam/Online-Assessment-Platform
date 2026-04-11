/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from 'react';
import { useAppSelector } from "@/redux/hooks";
import { Search, FolderX, Users, FileText, Clock, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';

const CandidateDashboard = () => {
    const exams = useAppSelector(state => (state as any).exam.exams) || [];
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(4);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredExams = exams.filter((exam: any) => 
        exam.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredExams.length / pageSize) || 1;
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedExams = filteredExams.slice(startIndex, startIndex + pageSize);

    return (
        <div className="w-full max-w-7xl mx-auto py-8 px-8 flex flex-col min-h-full pb-16">
            <div className="flex items-center justify-between mb-8 sm:flex-row flex-col gap-4">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Online Tests</h1>
                
                <div className="flex items-center gap-4">
                    <div className="relative shadow-sm rounded-md">
                        {/* <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" /> */}
                        <input 
                            type="text" 
                            placeholder="Search by exam title" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-5 pr-4 py-2.5 border border-gray-200 rounded-lg bg-white w-72 focus:outline-none focus:ring-1 focus:ring-[#8376ff] text-sm text-gray-600 placeholder-gray-300 "
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center bg-[#8376ff]/10 rounded-full font-bold">
                           <Search className="w-3 h-3 text-[#8376ff]" strokeWidth={3} />
                        </div>
                    </div>
                </div>
            </div>

            {filteredExams.length === 0 ? (
                <div className="flex flex-col items-center justify-center flex-1 py-40 bg-white rounded-2xl shadow-sm border border-gray-100 mt-4">
                    <div className="mb-6 relative w-24 h-24 flex items-center justify-center bg-blue-50 bg-opacity-50 rounded-2xl">
                        <FolderX className="w-12 h-12 text-[#8376ff]" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">{searchTerm ? "No Search Results Found" : "No Online Test Available"}</h2>
                    <p className="text-gray-500 text-center max-w-md text-sm">
                        {searchTerm ? "We couldn't find any tests matching your search. Try a different title." : "Presently, there are no online tests available. Please check back later for updates."}
                    </p>
                </div>
            ) : (
                <div className="mt-4 flex flex-col items-center flex-1 w-full justify-between gap-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                        {paginatedExams.map((exam: any) => (
                            <div key={exam.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-6 hover:border-[#8376ff]/30 transition-all duration-300">
                                <h3 className="font-bold text-lg text-gray-800 tracking-tight line-clamp-2">{exam.title}</h3>
                                <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-gray-500">
                                    <div className="flex items-center gap-1.5">
                                        <Users className="w-4 h-4 text-gray-400" />
                                        <span>Duration: <span className="font-semibold text-gray-900">{exam.duration} Min</span></span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <FileText className="w-4 h-4 text-gray-400" />
                                        <span>Total Mark: <span className="font-semibold text-gray-900">{exam.questions.length * 1}</span></span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-orange-500">
                                        <Clock className="w-4 h-4" />
                                        <span>Negative Marking: <span className="font-semibold">0.25</span></span>
                                    </div>
                                </div>
                                <Link href={`/candidatedashboard/exam/${exam.id}`}>
                                    <button className="px-10 py-2.5 bg-[#8376ff] text-white font-bold text-sm rounded-lg hover:bg-[#6c61d5] self-start transition-colors shadow-sm">
                                        Start
                                    </button>
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="w-full border-t border-gray-100 pt-8 flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={() => {
                                    setCurrentPage(p => Math.max(1, p - 1));
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                disabled={currentPage === 1}
                                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-gray-600 disabled:opacity-30 bg-white shadow-sm transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <div className="w-8 h-8 flex items-center justify-center text-sm font-bold text-gray-900">
                                {currentPage}
                            </div>
                            <button 
                                onClick={() => {
                                    setCurrentPage(p => Math.min(totalPages, p + 1));
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                disabled={currentPage === totalPages}
                                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-gray-600 disabled:opacity-30 bg-white shadow-sm transition-colors"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500 font-medium tracking-wide">
                            <span>Online Test Per Page</span>
                            <div className="relative border border-gray-200 rounded-lg px-3 py-1.5 flex items-center justify-between w-14 bg-white shadow-sm font-semibold text-gray-700">
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
                                <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CandidateDashboard;
