import React from "react";

const KpiCards = ({
  title,
  value,
  icon,
  bgColor,
  borderColor,
  badge,
  badgeColor,
  dotColor,
  bText,
}) => {
  return (
    <div
      className={`p-2 rounded-2xl border ${borderColor}
      bg-gradient-to-br ${bgColor}
      dark:from-gray-800 dark:to-gray-900
      shadow-sm hover:shadow-lg  hover:scale-105
      transition-all duration-700 `}
    >
      <div className="flex items-center justify-between mb-1">
        {/* Icon */}
        <div
          className="rounded-xl 
         text-gray-800 dark:text-white text-3xl hover:animate-bounce"
        >
          {icon}
        </div>
        <h3
          className="text-xs tracking-widest uppercase mb-1 
        text-gray-600 dark:text-gray-400"
        >
          {title}
        </h3>

        {/* <span
          className={`text-xs font-semibold px-2 py-1 rounded-full 
          ${badgeColor}
          dark:bg-white/10 dark:text-white`}
        >
          {badge}
        </span> */}
      </div>

      {/* Title */}
      {/* <h3
        className="text-xs tracking-widest uppercase mb-2 
        text-gray-600 dark:text-gray-400"
      >
        {title}
      </h3> */}

      {/* Value */}
      <p
        className="text-xl font-bold 
        text-gray-900 dark:text-white"
      >
        {value}
      </p>

      {/* Bottom */}
      <div
        className="flex items-center justify-between mt-2 text-xs 
        text-gray-500 dark:text-gray-400"
      >
        <span>{bText}</span>
        <span className={`w-2 h-2 rounded-full ${dotColor}`}></span>
      </div>
    </div>
  );
};

export default KpiCards;
