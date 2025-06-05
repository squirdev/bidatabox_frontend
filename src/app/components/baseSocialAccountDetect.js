import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Button,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { BsListTask } from "react-icons/bs";

import UploadNote from "./uploadNote";
import { getProfile } from "../api/user";
import { logout, updateUser } from "../../../redux/authSlice";
import { useLanguage } from "../../../context/LanguageProvider";
import { useAlert } from "../../../context/alertContext";
import { isValidSocialDetect } from "../helper";
import { uploadSocialRequest } from "../api/service";

const activeDayList = [0, 1, 2, 3, 5, 7, 15, 30, 45, 60];

const BaseSocialAccountDetect = ({ social, icon }) => {
  const { t } = useLanguage();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const { showAlert } = useAlert();
  const [taskName, setTaskName] = useState("");
  const [activeDay, setActiveDay] = useState(0);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDetect = async () => {
    const validCheck = isValidSocialDetect(taskName, file);
    if (!validCheck.valid) {
      showAlert(validCheck.message);
      return;
    }
    try {
      setIsLoading(true);
      const result = await uploadSocialRequest({
        file,
        social,
        taskName,
        activeDay,
      });
      if (result) {
        if (result.RES == "100") {
          showAlert("已成功上传", "success");
          router.push("/daydetectlist");
        } else {
          showAlert(result.ERR);
        }
      } else {
        showAlert("出现错误。请联系管理员");
      }
    } catch (error) {
      console.log("ERROR", error);
      showAlert("出了点问题，请重试");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeFile = (e) => {
    setFile(e.target.files[0]);
  };

  const fetUserProfile = async () => {
    const result = await getProfile();
    if (result) {
      dispatch(updateUser({ user: result.user }));
    } else {
      dispatch(logout());
      router.push("/login");
    }
  };

  useEffect(() => {
    fetUserProfile();
  }, []);

  if (!t) return <p className="text-white">Loading translations...</p>;
  return (
    <div className="w-full h-full bg-white">
      <div className="w-full flex justify-between items-center p-4">
        <div className="flex items-center gap-2">
          <Image src={icon} width={28} height={28} alt="image" />
          <Typography variant="h6">
            {t("add")} {social} Days {t("detection")}
          </Typography>
        </div>
        <Link href={"/daydetectlist"} className="flex items-center gap-2">
          <BsListTask strokeWidth={1} />
          <Typography variant="h6">{t("goToList")}</Typography>
        </Link>
      </div>
      <hr />
      <div className="w-full mt-4 p-4 flex flex-col gap-12">
        <div className="w-full flex gap-2">
          <Input
            readOnly
            label={t("currentPoint")}
            variant="static"
            value={user ? Math.round(user.balance) : 0}
          />
          <Input
            readOnly
            label={t("price")}
            variant="static"
            value={
              social == "TG"
                ? process.env.NEXT_PUBLIC_TG_ACTIVE_SELL_PRICE
                : process.env.NEXT_PUBLIC_WS_ACTIVE_SELL_PRICE
            }
          />
        </div>
        <Input
          variant="static"
          value={taskName}
          label={t("taskName")}
          placeholder={t("taskName")}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <div className="w-full flex gap-2">
          <Select
            variant="static"
            label={t("activeDays")}
            onChange={(e) => setActiveDay(e)}
          >
            {activeDayList.map((day, index) => (
              <Option key={index} value={day}>
                {day} days
              </Option>
            ))}
          </Select>
        </div>
        <Input
          type="file"
          variant="static"
          label={t("uploadFiles")}
          className="file:hidden"
          onChange={handleChangeFile}
        />
        <div>
          <Button color="red" loading={isLoading} onClick={handleDetect}>
            {t("submit")}
          </Button>
        </div>
        <UploadNote />
      </div>
    </div>
  );
};

export default BaseSocialAccountDetect;
