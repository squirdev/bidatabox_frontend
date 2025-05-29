"use client";

import { Card, IconButton, Typography } from "@material-tailwind/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../../context/LanguageProvider";
import { uploadPreRequest, uploadSocialPrePreRequest } from "../api/service";
import { useAlert } from "../../../context/alertContext";
import SelectCountry from "../components/countrySelect";
import RewardConfirmModal from "../components/rewardConfirmModal";

const FreeRewards = () => {
  const { t } = useLanguage();
  const router = useRouter();
  const { showAlert } = useAlert();
  const [countryCode, setCountryCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [zipIndex, setZipIndex] = useState(-1);
  const [taskName, setTaskName] = useState("");
  const [actionType, setActionType] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [actionDay, setActionDay] = useState(0);
  const [phoneHistory, setPhHistory] = useState([]);
  const [telegramHistory, setTelegramHistory] = useState([]);
  const [whatsappHistory, setWhatsappHistory] = useState([]);

  useEffect(() => {
    const storedPH = localStorage.getItem("PH");
    setPhHistory(storedPH ? JSON.parse(storedPH) : []);

    const storedTG = localStorage.getItem("TG");
    setTelegramHistory(storedTG ? JSON.parse(storedTG) : []);

    const storedWS = localStorage.getItem("WS");
    setWhatsappHistory(storedWS ? JSON.parse(storedWS) : []);
  }, []);

  const openConfirmModal = (index, actionIndex) => {
    setZipIndex(index);
    setActionType(actionIndex);
    setModalOpen(true);
  };

  const handlePrePhoneDetect = async () => {
    if (!countryCode) {
      showAlert("请选择国家");
      return;
    }
    try {
      setIsLoading(true);
      const result = await uploadPreRequest({
        taskName: taskName,
        countryCode: countryCode,
        zipIndex: zipIndex,
      });
      if (result) {
        if (result.RES != "100") {
          showAlert(result.ERR);
          return;
        }
        showAlert("行动成功");
        setPhHistory([...phoneHistory, zipIndex]);
        localStorage.setItem("PH", JSON.stringify([...phoneHistory, zipIndex]));
        router.push("/detectlist");
      } else {
        showAlert("出了点问题");
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreTGDetect = async () => {
    if (!countryCode) {
      showAlert("请选择国家");
      return;
    }
    try {
      setIsLoading(true);
      const result = await uploadSocialPrePreRequest({
        social: "TG",
        taskName: taskName,
        activeDay: actionDay,
        countryCode: countryCode,
        zipIndex: zipIndex,
      });
      if (result) {
        if (result.RES != "100") {
          showAlert(result.ERR);
          return;
        }
        showAlert("行动成功");
        setTelegramHistory([...telegramHistory, zipIndex]);
        localStorage.setItem(
          "TG",
          JSON.stringify([...telegramHistory, zipIndex])
        );
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

  const handlePreWSDetect = async () => {
    if (!countryCode) {
      showAlert("请选择国家");
      return;
    }
    try {
      setIsLoading(true);
      const result = await uploadSocialPrePreRequest({
        social: "WS",
        taskName: taskName,
        activeDay: actionDay,
        countryCode: countryCode,
        zipIndex: zipIndex,
      });

      if (result) {
        if (result.RES != "100") {
          showAlert(result.ERR);
          return;
        }
        showAlert("行动成功");
        setWhatsappHistory([...whatsappHistory, zipIndex]);
        localStorage.setItem(
          "WS",
          JSON.stringify([...whatsappHistory, zipIndex])
        );
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

  const handleConfirm = () => {
    if (actionType == 0) {
      handlePrePhoneDetect();
    } else if (actionType == 1) {
      handlePreTGDetect();
    } else handlePreWSDetect();
    setModalOpen(false);
  };

  if (!t) return <p className="text-white">Loading translations...</p>;
  return (
    <div className="w-full h-full max-h-[820px] bg-white p-8 overflow-auto">
      <div className="w-64 py-8">
        <SelectCountry code={countryCode} setCode={setCountryCode} />
      </div>
      <div className="w-full grid grid-cols-5 gap-8 pb-8 relative px-4">
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
                  <Typography variant="small" className="text-center font-bold">
                    积分: 700(空号), 1250(TG), 400(WS)
                  </Typography>
                </div>
              </div>
              <div className="w-full flex justify-center gap-1">
                <IconButton
                  onClick={() => openConfirmModal(index, 0)}
                  variant="text"
                >
                  {phoneHistory.includes(index) && (
                    <div className="absolute rounded-full w-2 h-2 bg-red-500 -top-1 -left-1" />
                  )}
                  <Image
                    src={"/social/phone.png"}
                    width={20}
                    height={20}
                    alt="logo"
                  />
                </IconButton>
                <IconButton
                  variant="text"
                  onClick={() => openConfirmModal(index, 1)}
                >
                  {telegramHistory.includes(index) && (
                    <div className="absolute rounded-full w-2 h-2 bg-red-500 -top-1 -left-1" />
                  )}
                  <Image
                    src={"/social/telegram.png"}
                    width={20}
                    height={20}
                    alt="logo"
                  />
                </IconButton>
                <IconButton
                  variant="text"
                  onClick={() => openConfirmModal(index, 2)}
                >
                  {whatsappHistory.includes(index) && (
                    <div className="absolute rounded-full w-2 h-2 bg-red-500 -top-1 -left-1" />
                  )}
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
      <RewardConfirmModal
        open={modalOpen}
        onClose={setModalOpen}
        loading={isLoading}
        actionType={actionType}
        taskName={taskName}
        setTaskName={setTaskName}
        handleConfirm={handleConfirm}
        setActionDay={setActionDay}
      />
    </div>
  );
};

export default FreeRewards;
