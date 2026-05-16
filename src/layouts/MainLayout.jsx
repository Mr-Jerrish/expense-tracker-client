import React from "react";
import Header from "../layouts/header/Header.jsx";
import { Outlet } from "react-router-dom";
const MainLayout = () => {
  return (
    <>
      <div className="min-h-screen bg-white dark:bg-slate-950">
        <Header />
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div
            className="
    absolute -top-40 -right-40 w-80 h-80
    rounded-full blur-3xl 
    bg-gradient-to-br
    from-blue-500/20  to-purple-500/20
  "
          />

          <div
            className="
    absolute top-1/2 -left-40 w-80 h-80
    rounded-full blur-3xl 
    bg-gradient-to-br
    from-emerald-500/20  to-teal-500/20"
          />

          <div
            className="
    absolute -bottom-40 right-1/3 w-80 h-80
    rounded-full blur-3xl 
    bg-gradient-to-br
    from-pink-500/20  to-orange-500/20
   
  "
          />
        </div>
        <div className="px-4 py-3 md:px-8 md:py-5">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default React.memo(MainLayout);
