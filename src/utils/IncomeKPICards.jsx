import React from "react";

const IncomeKPICards = ({
  icon,
  bgColor,
  borderColor,
  title,
  year,
  value,
  iconBg,
  textColor,
  titleTextColor,
  textLastColor,
}) => {
  return (
    <>
      <div
        className={`p-1.5 rounded-2xl border ${borderColor} bg-gradient-to-br ${bgColor} shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-700`}
      >
        <div className="flex items-center justify-between mb-1">
          <div className={`p-1  ${iconBg} rounded-xl`}>{icon}</div>
          <div className={`text-sm font-medium ${titleTextColor}`}>{title}</div>
        </div>
        <p
          className={`text-xl font-bold 
       ${textColor}`}
        >
          {value}
        </p>
        <p className={`text-xs ${textLastColor} mt-2 font-bold`}>{year}</p>
      </div>
    </>
  );
};

export default IncomeKPICards;
