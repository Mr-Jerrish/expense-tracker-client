import { motion } from "framer-motion";
import { Inbox } from "lucide-react";

const NoData = ({
  title = "No Data Found",
  subtitle = "Try adjusting filters or add new records",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col items-center justify-center py-8 text-center"
    >
      {/* ICON */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="mb-4 flex h-16 w-16 items-center justify-center
        rounded-full bg-blue-100 dark:bg-blue-900/30"
      >
        <Inbox className="h-8 w-8 text-blue-600 dark:text-blue-400" />
      </motion.div>

      {/* TITLE */}
      <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200">
        {title}
      </h3>

      {/* SUBTITLE */}
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        {subtitle}
      </p>
    </motion.div>
  );
};

export default NoData;
