import { useTranslation } from "react-i18next";
import Bell from "../icons/header/Bell"
import Language from "../icons/profile/Language"
import { Switch } from "../ui/switch"

const Settings = () => {
    const { t } = useTranslation("profile");
    return (
        <div className="py-17">
            <h2 className="text-[#192540] text-2xl font-medium">
                {t("app_setting")}
            </h2>

            <div className="w-full py-4 px-6 border border-[#F0F0F0] rounded-md mt-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Language />
                    <p className="text-[#192540] text-base font-medium">
                        {t("setting_language")}
                    </p>
                </div>
                <p className="text-[#717171] text-base">
                    {t("setting_language_value")}
                </p>
            </div>

            <div className="w-full py-4 px-6 border border-[#F0F0F0] rounded-md mt-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Bell />
                    <p className="text-[#192540] text-base font-medium">
                        {t("setting_notification")}
                    </p>
                </div>
                <Switch />
            </div>
        </div>
    )
}

export default Settings
