import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import homeEn from "./locales/en/home.json";
import homeAr from "./locales/ar/home.json";
import authEn from "./locales/en/auth.json";
import authAr from "./locales/ar/auth.json";
import faqEn from "./locales/en/faq.json";
import faqAr from "./locales/ar/faq.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        home: homeEn,
        auth: authEn,
        faq: faqEn,
      },
      ar: {
        home: homeAr,
        auth: authAr,
        faq: faqAr,
      },
    },
    lng: "en",
    fallbackLng: "en",
    defaultNS: "home",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

i18n.on("languageChanged", (lng) => {
  document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
  document.documentElement.lang = lng;
});

export default i18n;
