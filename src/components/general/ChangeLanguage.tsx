"use client";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

interface Props {
  isHome?: boolean;
}

const ChangeLanguage = ({ isHome = false }: Props) => {
  const { i18n } = useTranslation();
  const isEnglish = i18n.language === "en";

  useEffect(() => {
    const currentLang = i18n.language;
    document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = currentLang;
  }, [i18n.language]);

  const handleChangeLanguage = () => {
    const newLang = isEnglish ? "ar" : "en";
    i18n.changeLanguage(newLang);
    
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = newLang;
    
    localStorage.setItem("preferredLanguage", newLang);
  };

  return (
    <button
      onClick={handleChangeLanguage}
      className="flex items-center justify-center gap-2 transition-colors duration-300 hover:opacity-80"
      aria-label={isEnglish ? "Switch to Arabic" : "Switch to English"}
    >
      <span
        className={`${
          isHome ? "text-white" : "text-foreground"
        } transition-colors duration-300 font-medium cursor-pointer`}
      >
        <div className="w-[50px] h-[50px] border border-[#192540] rounded-full flex items-center justify-center">
          <p className="text-[#192540] text-lg font-semibold">
            {isEnglish ? "EN" : "AR"}
          </p>
        </div>
      </span>
    </button>
  );
};

export default ChangeLanguage;
