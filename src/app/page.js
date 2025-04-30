"use client";

import { useEffect, useState } from "react";

import { Button, Input, Typography } from "@material-tailwind/react";
import { BsArrowLeft } from "react-icons/bs";

import UploadNote from "./components/uploadNote";
import SelectCountry from "./components/countrySelect";
import { useLanguage } from "../../context/LanguageProvider";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "../../context/alertContext";
import { getProfile } from "./api/user";
import { logout, updateUser } from "../../redux/authSlice";
import { useRouter } from "next/navigation";
import { isValidActiveDetect } from "./helper";
import { uploadRequest } from "./api/service";
import Link from "next/link";

export default function Home() {
  const { t } = useLanguage();
  const { showAlert } = useAlert();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const [taskName, setTaskName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);

  const handleChangeFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDetect = async () => {
    const validCheck = isValidActiveDetect(
      user.balance,
      user.phoneCost,
      taskName,
      countryCode,
      file
    );
    if (!validCheck.valid) {
      showAlert(validCheck.message);
      return;
    }
    try {
      setIsLoading(true);
      const result = await uploadRequest({
        taskName,
        countryCode,
        file,
      });
      if (result) {
        if (result.RES == "100") {
          showAlert("已成功上传", "success");
          router.push("/detectlist");
        } else {
          showAlert(result.ERR);
        }
      } else {
        showAlert("出了点问题，请重试");
      }
    } catch (error) {
      showAlert("出了点问题，请重试");
    } finally {
      setIsLoading(false);
    }
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
        <Typography variant="h6">{t("addActiveDetection")}</Typography>
        <Link href="/detectlist" className="flex items-center gap-2">
          <BsArrowLeft strokeWidth={1.5} />
          <Typography variant="h6">{t("goBack")}</Typography>
        </Link>
      </div>
      <hr />
      <div className="w-full mt-4 p-4 flex flex-col gap-12">
        <div className="w-full flex gap-2">
          <Input
            readOnly
            variant="static"
            value={user ? user.balance : 0}
            label={t("balance")}
          />
          <Input
            readOnly
            value={user ? user.phoneCost : 0}
            variant="static"
            label={t("price")}
            placeholder={t("price")}
          />
        </div>
        <Input
          variant="static"
          value={taskName}
          label={t("taskName")}
          placeholder={t("taskName")}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <SelectCountry code={countryCode} setCode={setCountryCode} />
        <Input
          type="file"
          variant="static"
          className="file:hidden"
          label={t("uploadFiles")}
          onChange={handleChangeFile}
        />
        <div>
          <Button color="red" loading={isLoading} onClick={handleDetect}>
            {t("detectActivePhone")}
          </Button>
        </div>
        <UploadNote />
      </div>
    </div>
  );
}
