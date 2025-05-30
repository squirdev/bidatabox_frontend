"use client";

import { useEffect, useState } from "react";

import {
  Button,
  Checkbox,
  Input,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { useLanguage } from "../../../context/LanguageProvider";
import GenerateNote from "../components/generateNote";
import { useAlert } from "../../../context/alertContext";
import {
  countryRules,
  downloadTextFile,
  generatePhoneNumbers,
  isValidGenerateParam,
} from "../helper";
import SelectCountry from "../components/countrySelect";

export default function Home() {
  const { t } = useLanguage();
  const { showAlert } = useAlert();
  const [countryCode, setCountryCode] = useState("");
  const [middleCode, setMiddleCode] = useState(new Set());
  const [middleCodeList, setMiddleCodeList] = useState([]);
  const [amount, setAmount] = useState(200000);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMiddleCodeList(countryRules[countryCode]?.segments);
    setMiddleCode(new Set());
  }, [countryCode]);

  const handleChangeFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleGenerate = async () => {
    const validErrorMsg = isValidGenerateParam(amount, countryCode, middleCode);
    if (validErrorMsg) {
      showAlert(validErrorMsg);
      return;
    }
    try {
      setIsLoading(true);
      const result = await generatePhoneNumbers({
        file,
        amount,
        middleCode,
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
          {middleCodeList && middleCodeList.length > 0 && (
            <Menu
              variant="static"
              dismiss={{
                itemPress: false,
              }}
              className="w-full"
              label={t("middleCode")}
            >
              <MenuHandler>
                <Button className="w-full" variant="text">
                  {t("selectMiddleCode")}
                </Button>
              </MenuHandler>
              <MenuList className="grid grid-cols-6">
                <MenuItem className="p-0 col-span-6">
                  <label
                    htmlFor="item-all"
                    className="flex cursor-pointer items-center gap-2 p-2"
                  >
                    <Checkbox
                      ripple={false}
                      id="item-all"
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        if (isChecked) {
                          setMiddleCode(new Set(middleCodeList));
                        } else {
                          setMiddleCode(new Set());
                        }
                      }}
                      containerProps={{ className: "p-0" }}
                      className="hover:before:content-none"
                    />
                    Select All
                  </label>
                </MenuItem>
                {middleCodeList.map((option, index) => (
                  <MenuItem className="p-0" key={index}>
                    <label
                      htmlFor={`item-${index}`}
                      className="flex cursor-pointer items-center gap-2 p-2"
                    >
                      <Checkbox
                        ripple={false}
                        checked={middleCode.has(option)}
                        id={`item-${index}`}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          if (isChecked) {
                            setMiddleCode((prev) => {
                              const newSet = new Set(prev);
                              newSet.add(option);
                              return newSet;
                            });
                          } else {
                            setMiddleCode((prev) => {
                              const newSet = new Set(prev);
                              newSet.delete(option);
                              return newSet;
                            });
                          }
                        }}
                        containerProps={{ className: "p-0" }}
                        className="hover:before:content-none"
                      />
                      {option}
                    </label>
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          )}
        </div>
        <div className="flex gap-4">
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
          <Input
            type="file"
            variant="static"
            className="file:hidden"
            label={t("uploadCompareFiles")}
            onChange={handleChangeFile}
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
