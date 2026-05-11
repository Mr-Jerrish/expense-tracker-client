import React from "react";

const CategoryCard = ({ data = [], type = "income" }) => {
  const total = data.reduce((acc, item) => acc + item.amount, 0);

  return (
    <div
      className="w-full max-w-sm rounded-2xl p-5 
      bg-white dark:bg-[#0f172a] 
      shadow hover:shadow-lg
      transition-all duration-300"
    >
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        By Category
      </h2>

      <div className="space-y-4">
        {data.map((item, index) => {
          const percent = (item.amount / total) * 100;

          return (
            <div key={index}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-300">
                  {item.name}
                </span>
                <span className="text-gray-800 dark:text-white font-medium">
                  ₹{item.amount}
                </span>
              </div>

              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                <div
                  // className="h-2 rounded-full bg-green-500"
                  className={`h-2 rounded-full ${
                    type === "income" ? "bg-green-500" : "bg-red-500"
                  }`}
                  style={{ width: `${percent}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryCard;
