import { Option, Select } from "@material-tailwind/react";
import { useLanguage } from "../../../context/LanguageProvider";
import { countryRules } from "../helper";

import allCountries from "country-telephone-data";
import { useState } from "react";

const countryNameCN = {
  CN: "中国",
  US: "美国",
  JP: "日本",
  SG: "新加坡",
};

const countries = allCountries.allCountries.map((c) => ({
  code: c.iso2.toUpperCase(),
  phone: `+${c.dialCode}`,
  name: {
    en: c.name,
    ch: countryNameCN[c.iso2.toUpperCase()] || c.name,
  },
}));

const SelectCountryTEMp = ({ code, setCode }) => {
  const { t, locale } = useLanguage();
  if (!t) return <p className="text-white">Loading translations...</p>;

  const [selectedCode, setSelectedCode] = useState(countries[0].code);

  const handleChange = (e) => {
    setSelectedCode(e.target.value);
  };

  const selectedCountry = countries.find((c) => c.code === selectedCode);

  return (
    <Select variant="static" value={selectedCode} onChange={handleChange}>
      {countries.map(({ code, phone, name }) => (
        <Option key={code} value={code}>
          {phone} {name[locale]}
        </Option>
      ))}
    </Select>
  );
};

export default SelectCountryTEMp;
