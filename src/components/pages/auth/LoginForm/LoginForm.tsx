/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import MyFormInput from "@/components/ui/MyForm/MyFormInput/MyFormInput";
import MyFormWrapper from "@/components/ui/MyForm/MyFormWrapper/MyFormWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

const validationSchema = z.object({
  email: z
    .string({
      required_error: "User ID / Email is required",
    })
    .email("Invalid email address"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, "Password must be at least 8 characters long"),
});

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: any) => {
    setLoading(true);
    // const result = await signIn("credentials", {
    //   // redirect: false,
    //   email: formData.email,
    //   password: formData.password,
    // });

    // if (result?.error) {
    //   toast.error("Invalid credentials. Try employer@gmail.com / 12345678");
    //   setLoading(false);
    // } else {
    //   toast.success("Login successful!");
    //   // router.push("/dashboard");
    //   if (formData.email === "employer@gmail.com") {
    //     router.push("/dashboard");
    //   } else {
    //     router.push("/candidate/dashboard");
    //   }
    //   router.refresh();
    // }

    (formData.email === "employer@gmail.com") && router.push("/dashboard");
    (formData.email === "candidate@gmail.com") && router.push("/candidate/dashboard");
    // ruter.refresh();
  };

  return (
    <div className="flex items-center justify-center h-full w-full py-20">
      <div className="w-full max-w-xl p-10 bg-white rounded-xl shadow-md border border-gray-100">
        <div className="text-center space-y-2 mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Sign In
          </h1>
        </div>

        <MyFormWrapper
          onSubmit={handleSubmit}
          resolver={zodResolver(validationSchema)}
          className="flex flex-col gap-6"
        >
          <div className="w-full">
            <MyFormInput
              name={"email"}
              label="User ID"
              placeHolder="example@gmail.com"
            />
          </div>
          <div className="w-full">
            <MyFormInput
              name={"password"}
              label="Password"
              placeHolder="Enter your password"
              type="password"
            />
            <div className="text-right mt-2">
              <span className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer">
                Forgot Password?
              </span>
            </div>
          </div>

          <button
            className="w-full mt-4 px-4 py-3 bg-[#6355ff] text-white rounded-lg font-semibold hover:bg-[#4f42e5] transition-colors focus:ring-4 focus:ring-blue-200 flex justify-center items-center"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </MyFormWrapper>
      </div>
    </div>
  );
}
