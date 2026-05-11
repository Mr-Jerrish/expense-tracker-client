import React from "react";
import EfitLogo from "../../assets/images/EfitLogo.png";
import { Sparkles } from "lucide-react";
const Logo = () => {
  return (
    <>
      <div className="flex items-center gap-2">
        {/* <img src={EfitLogo} alt="efit" className="w-20 object-contain" /> */}
        <div className="w-6 h-6 bg-gradient-to-br from-purple-600 to-blue-600 rounded-md flex items-center justify-center">
          <Sparkles className="text-white w-3 h-3" />
        </div>
        <div className="h1 font-bold text-gray-900 dark:text-white">
          ExpenseTracker
        </div>
      </div>
    </>
  );
};

export default React.memo(Logo);
