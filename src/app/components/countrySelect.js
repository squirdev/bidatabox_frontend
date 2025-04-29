import { Option, Select } from "@material-tailwind/react";
import { useLanguage } from "../../../context/LanguageProvider";
import { countryRules } from "../helper";

const SelectCountry = ({ code, setCode }) => {
  const { t } = useLanguage();
  if (!t) return <p className="text-white">Loading translations...</p>;

  return (
    <Select
      variant="static"
      label={t("countryCode")}
      onChange={(e) => setCode(e)}
    >
      {Object.entries(countryRules).map(([code, { country }]) => (
        <Option key={code} value={code}>
          +{code}-{country}
        </Option>
      ))}
    </Select>
  );
};

export default SelectCountry;
