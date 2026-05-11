import React from "react";
import Logo from "../header/Logo";
import NavLinks from "./NavLinks";

import GlobalParameter from "./GlobalParameter";
import FinancialAi from "./FinancialAi";
import UserIcon from "./UserIcon";
import MobileMenu from "./MobileMenu ";
import ThemeToggle from "../../components/ThemeToggle";
const Header = () => {
  return (
    <>
      <div
        className="sticky inset-0 z-50
  text-black dark:text-white
  flex items-center justify-between 
  px-4 py-2 bg-white dark:bg-slate-950
  border-b border-gray-100 dark:border-gray-800"
      >
        <Logo />
        <NavLinks />

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <GlobalParameter />
          <FinancialAi />
          <MobileMenu />
          <UserIcon />
        </div>
      </div>
    </>
  );
};

export default React.memo(Header);
