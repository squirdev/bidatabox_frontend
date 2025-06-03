import UpdatePasswordModal from "@/app/components/modal/updatePassword";
import {
  Avatar,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { AiOutlinePoweroff, AiTwotoneSetting } from "react-icons/ai";
import { useLanguage } from "../../../context/LanguageProvider";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/authSlice";
import { useRouter } from "next/navigation";

const ProfileDropDown = () => {
  const [updatePasswordModalShow, setUpdatePasswordModalShow] = useState(false);
  const { t } = useLanguage();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  if (!t) return <p className="text-white">Loading translations...</p>;

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <Menu>
      <UpdatePasswordModal
        open={updatePasswordModalShow}
        setOpen={setUpdatePasswordModalShow}
      />
      <MenuHandler>
        <Avatar
          variant="circular"
          alt="User"
          className="cursor-pointer w-10 h-10"
          src="/avatar.jpg"
        />
      </MenuHandler>
      <MenuList>
        <div className="py-2 outline-none">
          <Typography variant="small" className="font-medium font-bold">
            {t("welcome")} {user?.realname}
          </Typography>
        </div>
        <MenuItem
          onClick={() => setUpdatePasswordModalShow(true)}
          className="flex items-center gap-2"
        >
          <AiTwotoneSetting />
          <Typography variant="small" className="font-medium">
            {t("changePassword")}
          </Typography>
        </MenuItem>
        <hr className="my-2 border-blue-gray-50" />
        <MenuItem className="flex items-center gap-2" onClick={handleLogout}>
          <AiOutlinePoweroff />
          <Typography variant="small" className="font-medium">
            {t("logout")}
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
export default ProfileDropDown;
