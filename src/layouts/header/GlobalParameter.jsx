import { Globe } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useState, useRef, useEffect } from "react";
import { generateFinancialYears } from "../../config/financialYear";
const GlobalParameter = () => {
  const { financialYear, setFinancialYear } = useTheme();

  const menuRef = useRef(null);
  const [open, setOpen] = useState(false);

  const years = generateFinancialYears();

  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 cursor-pointer"
      >
        <Globe className="w-4 h-4 text-gray-700 dark:text-gray-300" />
      </div>

      {open && (
        <div
          className="absolute right-0 mt-3 w-60
          rounded-md
          bg-white dark:bg-slate-900/90
          border border-slate-200/60 dark:border-slate-700
          shadow-lg
          p-3 overflow-hidden"
        >
          <div className="text-center pb-2 mb-2 border-b border-slate-200 dark:border-slate-700">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              Global Settings
            </p>
          </div>

          {/* ✅ FINANCIAL YEAR */}
          <div className="flex flex-col mb-3">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              Financial Year
            </p>

            <select
              className="w-full px-2 py-1 border rounded-lg 
              dark:bg-slate-800 dark:border-slate-700 dark:text-white"
              value={financialYear}
              // onChange={(e) => setFinancialYear(e.target.value)}
              onChange={(e) => {
                const value = e.target.value;
                setFinancialYear(value);
                window.location.reload();
              }}
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalParameter;
