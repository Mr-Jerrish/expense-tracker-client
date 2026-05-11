import React, { useState } from "react";
import { Lock, Eye, EyeOff, ShieldCheck, MoveRight, X } from "lucide-react";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import api from "../api/api";

const ResetPassword = ({ open, onClose, email, otp }) => {
  const navigate = useNavigate();

  const [showPass, setShowPass] = useState(false);

  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,

    formState: { errors },
  } = useForm({
    mode: "onChange",

    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  if (!open) return null;

  const passwordValue = watch("password");

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const response = await api.put("/auth/reset-password", {
        email,
        otp,
        newPassword: data.password,
      });
      toast.success(response.data.paramObjectsMap.message);
      reset();
      onClose();
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.paramObjectsMap.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-0">
      <div className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl p-2">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 transition hover:text-red-700"
        >
          <X size={20} />
        </button>

        {/* ICON */}
        <div className="p-2">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg">
            <ShieldCheck size={30} />
          </div>

          {/* TITLE */}
          <h2 className="mt-2 text-center text-2xl font-bold text-gray-800">
            Reset Password
          </h2>

          <p className="mt-0 text-center text-sm text-gray-500">
            Enter your new password
          </p>

          <form className="mt-3 space-y-3" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="text-sm font-medium text-gray-600">
                New Password
              </label>

              <div className="mt-1 flex items-center rounded-2xl border bg-gray-50 px-4 py-1 focus-within:ring-2 focus-within:ring-purple-400">
                <Lock className="h-5 w-5 text-gray-400" />

                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Enter new password"
                  className="ml-3 w-full bg-transparent outline-none"
                  {...register("password", {
                    required: "Password is required",

                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />

                <button type="button" onClick={() => setShowPass(!showPass)}>
                  {showPass ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Confirm Password
              </label>

              <div className="mt-2 flex items-center rounded-2xl border bg-gray-50 px-4 py-1 focus-within:ring-2 focus-within:ring-purple-400">
                <Lock className="h-5 w-5 text-gray-400" />

                <input
                  type={showConfirmPass ? "text" : "password"}
                  placeholder="Confirm password"
                  className="ml-3 w-full bg-transparent outline-none"
                  {...register("confirmPassword", {
                    required: "Confirm password is required",

                    validate: (value) =>
                      value === passwordValue || "Passwords do not match",
                  })}
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                >
                  {showConfirmPass ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 py-2 font-semibold text-white shadow-lg transition hover:scale-[1.02] hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Updating..." : "Reset Password"}

              <MoveRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
