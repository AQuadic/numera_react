"use client";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

interface Props {
  isHome?: boolean;
}

const ChangeLanguage = ({ isHome = false }: Props) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language.split("-")[0]; // Get base language 'en' or 'ar'
  const isArabic = currentLang === "ar";

  useEffect(() => {
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
    document.documentElement.lang = currentLang;
  }, [currentLang, isArabic]);

  const handleChangeLanguage = () => {
    const newLang = isArabic ? "en" : "ar";
    i18n.changeLanguage(newLang);

    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = newLang;

    localStorage.setItem("i18nextLng", newLang);
  };

  return (
    <button
      onClick={handleChangeLanguage}
      className="flex items-center justify-center gap-2 transition-colors duration-300 hover:opacity-80"
      aria-label={isArabic ? "Switch to English" : "Switch to Arabic"}
    >
      <span
        className={`${
          isHome ? "text-white" : "text-foreground"
        } transition-colors duration-300 font-medium cursor-pointer`}
      >
        <div className="w-[50px] h-[50px] border border-[#192540] rounded-full flex items-center justify-center">
          <p className="text-[#192540] text-lg font-semibold uppercase">
            {currentLang}
          </p>
        </div>
      </span>
    </button>
  );
};

export default ChangeLanguage;
