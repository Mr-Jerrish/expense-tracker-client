import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Menu,
  X,
  LayoutDashboard,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const MobileMenu = () => {
  const [open, setOpen] = useState(false);

  const navLinks = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    { name: "Income", path: "/income", icon: <TrendingUp size={18} /> },
    { name: "Expense", path: "/expense", icon: <TrendingDown size={18} /> },
  ];

  return (
    <>
      <div
        className="flex md:hidden items-center justify-center w-8 h-8 rounded-lg cursor-pointer transition-all duration-200 
       hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <button onClick={() => setOpen(true)}>
          <Menu className="w-4 h-4 text-gray-700 dark:text-gray-300" />
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#0f172a] z-50 
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-white font-semibold"> ExpenseTracker</h2>
          <X
            className="w-5 h-5 text-white cursor-pointer"
            onClick={() => setOpen(false)}
          />
        </div>

        {/* Links */}
        <div className="flex flex-col p-4 gap-3">
          {navLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all
                ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white"
                    : "text-gray-300 hover:bg-gray-800"
                }`
              }
            >
              {link.icon}
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default React.memo(MobileMenu);
