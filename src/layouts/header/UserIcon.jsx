import React, { useState, useRef, useEffect } from "react";
import { User, ChevronDown, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserIcon = () => {
  const menuRef = useRef(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    // localStorage.removeItem("user");
    // localStorage.removeItem("token");
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="relative" ref={menuRef}>
      <div
        className="flex items-center gap-1 cursor-pointer px-2 py-1 rounded-lg 
        hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
        onClick={() => setOpen((prev) => !prev)}
      >
        {/* Avatar */}
        <div
          className="flex items-center justify-center w-7 h-7 rounded-full 
          bg-gradient-to-br from-purple-600 to-blue-500"
        >
          <User className="w-4 h-4 text-white" />
        </div>

        <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-400" />
      </div>

      {open && (
        <div
          className="absolute right-0 mt-3 w-56
          rounded-xl
          bg-white dark:bg-slate-900/95
          border border-slate-200/60 dark:border-slate-700
          shadow-xl
          p-3 z-50"
        >
          <div className="pb-2 mb-2 border-b border-slate-200 dark:border-slate-700">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {user?.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {user?.email}
            </p>
          </div>

          {/* LOGOUT BUTTON 🔥 */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-1 rounded-lg
            text-sm font-medium
            text-red-600 hover:text-white
            hover:bg-red-500
            transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default React.memo(UserIcon);
