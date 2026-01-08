import { useTranslation } from "react-i18next";
import Bell from "../icons/header/Bell";
import Language from "../icons/profile/Language";
import { Switch } from "../ui/switch";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerDevice } from "../../lib/api/notifications/registerDevice";
import { requestForToken } from "../../lib/firebase";
import { getDeviceId } from "../../lib/utils";
import { useAuthStore } from "../../store/useAuthStore";

const Settings = () => {
  const { t } = useTranslation("profile");
  const user = useAuthStore((state) => state.user);
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    localStorage.getItem("is_notifications_enabled") === "true"
  );

  const mutation = useMutation({
    mutationFn: registerDevice,
    onSuccess: (_, variables) => {
      if (user) {
        const storageKey = `fcm_registered_${user.id || user.email}`;
        localStorage.setItem(storageKey, variables.notifiable_id);
      }
    },
  });

  const handleToggle = async (checked: boolean) => {
    setNotificationsEnabled(checked);
    localStorage.setItem("is_notifications_enabled", String(checked));
    const token = await requestForToken();
    if (token) {
      mutation.mutate({
        device_type: "web",
        device_token: getDeviceId(),
        device_name: window.navigator.userAgent,
        app_id: "user",
        notifiable_type: "firebase",
        notifiable_id: token,
        enabled: checked,
      });
    }
  };

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
        <Switch
          checked={notificationsEnabled}
          onCheckedChange={handleToggle}
          disabled={mutation.isPending}
        />
      </div>
    </div>
  );
};

export default Settings;
