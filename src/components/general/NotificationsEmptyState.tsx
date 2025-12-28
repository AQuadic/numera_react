import { useTranslation } from "react-i18next";

const NotificationsEmptyState = () => {
    const { t } = useTranslation("home");
    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <img 
                src="/images/no_notifications.png"
                alt={t("no_notifications_image_alt")}
            />
            <p className="text-[#192540] text-base font-medium mt-4">{t("no_notifications_yet")}</p>
        </div>
    )
}

export default NotificationsEmptyState
