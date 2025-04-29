"use client";

import { useState } from "react";

import {
  Button,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
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
  const [subQuantity, setSubQuantity] = useState(0);
  const [amount, setAmount] = useState(0);

  const handleGenerate = async () => {
    const validErrorMsg = isValidGenerateParam(
      amount,
      countryCode,
      subQuantity
    );
    if (validErrorMsg) {
      showAlert(validErrorMsg);
      return;
    }
    const result = await generatePhoneNumbers(countryCode, amount, subQuantity);
    downloadTextFile(result);
  };

  if (!t) return <p className="text-white">Loading translations...</p>;
  return (
    <div className="w-full h-full bg-white">
      <div className="w-full p-4">
        <Typography variant="h6">{t("addGenerationTask")}</Typography>
      </div>
      <hr />
      <div className="w-full mt-4 p-4 flex flex-col gap-12">
        <SelectCountry code={countryCode} setCode={setCountryCode} />
        <div className="flex justify-between items-center gap-4">
          <Input
            value={amount}
            type="number"
            variant="static"
            max={5000000}
            label={t("amount")}
            onChange={(e) => setAmount(Math.min(e.target.value, 5000000))}
          />
          <Select
            variant="static"
            label={t("subcontractingQuantity")}
            onChange={(e) => setSubQuantity(e)}
          >
            {[1500000, 1000000, 500000].map((value, i) => (
              <Option key={i} value={value}>
                {value.toLocaleString()}
              </Option>
            ))}
          </Select>
        </div>
        <div>
          <Button color="red" onClick={handleGenerate}>
            {t("submit")}
          </Button>
        </div>
        <GenerateNote />
      </div>
    </div>
  );
}
