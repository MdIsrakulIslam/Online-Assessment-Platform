"use client";
import React from "react";
import { useFormContext } from "react-hook-form";
import { ManageTestFormValues } from "./ManageTestForm";
import MyFormInput from "@/components/ui/MyForm/MyFormInput/MyFormInput";
import MyFormSelect from "@/components/ui/MyForm/MyFormSelect/MyFormSelect";
import { Edit } from "lucide-react";

const slotOptions = Array.from({ length: 20 }, (_, i) => ({
  label: String(i + 1),
  value: String(i + 1),
}));

const questionTypeOptions = [
  { label: "MCQ", value: "MCQ" },
  { label: "Written", value: "Written" },
  { label: "Mixed", value: "Mixed" },
];

interface BasicInfoTabProps {
  isSaved: boolean;
  onEdit: () => void;
  onSave: () => void;
}

const BasicInfoTab = ({ isSaved, onEdit, onSave }: BasicInfoTabProps) => {
  const { getValues } = useFormContext<ManageTestFormValues>();

  if (isSaved) {
    const values = getValues();
    return (
      <div className="bg-gray-50/50 p-8 rounded-xl border border-gray-100 relative">
        <button
          type="button"
          onClick={onEdit}
          className="absolute top-6 right-6 text-[#8376ff] hover:text-[#6c61d5] flex items-center gap-2 font-medium"
        >
          <Edit className="w-4 h-4" /> Edit
        </button>

        <h3 className="text-lg font-bold text-gray-900 mb-6">Basic Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-sm text-gray-500 mb-1">Course Type/Name</p>
            <p className="font-semibold text-gray-900">{values.title}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Total Candidates</p>
            <p className="font-semibold text-gray-900">{values.totalCandidates}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Total Slots</p>
            <p className="font-semibold text-gray-900">{values.totalSlots}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Total Question Set</p>
            <p className="font-semibold text-gray-900">{values.questionSetsCount}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Question Type</p>
            <p className="font-semibold text-gray-900">{values.questionType}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Start Time</p>
            <p className="font-semibold text-gray-900">{values.startTime}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">End Time</p>
            <p className="font-semibold text-gray-900">{values.endTime}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Duration (Min)</p>
            <p className="font-semibold text-gray-900">{values.duration}</p>
          </div>
        </div>

        <div className="mt-8 flex justify-end pb-4 pt-16">
          {/* In this case, save & continue is already clicked since it's saved. But user can just use the tabs to navigate. */}
          <button
            type="button"
            className="px-6 py-2.5 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors hidden"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  // Edit Mode
  return (
    <div className="space-y-6 max-w-4xl pt-4">
      <h3 className="text-lg font-bold text-gray-900">Basic Information</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        <div className="md:col-span-2">
          <MyFormInput name="title" label="Course Type/Name *" placeHolder="Enter course name" />
        </div>
        <MyFormInput name="totalCandidates" label="Total Candidates *" placeHolder="Ex: 10000" type="string" />
        <MyFormSelect name="totalSlots" label="Total Slots *" placeHolder="Select Slots" options={slotOptions} />
        <MyFormSelect name="questionSetsCount" label="Total Question Set *" placeHolder="Select Questions" options={slotOptions} />
        <MyFormSelect name="questionType" label="Question Type *" placeHolder="Select Type" options={questionTypeOptions} />
        <MyFormInput name="startTime" label="Start Time *" placeHolder="Ex: 10:00 AM" type="time" />
        <MyFormInput name="endTime" label="End Time *" placeHolder="Ex: 11:30 AM" type="time" />
        <MyFormInput name="duration" label="Duration (Min) *" placeHolder="Ex: 90" type="string" />
      </div>

      <div className="flex justify-between items-center pt-6">
        <button
          type="button"
          className="text-gray-500 font-bold hover:text-gray-700 px-4 py-2"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onSave}
          className="px-6 py-3 bg-[#8376ff] text-white font-bold rounded-lg hover:bg-[#6c61d5] transition-colors"
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
};

export default BasicInfoTab;
