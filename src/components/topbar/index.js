"use client";

import { useLanguage } from "../../../context/LanguageProvider";
import { BsTextIndentLeft } from "react-icons/bs";
import ProfileDropDown from "./profileDropDown";
import LanguageDropDown from "./languageDropDown";
import { Typography } from "@material-tailwind/react";
import { useSelector } from "react-redux";

const TopBar = ({ sidebarShow, setSidebarShow }) => {
  const { t } = useLanguage();
  const { user } = useSelector((state) => state.auth);
  if (!t) return <p className="text-white">Loading translations...</p>;

  return (
    <div className="bg-white w-full flex justify-between px-8 py-2 items-center shadow-sm shadow-gray">
      <button onClick={() => setSidebarShow(!sidebarShow)}>
        <BsTextIndentLeft className="w-6 h-6 text-red-300" />
      </button>
      <div className="flex justify-center items-center gap-6">
        <div className="flex gap-2 items-end">
          <Typography variant="h6">{t("currentPoint")}:</Typography>
          <Typography variant="h4" color="red">
            {Math.round(user?.balance) || 0}
          </Typography>
        </div>
        <LanguageDropDown />
        <ProfileDropDown />
      </div>
    </div>
  );
};

export default TopBar;
