/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { ManageTestFormValues } from "./ManageTestForm";
import AddQuestionModal from "./AddQuestionModal";
import { CheckCircle2 } from "lucide-react";

const QuestionSetsTab = () => {
  const { control } = useFormContext<ManageTestFormValues>();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "questions",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleSaveQuestion = (question: any) => {
    if (editingIndex !== null) {
      update(editingIndex, question);
    } else {
      append(question);
    }
    setIsModalOpen(false);
    setEditingIndex(null);
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8 pt-4">
      {fields.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No questions added yet. Click &quot;Add Question&quot; to start.
        </div>
      ) : (
        <div className="space-y-6">
          {fields.map((field, index) => (
            <div key={field.id} className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm relative">
              <div className="absolute top-6 right-6 flex items-center gap-4 text-sm font-medium">
                <span className="text-gray-400 border-r pr-4">Marks: 1</span>
                <button type="button" onClick={() => remove(index)} className="text-red-500 hover:text-red-700">Remove From Exam</button>
                <button type="button" onClick={() => handleEdit(index)} className="text-blue-500 flex gap-1 items-center hover:text-blue-700">Edit</button>
              </div>
              <h4 className="font-bold text-gray-900 mb-4 pr-32">
                Question {index + 1}
              </h4>
              <p className="text-gray-800 font-semibold mb-4 whitespace-pre-wrap break-words">{field.title}</p>

              {field.type !== "text" && field.options && (
                <div className="space-y-3 pl-4">
                  {field.options.map((opt, oIndex) => (
                    <div key={oIndex} className="flex items-center gap-3">
                      <div className={`w-5 h-5 flex items-center justify-center border ${field.type === 'radio' ? 'rounded-full' : 'rounded'} ${opt.isCorrect ? 'border-green-500 bg-green-50' : 'border-gray-300'} shrink-0`}>
                        {opt.isCorrect && <div className={`bg-green-500 ${field.type === 'radio' ? 'w-2 h-2 rounded-full' : 'w-full h-full'}`}></div>}
                      </div>
                      <span className={`text-gray-700 break-words ${opt.isCorrect ? 'font-medium' : ''}`}>{String.fromCharCode(65 + oIndex)}. {opt.text}</span>
                      {opt.isCorrect && <CheckCircle2 className="w-5 h-5 text-green-500 ml-auto shrink-0" />}
                    </div>
                  ))}
                </div>
              )}

              {field.type === "text" && field.textAnswer && (
                <div className="mt-4 p-4 bg-gray-50 rounded italic text-gray-600 border border-gray-100 overflow-hidden">
                  <p className="text-xs font-bold text-gray-400 mb-1">Expected Answer Details:</p>
                  <div className="break-words whitespace-pre-wrap">{field.textAnswer}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => {
          setEditingIndex(null);
          setIsModalOpen(true);
        }}
        className="w-full py-4 border-2 border-dashed border-[#8376ff] text-[#8376ff] font-bold rounded-lg hover:bg-[#8376ff]/5 transition-colors"
      >
        + Add Question
      </button>

      <div className="flex justify-end pt-8">
        <button
          type="submit"
          className="px-8 py-3 bg-[#8376ff] text-white font-bold rounded-lg hover:bg-[#6c61d5] transition-colors"
        >
          Submit
        </button>
      </div>

      {isModalOpen && (
        <AddQuestionModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveQuestion}
          initialData={editingIndex !== null ? fields[editingIndex] : null}
        />
      )}
    </div>
  );
};

export default QuestionSetsTab;
