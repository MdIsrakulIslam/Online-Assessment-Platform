/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Form, Input } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { toast } from "sonner";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { Key } from "lucide-react";

const ResetPassword = () => {
    const [form] = Form.useForm();
    const [resetPassword] = useResetPasswordMutation();

    const handleChangePassword = async (data: any) => {
        const toastId = toast.loading("Updating Password ...");
        console.log(data);
        try {
            const res = await resetPassword(data).unwrap();
            if (res?.success) {
                toast.success("Update Successfully.", { id: toastId });
                form.resetFields();
            } else {
                toast.error("Failed to update!", { id: toastId });
            }
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "An unexpected error occurred.";
            toast.error(errorMessage, { id: toastId });
        }
    };

    return (
        <div className="flex justify-center items-center py-10 lg:min-h-[calc(100vh-110px)] font-poppins">
            <div className="w-full max-w-lg p-10 bg-white rounded-xl shadow-lg ">
                <h2 className="text-2xl md:text-4xl font-semibold text-center mb-6">
                    Reset Password
                </h2>
                <Form
                    name="change-password"
                    initialValues={{ remember: true }}
                    onFinish={handleChangePassword}
                >
                    <Form.Item
                        name="oldPassword"
                        rules={[
                            { required: true, message: "Please input your old password!" },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="text-gray-400" />}
                            placeholder="Old Password"
                            className="rounded-md py-2.5"
                        />
                    </Form.Item>

                    <Form.Item
                        name="newPassword"
                        rules={[
                            { required: true, message: "Please input your new password!" },
                        ]}
                    >
                        <Input.Password
                            prefix={< Key size={15} className="text-gray-400" />}
                            placeholder="New Password"
                            className="rounded-md py-2.5"
                        />
                    </Form.Item>

                    <Form.Item>
                        <div className="flex items-center justify-center">
                            <button
                                type="submit"
                                className="bg-[#004D6E] text-white font-medium text-base py-3 px-5 rounded hover:bg-[#004D6E]/90 transition-colors"
                            >
                                Change Password
                            </button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default ResetPassword;
