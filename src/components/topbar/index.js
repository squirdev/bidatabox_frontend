"use client";

import { useLanguage } from "../../../context/LanguageProvider";
import { BsTextIndentLeft } from "react-icons/bs";
import ProfileDropDown from "./profileDropDown";
import LanguageDropDown from "./languageDropDown";

const TopBar = ({ sidebarShow, setSidebarShow }) => {
  const { t } = useLanguage();
  if (!t) return <p className="text-white">Loading translations...</p>;

  return (
    <div className="bg-white w-full flex justify-between px-8 py-2 items-center shadow-sm shadow-gray">
      <button onClick={() => setSidebarShow(!sidebarShow)}>
        <BsTextIndentLeft className="w-6 h-6 text-red-300" />
      </button>
      <div className="flex justify-center items-center gap-6">
        <LanguageDropDown />
        <ProfileDropDown />
      </div>
    </div>
  );
};

export default TopBar;
