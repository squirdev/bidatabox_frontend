import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { BsListStars, BsTelegram } from "react-icons/bs";
import { useLanguage } from "../../../context/LanguageProvider";

const ContactDropDown = () => {
  const { t } = useLanguage();
  if (!t) return <p className="text-white">Loading translations...</p>;

  return (
    <Menu>
      <MenuHandler>
        <button className="flex items-center gap-1">
          <Typography variant="small">{t("contactPerson")}</Typography>
          <BsListStars className="w-3 h-3 text-gray-800" />
        </button>
      </MenuHandler>
      <MenuList className="p-0">
        <MenuItem>
          <div className="w-full flex justify-between items-center px-4">
            <BsTelegram className="w-4 h-4" />
            <Typography variant="small">@ss520765</Typography>
          </div>
        </MenuItem>
        <hr />
        <MenuItem>
          <div className="w-full flex justify-between items-center px-4">
            <BsTelegram className="w-4 h-4" />
            <Typography variant="small">@bidatabox888</Typography>
          </div>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ContactDropDown;
