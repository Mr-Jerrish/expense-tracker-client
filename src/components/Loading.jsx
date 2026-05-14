import { motion } from "framer-motion";
import Logo from "../assets/images/Sheik1.png";
const Loading = ({ loading = false, text = "Loading Please Wait..." }) => {
  if (!loading) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center
      bg-black/20 backdrop-blur-sm"
    >
      <div
        className="flex flex-col items-center gap-3
        bg-white dark:bg-slate-900
        px-6 py-4 rounded-xl shadow-xl"
      >
        <div className=" bg-slate-100 borderborder-blue-400/40 rounded-full  shadow-[0_0_20px_rgba(59,130,246,0.6)] border border-blue-600  logo-loader ">
          {/* <img src={Logo} className="w-10 h-10" alt="Loading" /> */}
          <img
            src={Logo}
            className="w-16 h-16 object-cover rounded-full"
            alt="Loading"
          />
        </div>

        {/* Bouncing Dots */}
        <div className="flex gap-4">
          <motion.span
            className="w-2 h-2 bg-blue-500 rounded-full"
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 0.6 }}
          />
          <motion.span
            className="w-2 h-2 bg-blue-500 rounded-full"
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
          />
          <motion.span
            className="w-2 h-2 bg-blue-500 rounded-full"
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
          />
        </div>

        {/* Text */}
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
          {text}
        </p>
      </div>
    </div>
  );
};

export default Loading;
