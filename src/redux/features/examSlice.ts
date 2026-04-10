import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Question {
  id: string;
  type: "checkbox" | "radio" | "text";
  title: string;
  options?: { text: string; isCorrect: boolean }[];
  textAnswer?: string;
}

export interface Exam {
  id: string;
  title: string;
  totalCandidates: string;
  totalSlots: string;
  questionSetsCount: string;
  questionType: string;
  startTime: string;
  endTime: string;
  duration: number; // in minutes
  questions: Question[];
}

export interface ExamState {
  exams: Exam[];
}

const initialState: ExamState = {
  exams: [],
};

const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    addExam: (state, action: PayloadAction<Exam>) => {
      state.exams.push(action.payload);
    },
    removeExam: (state, action: PayloadAction<string>) => {
      state.exams = state.exams.filter((exam) => exam.id !== action.payload);
    },
  },
});

export const { addExam, removeExam } = examSlice.actions;
export default examSlice.reducer;
