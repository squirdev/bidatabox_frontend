"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import { Card, Input, Button, Typography } from "@material-tailwind/react";

import { useLanguage } from "../../../context/LanguageProvider";
import { useAlert } from "../../../context/alertContext";
import { signIn } from "../api/auth";
import { login } from "../../../redux/authSlice";

export default function Home() {
  const { t } = useLanguage();
  const { showAlert } = useAlert();
  const dispatch = useDispatch();
  const router = useRouter();

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      showAlert("请输入所有详情");
      return;
    }
    try {
      setIsLoading(true);
      const result = await signIn(username, password);
      if (result) {
        showAlert("已成功登录系统", "success");
        dispatch(login({ token: result.token, user: result.user }));
        router.push("/");
      } else {
        showAlert("账号无效，请重试");
      }
    } catch (error) {
      console.log("error", error);
      showAlert("账号无效，请重试");
    } finally {
      setIsLoading(false);
    }
  };

  if (!t) return <p className="text-white">Loading translations...</p>;
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Card
        color="transparent"
        shadow={true}
        className="p-6 shadow-xl shadow-gray-400"
      >
        <Typography variant="h4" color="blue-gray">
          {t("loginToAccount")}
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          {t("loginToAccountDescription")}
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              {t("account")}
            </Typography>
            <Input
              value={username}
              placeholder={t("account")}
              onChange={(e) => setUserName(e.target.value)}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              {t("password")}
            </Typography>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={t("password")}
              placeholder={t("password")}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <Button
            loading={isLoading}
            type="submit"
            color="red"
            onClick={handleSubmit}
            className="mt-6 flex justify-center"
            fullWidth
          >
            {t("signin")}
          </Button>
        </form>
      </Card>
    </div>
  );
}
