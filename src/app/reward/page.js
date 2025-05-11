"use client";

import {
  Card,
  IconButton,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../../context/LanguageProvider";
import { getTimeStrHeader } from "../helper";
import { uploadPreRequest, uploadSocialPrePreRequest } from "../api/service";
import { useAlert } from "../../../context/alertContext";
import SelectCountry from "../components/countrySelect";

const FreeRewards = () => {
  const { t } = useLanguage();
  const router = useRouter();
  const { showAlert } = useAlert();
  const [countryCode, setCountryCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePrePhoneDetect = async (index) => {
    if (!countryCode) {
      showAlert("请选择国家");
      return;
    }
    try {
      setIsLoading(true);
      const result = await uploadPreRequest({
        taskName: getTimeStrHeader("Phone"),
        countryCode: countryCode,
        zipIndex: index,
      });
      if (result) {
        if (result.RES != "100") {
          showAlert(result.ERR);
          return;
        }
        showAlert("行动成功");
        router.push("/daydetectlist");
      } else {
        showAlert("出了点问题");
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreTGDetect = async (index) => {
    if (!countryCode) {
      showAlert("请选择国家");
      return;
    }
    try {
      setIsLoading(true);
      const result = await uploadSocialPrePreRequest({
        social: "TG",
        taskName: getTimeStrHeader("TG"),
        activeDay: 60,
        countryCode: countryCode,
        zipIndex: index,
      });
      if (result) {
        if (result.RES != "100") {
          showAlert(result.ERR);
          return;
        }
        showAlert("行动成功");
        router.push("/daydetectlist");
      } else {
        showAlert("出了点问题");
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreWSDetect = async (index) => {
    if (!countryCode) {
      showAlert("请选择国家");
      return;
    }
    try {
      setIsLoading(true);
      const result = await uploadSocialPrePreRequest({
        social: "WS",
        taskName: getTimeStrHeader("WS"),
        activeDay: 60,
        countryCode: countryCode,
        zipIndex: index,
      });

      if (result) {
        if (result.RES != "100") {
          showAlert(result.ERR);
          return;
        }
        showAlert("行动成功");
        router.push("/daydetectlist");
      } else {
        showAlert("出了点问题");
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!t) return <p className="text-white">Loading translations...</p>;
  return (
    <div className="w-full h-full max-h-[820px] bg-white p-8 overflow-auto">
      <div className="w-64 py-8">
        <SelectCountry code={countryCode} setCode={setCountryCode} />
      </div>
      <div className="w-full grid grid-cols-5 gap-8 pb-8 relative px-4">
        {isLoading && (
          <div className="absolute w-full h-full bg-gray-300 z-50 opacity-50" />
        )}
        {Array.from({ length: 50 }).map((_, index) => {
          return (
            <Card
              key={index}
              color="primary"
              className="relative rounded-2xl h-32 flex items-center p-4 justify-end shadow shadow-xl"
            >
              <div className="flex gap-6">
                <Typography variant="h2" className="absolute -top-2 -left-2">
                  {index + 1}
                </Typography>
                <div>
                  <Typography variant="h5">{t("freeNumbers")} 20万</Typography>
                  <Typography variant="h6" className="text-center">
                    积分: 1250
                  </Typography>
                </div>
              </div>
              <div className="w-full flex justify-center">
                <IconButton
                  onClick={() => handlePrePhoneDetect(index)}
                  variant="text"
                >
                  <Image
                    src={"/social/phone.png"}
                    width={20}
                    height={20}
                    alt="logo"
                  />
                </IconButton>
                <IconButton
                  variant="text"
                  onClick={() => handlePreTGDetect(index)}
                >
                  <Image
                    src={"/social/telegram.png"}
                    width={20}
                    height={20}
                    alt="logo"
                  />
                </IconButton>
                <IconButton
                  variant="text"
                  onClick={() => handlePreWSDetect(index)}
                >
                  <Image
                    src={"/social/whatsapp.png"}
                    width={20}
                    height={20}
                    alt="logo"
                  />
                </IconButton>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default FreeRewards;
