import AppStore from "../icons/plates/AppStore";
import GooglePlay from "../icons/plates/GooglePlay";
import { useTranslation } from "react-i18next";

const DownloadApp = () => {
  const { t } = useTranslation("home");

  return (
    <div>
      <div className="flex items-center justify-between rtl:flex-row-reverse">
        <div className="flex-1">
          <h2 className="text-[#192540] md:text-[32px] font-medium md:px-8 px-2 text-left rtl:text-right">
            {t("downloadApp.title")}
          </h2>
          <p className="text-[#717171] md:text-xl font-medium mt-6 md:px-8 px-2 text-left rtl:text-right">
            {t("downloadApp.description")}
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start rtl:md:justify-end gap-6 md:px-8 px-2 mt-8">
            <a
              href="https://play.google.com/store/apps/details?id=ae.numra.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GooglePlay />
            </a>

            <a
              href="https://apps.apple.com/app/id6757126901"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AppStore />
            </a>
          </div>
        </div>

        <div className="">
          <img src="/images/getApp.png" alt="get app" />
        </div>
      </div>
    </div>
  );
};

export default DownloadApp;
