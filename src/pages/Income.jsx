import React, { useEffect, useState } from "react";
import CommonListview from "../components/CommonListview";
import KpiCards from "../utils/KpiCards";
import {
  DollarSign,
  Calendar,
  TrendingUp,
  Layers,
  X,
  PiggyBank,
  LayoutGrid,
} from "lucide-react";
import IncomeKPICards from "../utils/IncomeKPICards";
import { useTheme } from "../context/ThemeContext";
import IncomeTrendChart from "../utils/IncomeTrendChart";
import { useForm } from "react-hook-form";
import CategoryCard from "../utils/CategoryCard ";
import api from "../api/api";
import Loading from "../components/Loading";
import { toast } from "react-hot-toast";
import useExcelExport from "../components/useExcelExport";

const Income = () => {
  const handleExportExcel = useExcelExport();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      incomeSource: "",
      category: "Salary",
      amount: 0,
      date: "",
      description: "",
      paymentMethod: "Cash",
      account: "SBI",
      transactionId: "",
    },
  });
  const paymentMethod = watch("paymentMethod");
  const { financialYear } = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;
  const [allData, setAllData] = useState([]);
  const [dataLength, setDataLength] = useState(0);
  const [editById, setEditById] = useState(null);
  const [summaryData, setSummaryData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const incomeCategories = [
    "Salary",
    "Freelance",
    "Business Income",
    "Part-time Job",
    "Internship Stipend",
    "Pocket Money",
    "Allowance",
    "Gift",
    "Bonus",
    "Commission",
    "Investment Return",
    "Interest",
    "Rental Income",
    "Refund",
    "Scholarship",
    "Prize / Reward",
    "Other",
  ];
  const paymentMethods = [
    "Cash",
    "Bank Transfer",
    "UPI",
    "Debit Card",
    "Credit Card",
    "Net Banking",
    "Cheque",
    "Wallet",
    "Other",
  ];

  const accountLabels = ["SBI", "HDFC", "ICICI", "Canara", "Other"];

  const data = summaryData?.categoryIncome?.map((item) => ({
    name: item._id,
    amount: item.total,
  }));

  const MData = monthlyData?.map((item) => ({
    month: item.month,
    income: item.total,
  }));

  const columns = [
    { label: "Income Source", key: "incomeSource", searchable: true },
    { label: "Category", key: "category", searchable: true },
    { label: "Amount", key: "amount", searchable: true },
    { label: "Date", key: "date", type: "date" },
    { label: "Payment Method", key: "paymentMethod", searchable: true },
    { label: "Action", key: "action" },
  ];

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const payload = {
        ...data,
        ...(editById ? { id: editById } : {}),
      };
      const res = await api.put(
        `/income/createincome?userId=${userId}&financialYear=${financialYear}`,
        payload,
      );
      toast.success(res.data.paramObjectsMap.message);
      reset({
        incomeSource: "",
        category: "Salary",
        amount: 0,
        date: "",
        description: "",
        paymentMethod: "Cash",
        account: "SBI",
        transactionId: "",
      });
      setOpenDialog(false);
      setEditById(null);
      getAll();
      getsummary();
    } catch (error) {
      toast.error(err?.response?.data?.paramObjectsMap?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEditById = async (id) => {
    setEditById(id);
    setOpenDialog(true);
    const response = await api.get(`/income/getById/${id}?userId=${userId}`);
    const data = response.data.paramObjectsMap.income;
    reset({
      id: data._id,
      incomeSource: data.incomeSource,
      category: data.category,
      amount: data.amount,
      date: data.date.split("T")[0],
      description: data.description,
      paymentMethod: data.paymentMethod,
      account: data.account,
      transactionId: data.transactionId,
    });
  };

  const getAll = async () => {
    try {
      const res = await api.get(
        `/income/getallincome?userId=${userId}&financialYear=${financialYear}`,
      );
      setAllData(res.data.paramObjectsMap.income);
      setDataLength(res.data.paramObjectsMap.income.length);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (financialYear && userId) {
      getAll();
      getsummary();
      getMonthlyIncome();
    }
  }, []);

  const handleExport = () => {
    const exportColumns = columns.filter((col) => col.key !== "action");

    handleExportExcel(allData, exportColumns, "Income");
  };

  const getsummary = async () => {
    const res = await api.get("/income/summary", {
      params: { userId, financialYear },
    });
    setSummaryData(res.data.paramObjectsMap.income);
  };

  const getMonthlyIncome = async () => {
    try {
      const res = await api.get("/income/monthlyIncome", {
        params: { userId, financialYear },
      });

      setMonthlyData(res?.data?.paramObjectsMap?.income || []);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="space-y-3">
        {/* card */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <IncomeKPICards
            title="Total Income"
            titleTextColor="text-emerald-100"
            borderColor="border-green-200 dark:border-green-800"
            bgColor="from-emerald-500 to-green-600"
            icon={<DollarSign className="text-white" />}
            iconBg="bg-white/20"
            value={`₹ ${summaryData.yearIncome}`}
            textColor="text-white"
            textLastColor="text-emerald-100"
            year={`${financialYear} Year`}
          />
          {/*  */}
          <IncomeKPICards
            title="Current Income"
            titleTextColor="text-gray-600 dark:text-gray-400"
            borderColor="border-emerald-200 dark:border-emerald-800"
            bgColor="bg-white dark:bg-gray-900"
            icon={
              <Calendar className="text-emerald-600 dark:text-emerald-400 font-xs" />
            }
            iconBg="bg-emerald-100 dark:bg-emerald-950"
            value={`₹ ${summaryData.monthIncome}`}
            textColor="text-gray-900 dark:text-white"
            textLastColor="text-emerald-600 dark:text-emerald-400"
            year="This Month"
          />
          {/*  */}
          <IncomeKPICards
            title="Today Income"
            titleTextColor="text-gray-600 dark:text-gray-400"
            borderColor="border-blue-200 dark:border-blue-800"
            bgColor="bg-white dark:bg-gray-900"
            icon={
              <TrendingUp className="text-blue-600 dark:text-blue-400 font-xs" />
            }
            iconBg="bg-blue-100 dark:bg-blue-950"
            value={`₹ ${summaryData.todayIncome}`}
            textColor="text-gray-900 dark:text-white"
            textLastColor="text-gray-500 dark:text-gray-500"
            year="Today"
          />
          <IncomeKPICards
            title="Income Source"
            titleTextColor="text-gray-600 dark:text-gray-400"
            borderColor="border-purple-200 dark:border-purple-800"
            bgColor="bg-white dark:bg-gray-900"
            icon={
              <LayoutGrid className="text-purple-600 dark:text-purple-400 font-xs" />
            }
            iconBg="bg-purple-100 dark:bg-purple-950"
            value={summaryData.totalCategories}
            textColor="text-gray-900 dark:text-white"
            textLastColor="text-gray-500 dark:text-gray-500"
            year="Active Revenue Streams"
          />
        </div>
        {/*barchart  */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-3">
            <IncomeTrendChart data={MData} type="income" />
          </div>

          <div className="md:col-span-1">
            <CategoryCard data={data} type="income" />
          </div>
        </div>
        {/*commonListView  */}
        <div className="border border-gray-200 dark:border-gray-800 rounded-xl bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-800 dark:via-slate-900 dark:to-black hover:shadow-lg transition-all duration-700 px-2 py-2">
          <CommonListview
            title="Income"
            length={dataLength}
            addNew="Add Income"
            // handleNew={() => setOpenDialog(true)}
            handleNew={() => {
              setEditById(null);
              reset();
              setOpenDialog(true);
            }}
            columns={columns}
            data={allData}
            onEdit={handleEditById}
            showFromDate={false}
            showToDate={false}
            handleExport={handleExport}
          />
        </div>
      </div>

      {openDialog && (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="w-full max-w-2xl border border-gray-200 dark:border-gray-800 overflow-hidden rounded-xl">
              <div className="bg-gradient-to-t from-green-600 p-2 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold">Add New Income</h2>
                    <p className="text-emerald-100 text-sm mt-0">
                      Record your income transaction
                    </p>
                  </div>
                  <div>
                    <button className="p-2 hover:bg-white/20 hover:text-red-700 rounded-lg transition-colors">
                      <X
                        className="hover:text-red-700"
                        onClick={() => setOpenDialog(false)}
                      />
                    </button>
                  </div>
                </div>
              </div>
              {/*  */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="p-1 bg-white dark:bg-slate-950"
              >
                <div className="grid grid-cols-3  gap-2">
                  {/* income source */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Income Source <span className="text-red-700">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Tech Corp Pvt Ltd"
                      className="w-full px-2 py-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 dark:text-white"
                      {...register("incomeSource", {
                        required: "Income Source is required",
                        minLength: {
                          value: 3,
                          message: "Minimum 3 characters required",
                        },
                        pattern: {
                          value: /^[A-Za-z ]+$/,
                          message: "Only alphabets are allowed",
                        },
                      })}
                    />
                    <p className="text-red-500 text-sm mt-1">
                      {errors.incomeSource?.message}
                    </p>
                  </div>
                  {/* category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Category <span className="text-red-700">*</span>
                    </label>
                    <select
                      className="w-full px-2 py-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 dark:text-white"
                      {...register("category", {
                        required: "Category is required",
                      })}
                    >
                      {incomeCategories.map((cat, index) => (
                        <option key={index} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    <p className="text-red-500 text-sm mt-1">
                      {errors.category?.message}
                    </p>
                  </div>
                  {/* amount */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Amount <span className="text-red-700">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="e.g., 100"
                      className="w-full px-2 py-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 dark:text-white"
                      {...register("amount", {
                        required: "Amount is required",
                        valueAsNumber: true,
                      })}
                    />
                    <p className="text-red-500 text-sm mt-1">
                      {errors.amount?.message}
                    </p>
                  </div>
                  {/* date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Date <span className="text-red-700">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      className="w-full px-2 py-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 dark:text-white"
                      {...register("date", {
                        required: "Date is required",
                      })}
                    />
                    <p className="text-red-500 text-sm mt-1">
                      {errors.date?.message}
                    </p>
                  </div>
                  {/* payment method */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Payment Method <span className="text-red-700">*</span>
                    </label>
                    <select
                      className="w-full px-2 py-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 dark:text-white"
                      {...register("paymentMethod", {
                        required: "Payment Method is required",
                      })}
                    >
                      {paymentMethods.map((cat, index) => (
                        <option key={index} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    <p className="text-red-500 text-sm mt-1">
                      {errors.paymentMethod?.message}
                    </p>
                  </div>
                  {/* account */}
                  {paymentMethod === "Bank Transfer" && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Account <span className="text-red-700">*</span>
                        </label>
                        <select
                          className="w-full px-2 py-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 dark:text-white"
                          {...register("account", {
                            required: "Account is required",
                          })}
                        >
                          {accountLabels.map((cat, index) => (
                            <option key={index} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                        <p className="text-red-500 text-sm mt-1">
                          {errors.account?.message}
                        </p>
                      </div>
                    </>
                  )}

                  {/* transactionId */}
                  {paymentMethod === "Bank Transfer" && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Transaction Id
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., TXN98456321"
                          className="w-full px-2 py-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 dark:text-white"
                          {...register("transactionId", {
                            minLength: {
                              value: 6,
                              message: "Minimum 6 characters required",
                            },
                            maxLength: {
                              value: 20,
                              message: "Maximum 20 characters allowed",
                            },
                            pattern: {
                              value: /^[A-Za-z0-9]+$/,
                              message: "Only letters and numbers allowed",
                            },
                          })}
                        />

                        <p className="text-red-500 text-sm mt-1">
                          {errors.transactionId?.message}
                        </p>
                      </div>
                    </>
                  )}

                  {/*  */}
                </div>
                {/*  */}
                {/*Description*/}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    type="text"
                    rows={3}
                    placeholder="Add notes about this income"
                    className="w-full px-2 py-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 dark:text-white"
                    {...register("description", {
                      pattern: {
                        value: /^[A-Za-z ]+$/,
                        message: "Only alphabets are allowed",
                      },
                    })}
                  />
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description?.message}
                  </p>
                </div>
                <div className="flex items-center justify-center gap-3 pt-4">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none border border-slate-950 dark:border-slate-200 dark:text-white py-1 px-2 hover:bg-slate-200 dark:hover:bg-slate-50/20"
                    onClick={() => {
                      setOpenDialog(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none border border-slate-950 dark:border-slate-200 text-white py-1 px-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700"
                  >
                    Save
                  </button>
                </div>
              </form>
              {/*  */}
            </div>
          </div>
        </>
      )}
      <Loading loading={loading} />
    </>
  );
};
export default Income;
