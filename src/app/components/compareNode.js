import { useLanguage } from "../../../context/LanguageProvider";

const { Typography } = require("@material-tailwind/react");

const CompareNote = () => {
  const { t } = useLanguage();
  if (!t) return <p className="text-white">Loading translations...</p>;

  return (
    <div className="flex flex-col gap-1 text-gray-500">
      <Typography variant="small">{t("compareNote1")}</Typography>
      <Typography variant="small">{t("compareNote2")}</Typography>
      <Typography variant="small">{t("compareNote3")}</Typography>
    </div>
  );
};

export default CompareNote;
