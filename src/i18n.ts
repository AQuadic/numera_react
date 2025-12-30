import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import homeEn from "./locales/en/home.json";
import homeAr from "./locales/ar/home.json";
import authEn from "./locales/en/auth.json";
import authAr from "./locales/ar/auth.json";
import profileEn from "./locales/en/profile.json";
import profileAr from "./locales/ar/profile.json";
import contactEn from "./locales/en/contact.json";
import contactAr from "./locales/ar/contact.json";
import faqEn from "./locales/en/faq.json";
import faqAr from "./locales/ar/faq.json";
import drawEn from "./locales/en/draw.json";
import drawAr from "./locales/ar/draw.json";
import platesEn from "./locales/en/plates.json";
import platesAr from "./locales/ar/plates.json";
import simsEn from "./locales/en/sims.json";
import simsAr from "./locales/ar/sims.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        home: homeEn,
        auth: authEn,
        profile: profileEn,
        contact: contactEn,
        draw: drawEn,
        plates: platesEn,
        sims: simsEn,
        faq: faqEn,
      },
      ar: {
        home: homeAr,
        auth: authAr,
        profile: profileAr,
        contact: contactAr,
        draw: drawAr,
        plates: platesAr,
        sims: simsAr,
        faq: faqAr,
      },
    },

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
