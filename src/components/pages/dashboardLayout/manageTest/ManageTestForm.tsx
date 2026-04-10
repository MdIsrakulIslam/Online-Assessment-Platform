"use client";
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
// import BasicInfoTab from "./BasicInfoTab";
// import QuestionSetsTab from "./QuestionSetsTab";
import { useAppDispatch } from "@/redux/hooks";
import { addExam } from "@/redux/features/examSlice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ChevronRight } from "lucide-react";
import BasicInfoTab from "./BasicInfoTab";
import QuestionSetsTab from "./QuestionSetsTab";

const manageTestSchema = z.object({
  title: z.string().min(1, "Title is required"),
  totalCandidates: z.string().min(1, "Required"),
  totalSlots: z.string().min(1, "Required"),
  questionSetsCount: z.string().min(1, "Required"),
  questionType: z.string().min(1, "Required"),
  startTime: z.string().min(1, "Required"),
  endTime: z.string().min(1, "Required"),
  duration: z.coerce.number().min(1, "Required"),
  questions: z.array(
    z.object({
      id: z.string(),
      type: z.enum(["checkbox", "radio", "text"]),
      title: z.string(),
      options: z
        .array(
          z.object({
            text: z.string(),
            isCorrect: z.boolean(),
          })
        )
        .optional(),
      textAnswer: z.string().optional(),
    })
  ),
});

export type ManageTestFormValues = z.infer<typeof manageTestSchema>;

const ManageTestForm = () => {
  const [activeTab, setActiveTab] = useState<"basic" | "questions">("basic");
  const [isBasicInfoSaved, setIsBasicInfoSaved] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const methods = useForm<ManageTestFormValues>({
    resolver: zodResolver(manageTestSchema),
    defaultValues: {
      questions: [],
    },
    mode: "onChange",
  });

  const onSubmit = (data: ManageTestFormValues) => {
    // This is final save when submitting the whole test
    dispatch(
      addExam({
        id: Math.random().toString(36).substr(2, 9),
        ...data,
      })
    );
    toast.success("Exam Created Successfully!");
    router.push("/dashboard");
  };

  const handleSaveBasicInfo = async () => {
    const isValid = await methods.trigger([
      "title",
      "totalCandidates",
      "totalSlots",
      "questionSetsCount",
      "questionType",
      "startTime",
      "endTime",
      "duration",
    ]);

    if (isValid) {
      setIsBasicInfoSaved(true);
      setActiveTab("questions");
    } else {
      toast.error("Please fill all required basic info fields.");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">
          Manage Online Test
        </h2>
        <Link href="/dashboard">
          <button className="text-sm font-medium text-[#8376ff] hover:text-[#6c61d5]">
            Back to Dashboard
          </button>
        </Link>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-8 text-sm">
          <button
            onClick={() => setActiveTab("basic")}
            className={`flex items-center gap-2 ${activeTab === "basic" ? "text-[#8376ff] font-bold" : "text-gray-500 font-medium"
              }`}
          >
            <span
              className={`w-5 h-5 flex items-center justify-center rounded-full text-xs text-white ${activeTab === "basic" ? "bg-[#8376ff]" : "bg-gray-300"
                }`}
            >
              1
            </span>
            Basic Info
          </button>

          <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />

          <button
            onClick={() => {
              if (isBasicInfoSaved) setActiveTab("questions");
            }}
            disabled={!isBasicInfoSaved}
            className={`flex items-center gap-2 ${activeTab === "questions"
              ? "text-[#8376ff] font-bold"
              : "text-gray-500 font-medium disabled:opacity-50"
              }`}
          >
            <span
              className={`w-5 h-5 flex items-center justify-center rounded-full text-xs text-white ${activeTab === "questions" ? "bg-[#8376ff]" : "bg-gray-300"
                }`}
            >
              2
            </span>
            Question Sets
          </button>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            {activeTab === "basic" && (
              <BasicInfoTab
                isSaved={isBasicInfoSaved}
                onEdit={() => setIsBasicInfoSaved(false)}
                onSave={handleSaveBasicInfo}
              />
            )}
            {activeTab === "questions" && <QuestionSetsTab />}
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default ManageTestForm;
