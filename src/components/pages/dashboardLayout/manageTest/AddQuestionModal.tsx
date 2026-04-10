import React, { useState } from "react";
import { X, Trash2, Plus } from "lucide-react";

interface Option {
  text: string;
  isCorrect: boolean;
}

interface QuestionData {
  id: string;
  type: "checkbox" | "radio" | "text";
  title: string;
  options?: Option[];
  textAnswer?: string;
}

interface AddQuestionModalProps {
  onClose: () => void;
  onSave: (data: QuestionData) => void;
  initialData?: QuestionData | null;
}

const AddQuestionModal = ({ onClose, onSave, initialData }: AddQuestionModalProps) => {
  const [type, setType] = useState<"checkbox" | "radio" | "text">(
    initialData?.type || "radio"
  );
  const [title, setTitle] = useState(initialData?.title || "");
  const [options, setOptions] = useState<Option[]>(
    initialData?.options || [{ text: "", isCorrect: false }, { text: "", isCorrect: false }]
  );
  const [textAnswer, setTextAnswer] = useState(initialData?.textAnswer || "");

  const handleAddOption = () => {
    setOptions([...options, { text: "", isCorrect: false }]);
  };

  const handleRemoveOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const handleOptionTextChange = (index: number, val: string) => {
    const newOptions = [...options];
    newOptions[index].text = val;
    setOptions(newOptions);
  };

  const handleCorrectChange = (index: number) => {
    const newOptions = [...options];
    if (type === "radio") {
      newOptions.forEach((opt, i) => {
        opt.isCorrect = i === index;
      });
    } else {
      newOptions[index].isCorrect = !newOptions[index].isCorrect;
    }
    setOptions(newOptions);
  };

  const handleSave = () => {
    if (!title.trim()) return alert("Question title is required");
    
    if (type !== "text") {
      if (options.some((opt) => !opt.text.trim())) {
        return alert("All options must have text");
      }
      if (!options.some((opt) => opt.isCorrect)) {
        return alert("At least one option must be marked as correct");
      }
    }

    onSave({
      id: initialData?.id || Math.random().toString(36).substr(2, 9),
      type,
      title,
      options: type !== "text" ? options : undefined,
      textAnswer: type === "text" ? textAnswer : undefined,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 flex-shrink-0">
          <h2 className="text-xl font-bold text-gray-900">
            {initialData ? "Edit Question" : "uestion"}
          </h2>
          <div className="flex items-center gap-4">
               <select
                value={type}
                onChange={(e) => setType(e.target.value as "checkbox" | "radio" | "text")}
                className="border border-gray-200 rounded-md px-3 py-1.5 text-sm outline-none"
              >
                <option value="radio">Radio</option>
                <option value="checkbox">Checkbox</option>
                <option value="text">Text / Open Ended</option>
              </select>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          <div>
             <input 
                type="text" 
                placeholder="Write your question here..." 
                className="w-full border-b border-gray-200 pb-2 text-lg font-medium text-gray-900 focus:outline-none focus:border-[#8376ff]"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
             />
          </div>

          {type !== "text" && (
            <div className="space-y-4">
              {options.map((opt, index) => (
                <div key={index} className="flex items-center gap-3">
                   {type === 'radio' ? (
                       <input 
                         type="radio" 
                         name="correct-option" 
                         checked={opt.isCorrect} 
                         onChange={() => handleCorrectChange(index)}
                         className="w-5 h-5 accent-[#8376ff]"
                       />
                   ) : (
                        <input 
                         type="checkbox" 
                         checked={opt.isCorrect} 
                         onChange={() => handleCorrectChange(index)}
                         className="w-5 h-5 accent-[#8376ff]"
                       />
                   )}
                   <div className="flex-1 flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-1 focus-within:ring-[#8376ff] focus-within:border-[#8376ff]">
                       <span className="text-gray-400 font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
                       <input 
                         type="text" 
                         className="flex-1 bg-transparent border-none outline-none text-gray-800"
                         value={opt.text}
                         placeholder="Option Text..."
                         onChange={(e) => handleOptionTextChange(index, e.target.value)}
                       />
                   </div>
                   <button 
                     type="button"
                     onClick={() => handleRemoveOption(index)} 
                     className="text-gray-400 hover:text-red-500 disabled:opacity-30 disabled:hover:text-gray-400 p-2"
                     disabled={options.length <= 2}
                   >
                     <Trash2 className="w-5 h-5" />
                   </button>
                </div>
              ))}
              
              <button 
                type="button" 
                onClick={handleAddOption}
                className="flex items-center gap-2 text-sm font-bold text-[#8376ff] hover:text-[#6c61d5]"
              >
                 <Plus className="w-4 h-4" /> Add Option
              </button>
            </div>
          )}

          {type === "text" && (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Expected Answer/Rubric (Optional)</label>
              <textarea
                rows={4}
                value={textAnswer}
                onChange={(e) => setTextAnswer(e.target.value)}
                className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:ring-1 focus:ring-[#8376ff]"
                placeholder="What details are expected in the answer..."
              ></textarea>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-100 flex justify-between items-center bg-gray-50 flex-shrink-0">
          <button
            onClick={onClose}
            className="text-gray-500 font-bold px-4 py-2 hover:text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 bg-[#8376ff] text-white font-bold rounded-lg hover:bg-[#6c61d5] transition-colors"
          >
            {initialData ? "Save Changes" : "Save Question"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddQuestionModal;
