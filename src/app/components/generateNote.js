import { useLanguage } from "../../../context/LanguageProvider";

const { Typography } = require("@material-tailwind/react");

const GenerateNote = () => {
  const { t } = useLanguage();
  if (!t) return <p className="text-white">Loading translations...</p>;

  return (
    <div className="flex flex-col gap-1 text-gray-500">
      <Typography variant="small">{t("generateNote1")}</Typography>
      <Typography variant="small">{t("generateNote2")}</Typography>
      <Typography variant="small">{t("generateNote3")}</Typography>
    </div>
  );
};

export default GenerateNote;
