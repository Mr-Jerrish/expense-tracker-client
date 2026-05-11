import React, { useState } from "react";
import {
  Sparkles,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  MoveRight,
  Check,
} from "lucide-react";
import image1 from "../assets/images/image1.jpeg";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import api from "../api/api.js";
import { useNavigate, Link } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      const response = await api.post("/auth/register", data);
      toast.success(response.data.paramObjectsMap.message);
      reset();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* LEFT SIDE */}
      <div className="flex items-center justify-center px-6 bg-gray-50">
        <div className="w-full max-w-md">
          {/* HEADER */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
              <Sparkles className="text-white w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 bg-clip-text text-transparent">
                Create your account
              </h1>
              <p className="text-gray-500 text-sm">
                Start tracking expenses smarter, together
              </p>
            </div>
          </div>

          {/* FORM */}
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* NAME */}
            <div>
              <label className="text-xs text-gray-600">Name</label>
              <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-100 mt-1 focus-within:ring-2 focus-within:ring-slate-500">
                <User className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="ml-2 w-full bg-transparent outline-none text-sm"
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 3,
                      message: "Name must be at least 3 characters",
                    },
                    pattern: {
                      value: /^[A-Za-z ]+$/,
                      message: "Only letters and spaces are allowed",
                    },
                  })}
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-xs text-gray-600">Email Address</label>
              <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-100 mt-1 focus-within:ring-2 focus-within:ring-slate-500">
                <Mail className="w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
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
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-xs text-gray-600">Password</label>
              <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-100 mt-1 focus-within:ring-2 focus-within:ring-slate-500">
                <Lock className="w-4 h-4 text-gray-400" />
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Create a strong password"
                  className="ml-2 w-full bg-transparent outline-none text-sm"
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
                    <EyeOff className="w-4 h-4 text-gray-400" />
                  ) : (
                    <Eye className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="text-xs text-gray-600">Confirm Password</label>
              <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-100 mt-1 focus-within:ring-2 focus-within:ring-slate-500">
                <Lock className="w-4 h-4 text-gray-400" />
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Re-enter your password"
                  className="ml-2 w-full bg-transparent outline-none text-sm"
                  {...register("confirmPassword", {
                    validate: (value) => {
                      if (value !== password) {
                        return "Password is not match";
                      }
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? (
                    <EyeOff className="w-4 h-4 text-gray-400" />
                  ) : (
                    <Eye className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* TERMS */}
            <div className="flex items-start gap-2 text-xs text-gray-500">
              <input type="checkbox" className="mt-1" />
              <p>
                I agree to the{" "}
                <span className="text-purple-600 cursor-pointer">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-purple-600 cursor-pointer">
                  Privacy Policy
                </span>
              </p>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition"
            >
              Create Account
              <MoveRight className="w-4 h-4" />
            </button>
          </form>

          {/* LOGIN */}
          <p className="text-center text-xs text-gray-500 mt-5">
            Already have an account?{" "}
            {/* <span className="text-purple-600 cursor-pointer">Sign in</span> */}
            <Link to="/login" className="text-purple-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden md:flex relative flex-col justify-center px-12 text-white overflow-hidden">
        <img
          src={image1}
          alt="bg"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 to-blue-900/90" />

        {/* CONTENT */}
        <div className="relative z-10">
          <h1 className="text-4xl font-bold leading-tight">
            Expense tracking <br />
            made{" "}
            <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
              effortless
            </span>
          </h1>

          <p className="mt-4 text-sm text-purple-200 max-w-md">
            Join thousands of teams managing their finances smarter with
            collaborative expense tracking.
          </p>

          {/* FEATURES */}
          <div className="mt-6 space-y-3">
            {[
              "Track expenses across multiple users",
              "Real-time collaboration",
              "Smart categorization with AI",
              "Custom reports & analytics",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="bg-purple-500/30 p-1 rounded-full">
                  <Check className="w-3 h-3" />
                </div>
                <p className="text-sm">{item}</p>
              </div>
            ))}
          </div>

          {/* STATS */}
          <div className="flex gap-10 mt-10 border-t border-purple-500 pt-6">
            <div>
              <h2 className="text-xl font-bold">10K+</h2>
              <p className="text-xs text-purple-300">Active Users</p>
            </div>
            <div>
              <h2 className="text-xl font-bold">99.9%</h2>
              <p className="text-xs text-purple-300">Uptime</p>
            </div>
            <div>
              <h2 className="text-xl font-bold">$2M+</h2>
              <p className="text-xs text-purple-300">Tracked</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
