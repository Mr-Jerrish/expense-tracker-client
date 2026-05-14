import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useTheme } from "../context/ThemeContext";

// const data = [
//   { month: "Apr", income: 95000 },
//   { month: "May", income: 88000 },
//   { month: "Jun", income: 102000 },
//   { month: "Jul", income: 98000 },
//   { month: "Aug", income: 105000 },
//   { month: "Sep", income: 91000 },
//   { month: "Oct", income: 112000 },
//   { month: "Nov", income: 96000 },
//   { month: "Dec", income: 108000 },
//   { month: "Jan", income: 101000 },
//   { month: "Feb", income: 94000 },
//   { month: "Mar", income: 115000 },
// ];

const CustomTooltip = ({ payload, label, type }) => {
  if (payload && payload.length) {
    return (
      <div className="rounded-lg p-3 shadow-lg bg-white dark:bg-gray-800 border dark:border-gray-700">
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
          {label}
        </p>
        {/* <p className="text-green-500 text-sm"> */}
        {/* Income: ₹{payload[0].value.toLocaleString()} */}
        {/* Income: ₹{payload[0].value.toLocaleString()} */}
        {/* </p> */}
        <p
          className={`text-sm ${
            type === "income" ? "text-green-500" : "text-red-500"
          }`}
        >
          {type === "income" ? "Income" : "Expense"}: ₹
          {payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

const IncomeTrendChart = ({ data = [], type = "income" }) => {
  const { theme } = useTheme();
  return (
    <div className="w-full  p-3 rounded-2xl bg-white dark:bg-[#0f172a] shadow hover:shadow-xl">
      {/* Title */}
      <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1.5">
        Income Trend (12 Months)
      </h2>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          {/* Grid */}
          stroke={theme === "dark" ? "#374151" : "#e5e7eb"}
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
          {/* X Axis */}
          <XAxis
            dataKey="month"
            stroke={theme === "dark" ? "#9ca3af" : "#000000"}
          />
          {/* Y Axis */}
          <YAxis stroke={theme === "dark" ? "#9ca3af" : "#000000"} />
          {/* Tooltip */}
          <Tooltip content={<CustomTooltip type={type} />} />
          {/* Line */}
          <Line
            type="monotone"
            dataKey={type}
            // stroke="#10b981"
            stroke={type === "income" ? "#10b981" : "#ef4444"}
            strokeWidth={3}
            dot={{ r: 4 }}
            // activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
export default IncomeTrendChart;
