import React from "react";
import { useState, useMemo, useEffect } from "react";
import { Download, Plus, Search, PencilIcon } from "lucide-react";
import NoData from "../components/NoData";
import dayjs from "dayjs";
const CommonListview = ({
  title,
  length,
  addNewData,
  handleExport,
  handleNew,
  addNew,
  showFromDate = true,
  showToDate = true,
  data = [],
  columns = [],
  onEdit,
}) => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      // Global search
      const globalMatch = columns.some((col) => {
        if (!col.searchable) return false;
        const value = row[col.key];
        return value?.toString().toLowerCase().includes(search.toLowerCase());
      });
      // Status Filter
      const statusMatch = status ? row.status === status : true;
      // Date Filter
      const rowDate = row.date ? new Date(row.date) : null;
      const fromMatch = fromDate ? rowDate >= new Date(fromDate) : true;
      const toMatch = toDate ? rowDate <= new Date(toDate) : true;
      return globalMatch && statusMatch && fromMatch && toMatch;
    });
  }, [data, columns, search, status, fromDate, toDate]);

  const tableData = filteredData;

  return (
    <>
      {/*  header*/}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {length} transactions found
          </p>
        </div>
        <div className="flex gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-4 top-3 h-3 w-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full
                pl-9 pr-3 py-1
                rounded-lg
                border border-slate-300 dark:border-slate-600
                bg-white dark:bg-slate-800
                text-slate-900 dark:text-white
                placeholder-slate-400
                focus:outline-none focus:ring-2 focus:ring-blue-500
              "
            />
          </div>
          {showFromDate && (
            <input
              type="date"
              className="
                w-full sm:w-44
                px-3 py-1
                rounded-lg
                border border-slate-300 dark:border-slate-600
                bg-white dark:bg-slate-800
                text-slate-900 dark:text-white
                focus:outline-none focus:ring-2 focus:ring-blue-500
                dark:[color-scheme:dark]
              "
            />
          )}
          {/* 📅 ToDate Date */}
          {showToDate && (
            <input
              type="date"
              className="
                w-full sm:w-44
                px-3 py-1
                rounded-lg
                border border-slate-300 dark:border-slate-600
                bg-white dark:bg-slate-800
                text-slate-900 dark:text-white
                focus:outline-none focus:ring-2 focus:ring-blue-500
                dark:[color-scheme:dark]
              "
            />
          )}
        </div>
        <div className="flex gap-2">
          <button
            className="flex items-center gap-1 text-sm font-medium  border  border-gray-900 dark:border-gray-300 px-2 py-1 rounded-lg text-slate-950 dark:text-white hover:scale-105 transition-all duration-700"
            onClick={handleExport}
          >
            <Download className="w-3 h-3" />
            Export
          </button>
          <button
            className="flex items-center gap-1 text-sm font-medium  bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 border  border-gray-900 dark:border-gray-300 px-2 py-1 rounded-lg text-white hover:scale-105 transition-all duration-700"
            onClick={handleNew}
          >
            <Plus className="w-3 h-3" />
            {addNew}
          </button>
        </div>
      </div>
      {/* Body Data or List View */}
      <div className="w-full rounded-2xl bg-white dark:bg-slate-900 shadow-md border border-slate-200 dark:border-slate-700 mt-2 p-2">
        <div className="max-h-[250px] overflow-y-auto">
          <table className="min-w-full text-sm">
            {/* Header */}
            <thead className="bg-slate-100 dark:bg-slate-800 sticky top-0 z-10">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="px-3 py-2 text-left font-semibold text-slate-600 dark:text-slate-300"
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Body */}
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {tableData.length > 0 ? (
                tableData.map((row, index) => (
                  <tr
                    key={index}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                  >
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className="px-3 py-1 text-slate-700 dark:text-slate-200"
                      >
                        {col.key === "action" ? (
                          <button
                            onClick={() => onEdit(row._id)}
                            className="
          flex items-center gap-1
          px-2 py-1
          text-xs font-medium
          rounded-lg
          bg-amber-500 text-white
          hover:bg-amber-600
          transition
        "
                          >
                            <PencilIcon className="w-4 h-4" />
                          </button>
                        ) : col.type === "date" ? (
                          dayjs(row[col.key]).format("DD-MM-YYYY")
                        ) : (
                          row[col.key]
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length}>
                    <NoData />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CommonListview;
