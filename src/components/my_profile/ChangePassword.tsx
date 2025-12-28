import { useState } from "react";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { changePassword } from "../../lib/api/auth";

const ChangePassword = () => {

    const { t } = useTranslation("profile");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!currentPassword || !newPassword || !confirmPassword) {
        toast.error(t("errors_all_fields_required"));
        return;
        }

        if (newPassword !== confirmPassword) {
        toast.error(t("errors_password_mismatch"));
        return;
        }

        if (newPassword.length < 6) {
        toast.error(t("errors_password_min_length"));
        return;
        }

        setIsLoading(true);

        try {
        await changePassword({
            current_password: currentPassword,
            password: newPassword,
            password_confirmation: confirmPassword,
        });
        // Success toast is handled by axios interceptor if API returns message
        // Otherwise show our own
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        } catch {
        // Error toast is handled by axios interceptor
        } finally {
        setIsLoading(false);
        }
    };
    return (
        <div className="py-10">
            <h2 className="text-[#192540] text-2xl font-medium mb-12">{t("change_password")}</h2>
            <form onSubmit={handleChangePassword} autoComplete="off">
                <div className="px-2">
                  <label
                    htmlFor="current_password"
                    className="text-[#192540] text-xl font-medium"
                  >
                    {t("current_password")}
                  </label>
                  <input
                    type="password"
                    id="current_password"
                    name="current_password"
                    autoComplete="current-password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full h-12 border rounded-md mt-2 px-2"
                    placeholder={t("enter_current_password")}
                  />
                </div>

                <div className="px-2 mt-4">
                  <label
                    htmlFor="new_password"
                    className="text-[#192540] text-xl font-medium"
                  >
                    {t("new_password")}
                  </label>
                  <input
                    type="password"
                    id="new_password"
                    name="new_password"
                    autoComplete="new-password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full h-12 border rounded-md mt-2 px-2"
                    placeholder={t("enter_new_password")}
                  />
                </div>

                <div className="px-2 mt-4">
                  <label
                    htmlFor="confirm_password"
                    className="text-[#192540] text-xl font-medium"
                  >
                    {t("confirm_new_password")}
                  </label>
                  <input
                    type="password"
                    id="confirm_password"
                    name="confirm_password"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full h-12 border rounded-md mt-2 px-2"
                    placeholder={t("enter_confirm_new_password")}
                  />
                </div>

                <div className="px-2 mt-6">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-[#EBAF29] rounded-md text-[#192540] text-base font-semibold cursor-pointer hover:bg-[#d9a025] transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? t("saving") : t("save_changes")}
                  </button>
                </div>
              </form>
        </div>
    )
}

export default ChangePassword
