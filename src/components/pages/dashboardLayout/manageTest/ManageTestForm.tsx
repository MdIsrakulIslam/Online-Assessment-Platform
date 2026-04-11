"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
// import BasicInfoTab from "./BasicInfoTab";
// import QuestionSetsTab from "./QuestionSetsTab";
import { addExam } from "@/redux/features/examSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
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
          }),
        )
        .optional(),
      textAnswer: z.string().optional(),
    }),
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
      }),
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
        <div className="flex items-center gap-4 mb-8 text-sm md:text-base">
          <button
            onClick={() => setActiveTab("basic")}
            className={`flex items-center gap-3 ${
              activeTab === "basic"
                ? "text-[#6633FF] font-bold"
                : "text-gray-500 font-medium"
            }`}
          >
            <span
              className={`w-7 h-7 flex items-center justify-center rounded-full text-sm font-semibold text-white ${
                activeTab === "basic" ? "bg-[#6633FF]" : "bg-[#DFE1E6]"
              }`}
            >
              1
            </span>
            Basic Info
          </button>

          <div className="w-16 h-px bg-gray-400 font-bold mx-2"></div>

          <button
            onClick={() => {
              if (isBasicInfoSaved) setActiveTab("questions");
            }}
            disabled={!isBasicInfoSaved}
            className={`flex items-center gap-3 ${
              activeTab === "questions"
                ? "text-[#6633FF] font-bold"
                : "text-gray-500 font-medium disabled:opacity-60"
            }`}
          >
            <span
              className={`w-7 h-7 flex items-center justify-center rounded-full text-sm font-semibold text-white ${
                activeTab === "questions" ? "bg-[#6633FF]" : "bg-[#DFE1E6]"
              }`}
            >
              2
            </span>
            Questions
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
