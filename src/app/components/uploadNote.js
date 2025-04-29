import { useLanguage } from "../../../context/LanguageProvider";

const { Typography } = require("@material-tailwind/react");

const UploadNote = () => {
  const { t } = useLanguage();
  if (!t) return <p className="text-white">Loading translations...</p>;

  return (
    <div className="flex flex-col gap-2 text-gray-500">
      <Typography variant="small">{t("uploadNote1")}</Typography>
      <Typography variant="small">{t("uploadNote2")}</Typography>
      <Typography variant="small">{t("uploadNote3")}</Typography>
      <Typography variant="small">{t("uploadNote4")}</Typography>
    </div>
  );
};

export default UploadNote;
