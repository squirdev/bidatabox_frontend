import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { BsArrowRightCircleFill, BsChevronDoubleDown } from "react-icons/bs";
import { useLanguage } from "../../../context/LanguageProvider";
import { useEffect } from "react";

const LanguageDropDown = () => {
  const { t, setLocale } = useLanguage();
  if (!t) return <p>Loading translations...</p>;

  useEffect(() => {
    if (setLocale) setLocale(localStorage.getItem("language") || "en");
  }, [setLocale]);

  const handleSetLanguage = (lang) => {
    console.log("Language", lang);
    localStorage.setItem("language", lang);
    setLocale(lang);
  };

  return (
    <Menu>
      <MenuHandler>
        <button className="flex items-center gap-1">
          <Typography variant="small">{t("language")}</Typography>
          <BsChevronDoubleDown className="w-3 h-3 text-gray-800" />
        </button>
      </MenuHandler>
      <MenuList className="p-0">
        <MenuItem onClick={() => handleSetLanguage("ch")}>
          <div className="w-full flex justify-between items-center px-4">
            <BsArrowRightCircleFill className="w-4 h-4" />
            <Typography variant="small">中文版</Typography>
          </div>
        </MenuItem>
        <hr />
        <MenuItem onClick={() => handleSetLanguage("en")}>
          <div className="w-full flex justify-between items-center px-4">
            <BsArrowRightCircleFill className="w-4 h-4" />
            <Typography variant="small">English</Typography>
          </div>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default LanguageDropDown;
