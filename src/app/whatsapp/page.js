"use client";

import { useSelector } from "react-redux";
import { useLanguage } from "../../../context/LanguageProvider";
import BaseSocialAccountDetect from "../components/baseSocialAccountDetect";

export default function Home() {
  const { isAuth } = useSelector((state) => state.auth);
  const { t } = useLanguage();
  if (!t) return <p className="text-white">Loading translations...</p>;

  return <BaseSocialAccountDetect social="WS" icon="/social/whatsapp.png" />;
}
