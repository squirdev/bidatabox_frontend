"use client";

import { useState } from "react";

import { Button, Input, Typography } from "@material-tailwind/react";
import { useLanguage } from "../../../context/LanguageProvider";
import GenerateNote from "../components/generateNote";
import { useAlert } from "../../../context/alertContext";
import {
  downloadTextFile,
  generatePhoneNumbers,
  isValidGenerateParam,
} from "../helper";
import SelectCountry from "../components/countrySelect";

export default function Home() {
  const { t } = useLanguage();
  const { showAlert } = useAlert();
  const [countryCode, setCountryCode] = useState("");
  const [amount, setAmount] = useState(200000);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleGenerate = async () => {
    const validErrorMsg = isValidGenerateParam(amount, countryCode);
    if (validErrorMsg) {
      showAlert(validErrorMsg);
      return;
    }
    try {
      setIsLoading(true);
      const result = await generatePhoneNumbers({
        file,
        amount,
        countryCode,
      });
      downloadTextFile(result);
    } catch (error) {
      showAlert(t("genErrMsg"));
    } finally {
      setIsLoading(false);
    }
  };

  if (!t) return <p className="text-white">Loading translations...</p>;
  return (
    <div className="w-full h-full bg-white">
      <div className="w-full p-4">
        <Typography variant="h6">{t("addGenerationTask")}</Typography>
      </div>
      <hr />
      <div className="w-full mt-4 p-4 flex flex-col gap-12">
        <div className="flex justify-between items-center gap-4">
          <SelectCountry code={countryCode} setCode={setCountryCode} />
          <Input
            type="file"
            variant="static"
            className="file:hidden"
            label={t("uploadCompareFiles")}
            onChange={handleChangeFile}
          />
        </div>
        <div className="flex justify-between items-center gap-4">
          <Input
            type="number"
            max={10000000}
            value={amount}
            variant="static"
            label={t("amount")}
            onChange={(e) => {
              const rawValue = e.target.value;

              if (rawValue === "") {
                setAmount("");
                return;
              }
              const intValue = parseInt(rawValue, 10);

              if (!isNaN(intValue)) {
                setAmount(Math.min(intValue, 10000000));
              }
            }}
          />
        </div>
        <div>
          <Button color="red" loading={isLoading} onClick={handleGenerate}>
            {t("submit")}
          </Button>
        </div>
        <GenerateNote />
      </div>
    </div>
  );
}
