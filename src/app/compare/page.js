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
import CompareNote from "../components/compareNode";

export default function Home() {
  const { t } = useLanguage();
  const { showAlert } = useAlert();
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeFile1 = (e) => {
    setFile1(e.target.files[0]);
  };

  const handleChangeFile2 = (e) => {
    setFile2(e.target.files[0]);
  };

  const handleCompare = async () => {
    if (!file1 || !file2) {
      showAlert("请选择所有文件");
      return;
    }
    try {
      const text1 = await file1.text();
      const text2 = await file2.text();

      const lines1 = text1
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean);
      const lines2 = new Set(
        text2
          .split(/\r?\n/)
          .map((line) => line.trim())
          .filter(Boolean)
      );

      const filtered = lines1.filter((line) => !lines2.has(line));

      const blob = new Blob([filtered.join("\n")], { type: "text/plain" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "filtered_file.txt";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log("error while compare", error);
      showAlert("比较两个文件时发生错误");
    } finally {
      setIsLoading(false);
    }
  };

  if (!t) return <p className="text-white">Loading translations...</p>;
  return (
    <div className="w-full h-full bg-white">
      <div className="w-full p-4">
        <Typography variant="h6">{t("addCompareTask")}</Typography>
      </div>
      <hr />
      <div className="w-full mt-4 p-4 flex flex-col gap-12">
        <div className="flex justify-between items-center gap-4">
          <Input
            type="file"
            accept=".txt"
            variant="static"
            className="file:hidden"
            label={t("uploadCompareFiles")}
            onChange={handleChangeFile1}
          />
          <Input
            type="file"
            accept=".txt"
            variant="static"
            className="file:hidden"
            label={t("uploadCompareFiles")}
            onChange={handleChangeFile2}
          />
        </div>
        <div>
          <Button color="red" loading={isLoading} onClick={handleCompare}>
            {t("submit")}
          </Button>
        </div>
        <CompareNote />
      </div>
    </div>
  );
}
