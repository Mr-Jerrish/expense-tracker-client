import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, TrendingUp, TrendingDown } from "lucide-react";

const NavLinks = () => {
  const navLinks = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={16} />,
    },
    {
      name: "Income",
      path: "/income",
      icon: <TrendingUp size={16} />,
    },
    {
      name: "Expense",
      path: "/expense",
      icon: <TrendingDown size={16} />,
    },
  ];

  return (
    <div className="hidden md:flex items-center gap-1">
      {navLinks.map((link, index) => (
        <NavLink
          key={index}
          to={link.path}
          className={({ isActive }) =>
            `flex items-center gap-1 px-1 py-0.5 rounded-lg text-sm font-normal transition-all duration-200
            ${
              isActive
                ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-md"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`
          }
        >
          {link.icon}
          {link.name}
        </NavLink>
      ))}
    </div>
  );
};

export default React.memo(NavLinks);
