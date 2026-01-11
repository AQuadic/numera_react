import { useTranslation } from "react-i18next";

const FavEmpty = () => {
  const { t } = useTranslation("profile");

  return (
    <div className="flex flex-col items-center justify-center">
      <img src="/images/no_fav.png" alt="no fav" />

      <p className="text-[#192540] text-xl font-medium mt-8">
        {t("no_favorites")}
      </p>
    </div>
  );
};

export default FavEmpty;
