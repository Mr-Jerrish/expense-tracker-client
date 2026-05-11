import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useTheme } from "../context/ThemeContext";

// const data = [
//   { month: "Apr", income: 90000, expense: 70000 },
//   { month: "May", income: 85000, expense: 68000 },
//   { month: "Jun", income: 100000, expense: 75000 },
//   { month: "Jul", income: 95000, expense: 72000 },
//   { month: "Aug", income: 105000, expense: 78000 },
//   { month: "Sep", income: 88000, expense: 69000 },
//   { month: "Oct", income: 110000, expense: 82000 },
//   { month: "Nov", income: 92000, expense: 71000 },
//   { month: "Dec", income: 108000, expense: 80000 },
//   { month: "Jan", income: 97000, expense: 74000 },
//   { month: "Feb", income: 89000, expense: 70000 },
//   { month: "Mar", income: 112000, expense: 83000 },
// ];

const CustomTooltip = ({ payload, label }) => {
  if (payload && payload.length) {
    // const income = payload[0]?.value || 0;
    // const expense = payload[1]?.value || 0;
    // const savings = income - expense;
    const income = payload.find((p) => p.dataKey === "income")?.value || 0;
    const expense = payload.find((p) => p.dataKey === "expense")?.value || 0;
    const savings = income - expense;

    const year = localStorage.getItem("financialYear");

    return (
      <div
        className="rounded-2xl p-2 shadow-xl 
       dark:bg-slate-900 bg-slate-100
        text-white min-w-[160px] border border-purple-700"
      >
        {/* Header */}
        <p className="text-sm font-semibold mb-1 text-gray-800 dark:text-gray-200">
          {label} {year}
        </p>

        {/* Income */}
        <div className="flex items-center justify-between mb-0">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
            <span className="text-xs text-gray-500 dark:text-gray-300">
              Income
            </span>
          </div>
          <span className="text-sm font-semibold text-green-400">
            ₹{income.toLocaleString()}
          </span>
        </div>

        {/* Expense */}
        <div className="flex items-center justify-between mb-0">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 bg-red-500 rounded-full"></span>
            <span className="text-xs text-gray-500 dark:text-gray-300">
              Expense
            </span>
          </div>
          <span className="text-sm font-semibold text-red-400">
            ₹{expense.toLocaleString()}
          </span>
        </div>

        {/* Savings */}
        <div className="flex items-center justify-between mt-2 border-t border-gray-300 dark:border-gray-700 pt-0">
          <span className="text-xs text-gray-500 dark:text-gray-300">
            Balance
          </span>
          <span className="text-sm font-semibold text-purple-400">
            ₹{savings.toLocaleString()}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

const FinanceChart = ({ data = [] }) => {
  const { theme } = useTheme();

  return (
    <div
      className="p-4 rounded-2xl 
      bg-white dark:bg-gray-900 
      shadow-md border border-gray-200 dark:border-gray-700"
    >
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
        Financial Overview
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barGap={10}>
          {/* Grid */}
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={theme === "dark" ? "#374151" : "#e5e7eb"}
          />

          {/* X Axis */}
          <XAxis
            dataKey="month"
            stroke={theme === "dark" ? "#9ca3af" : "#000000"}
          />

          {/* Y Axis */}
          <YAxis
            stroke={theme === "dark" ? "#9ca3af" : "#000000"}
            tickFormatter={(value) => `₹${value / 1000}k`}
          />

          {/* Tooltip */}
          <Tooltip content={<CustomTooltip />} />

          {/* Bars */}
          <Bar
            dataKey="income"
            radius={[10, 10, 0, 0]}
            fill="url(#incomeGradient)"
          />
          <Bar
            dataKey="expense"
            radius={[10, 10, 0, 0]}
            fill="url(#expenseGradient)"
          />

          {/* Gradient Definitions */}
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#16a34a" stopOpacity={0.6} />
            </linearGradient>

            <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#e11d48" stopOpacity={0.6} />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-4 text-sm">
        <div className="flex items-center  gap-2">
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
          <span className="text-gray-600 dark:text-gray-300">Income</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
          <span className="text-gray-600 dark:text-gray-300">Expense</span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(FinanceChart);
