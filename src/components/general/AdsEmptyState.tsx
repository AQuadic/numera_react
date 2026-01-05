import { useTranslation } from "react-i18next";

const AdsEmptyState = () => {
    const { t } = useTranslation("profile");
    return (
        <div className="flex flex-col items-center justify-center">
            <img 
                src="/images/ads_empty.png"
                alt="empty"
            />
            <p className="text-[#192540] text-base font-medium mt-10">
                {t('ads_list_empty')}
            </p>
        </div>
    )
}

export default AdsEmptyState
