"use client";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import Language from "../icons/profile/Language";

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
      <img
        src={
          isHome
            ? "/layout/language_white.svg"
            : "/layout/language_black.svg"
        }
        alt=""
        className="transition-opacity duration-300 w-5 h-5"
        aria-hidden="true"
      />
      <span
        className={`${
          isHome ? "text-white" : "text-foreground"
        } transition-colors duration-300 font-medium cursor-pointer`}
      >
        <Language />
      </span>
    </button>
  );
};

export default ChangeLanguage;
