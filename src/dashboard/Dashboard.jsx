import React, { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Wallet, PiggyBank } from "lucide-react";
import KpiCards from "../utils/KpiCards";
import FinanceChart from "./FinanceChart";
import { useTheme } from "../context/ThemeContext";
import api from "../api/api";

const Dashboard = () => {
  const { financialYear } = useTheme();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;
  const [data, setData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  const getTotalYear = async () => {
    const res = await api.get("/dashboard/totalyear", {
      params: { userId, financialYear },
    });
    setData(res.data.paramObjectsMap.totalYear);
  };

  const getTotalMonth = async () => {
    const res = await api.get("/dashboard/totalmonth", {
      params: { userId, financialYear },
    });
    setMonthlyData(res.data.paramObjectsMap.totalMonths);
  };

  useEffect(() => {
    getTotalYear();
    getTotalMonth();
  }, [financialYear]);

  const MData = monthlyData?.map((item) => ({
    month: item.month,
    income: item.income,
    expense: item.expense,
    balance: item.balance,
  }));

  return (
    <>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Income */}
          <KpiCards
            title="Total Income"
            value={`₹${(data?.totalIncome ?? 0).toLocaleString("en-IN")}`}
            icon="💰"
            bgColor="from-green-100 to-green-50 dark:from-green-900/20 dark:to-green-800/10"
            borderColor="border-green-200 dark:border-green-800"
            // badge="+12.5%"
            // badgeColor="bg-green-200 text-green-700"
            dotColor="bg-green-500"
            bText={`${financialYear} Year`}
          />

          {/* Expense */}
          <KpiCards
            title="Total Expense"
            value={`₹${(data.totalExpense ?? 0).toLocaleString("en-IN")}`}
            icon="💸"
            bgColor="from-red-100 to-red-50 dark:from-red-900/20 dark:to-red-800/10"
            borderColor="border-red-200 dark:border-red-800"
            // badge="-8.2%"
            // badgeColor="bg-red-200 text-red-700"
            dotColor="bg-red-500"
            bText={`${financialYear} Year`}
          />

          {/* Balance */}
          <KpiCards
            title="Balance"
            value={`₹${(data.balance ?? 0).toLocaleString("en-IN")}`}
            icon="📊"
            bgColor="from-purple-100 to-purple-50 dark:from-purple-900/20 dark:to-purple-800/10"
            borderColor="border-purple-200 dark:border-purple-800"
            // badge="+18.7%"
            // badgeColor="bg-purple-200 text-purple-700"
            dotColor="bg-purple-500"
            bText={`${financialYear} Year`}
          />

          {/* Savings */}
          {/* <KpiCards
            title="This Month Savings"
            value="₹8,000"
            icon="📅"
            bgColor="from-blue-100 to-blue-50 dark:from-blue-900/20 dark:to-blue-800/10"
            borderColor="border-blue-200  dark:border-blue-800"
            // badge="+24.3%"
            // badgeColor="bg-blue-200 text-blue-700"
            dotColor="bg-blue-500"
            bText={`Month Savings`}
          /> */}
        </div>
        <div className="w-full">
          <FinanceChart data={MData} />
        </div>
      </div>
    </>
  );
};

export default React.memo(Dashboard);
