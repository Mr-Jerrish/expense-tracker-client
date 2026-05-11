import React from "react";
import { Mail, X, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import api from "../api/api";

const ForgotPassword = ({ open, onClose, openOtpModal, setUserEmail }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  if (!open) return null;

  const onSubmit = async (data) => {
    try {
      const response = await api.post("/auth/forgot-password", data);
      toast.success(response.data.paramObjectsMap.message);
      setUserEmail(data.email);
      reset();
      onClose();
      openOtpModal();
    } catch (error) {
      toast.error(error.response.data.paramObjectsMap.message);
    }
  };
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-sm rounded-xl p-6 relative shadow-lg">
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-black"
        >
          <X size={18} />
        </button>

        {/* TITLE */}
        <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 bg-clip-text text-transparent">
          Reset your password
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
          <div>
            <label className="text-xs text-gray-600">Email Address</label>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-100 mt-1">
              <Mail className="w-4 h-4 text-gray-400" />
              <input
                type="email"
                placeholder="you@example.com"
                className="ml-2 w-full bg-transparent outline-none text-sm"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition"
          >
            Send Reset Link
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
