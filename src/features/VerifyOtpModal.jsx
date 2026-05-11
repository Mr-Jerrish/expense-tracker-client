import React, { useRef, useState, useEffect } from "react";
import { ShieldCheck, X } from "lucide-react";
import toast from "react-hot-toast";
import api from "../api/api";

const VerifyOtpModal = ({ open, onClose, email, setOTP, openResetModal }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(180);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  useEffect(() => {
    if (!open) return;

    setTimer(180);

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [open]);

  if (!open) return null;

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // MOVE NEXT INPUT
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // SUBMIT
  const handleVerify = async () => {
    const finalOtp = otp.join("");

    if (finalOtp.length < 6) {
      return toast.error("Enter complete OTP");
    }

    if (timer <= 0) {
      return toast.error("OTP expired. Please resend OTP");
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/verify-otp", {
        email,
        otp: finalOtp,
      });
      toast.success(response.data.paramObjectsMap.message);
      setOTP(finalOtp);
      setOtp(["", "", "", "", "", ""]);
      onClose();
      openResetModal();
    } catch (error) {
      toast.error(error.response.data.paramObjectsMap.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setLoading(true);

      const response = await api.post("/auth/resend-otp", {
        email,
      });

      toast.success(response.data.paramObjectsMap.message);

      setTimer(180);

      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (error) {
      toast.error(error.response.data.paramObjectsMap.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-0">
      <div className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* TOP GRADIENT */}
        {/* <div className="h-2 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500" /> */}

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 transition hover:text-red-700"
        >
          <X size={20} />
        </button>

        <div className="p-2">
          {/* ICON */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg">
            <ShieldCheck size={30} />
          </div>

          {/* TITLE */}
          <h2 className="mt-1 text-center text-xl font-bold text-gray-800">
            Verify OTP
          </h2>

          <p className="mt-1 text-center text-sm text-gray-500">
            Enter the 6-digit code sent to your email
          </p>

          {/* OTP INPUTS */}
          <div className="mt-5 flex justify-center gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                ref={(el) => (inputRefs.current[index] = el)}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="h-10 w-10 rounded-2xl border-2 border-gray-200 bg-gray-50 text-center text-2xl font-bold text-gray-800 outline-none transition-all focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-200"
              />
            ))}
          </div>

          {/* RESEND */}
          {/* <p className="mt-2 text-center text-sm text-gray-500">
            Didn’t receive the OTP?{" "}
            <button className="font-semibold text-purple-600 hover:underline">
              Resend
            </button>
          </p> */}

          <div className="mt-3 text-center text-sm text-gray-500">
            {timer > 0 ? (
              <p>
                OTP expires in{" "}
                <span className="font-semibold text-red-500">
                  {minutes}:{seconds.toString().padStart(2, "0")}
                </span>
              </p>
            ) : (
              <button
                onClick={handleResendOtp}
                className="font-semibold text-purple-600 hover:underline"
              >
                Resend OTP
              </button>
            )}
          </div>

          {/* BUTTON */}
          <button
            onClick={handleVerify}
            disabled={loading}
            className="mt-3 w-full rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.02] hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtpModal;
