import React from "react";
import { Link, useNavigate, useLocation } from "react-router";
import type { Location } from "react-router";
import { useTranslation } from "react-i18next";
import { PhoneInput, type PhoneValue } from "../../compound/PhoneInput";
import { signUp, getErrorMessage } from "../../../lib/api/auth";
import { useAuthStore } from "../../../store/useAuthStore";
import { Eye, EyeOff, type EyeClosed } from "lucide-react";
// Send phone and phone_country separately (number-only in phone)

const SignUpForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation("auth");
  const setUser = useAuthStore((state) => state.setUser);

  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState<PhoneValue>({
    code: "EG",
    number: "",
  });
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!name.trim()) {
      setError(t("signUp.errors.nameRequired"));
      return;
    }

    if (!phone.number.trim()) {
      setError(t("signUp.errors.phoneRequired"));
      return;
    }

    if (!password) {
      setError(t("signUp.errors.passwordRequired"));
      return;
    }

    if (password.length < 6) {
      setError(t("signUp.errors.passwordMinLength"));
      return;
    }

    if (password !== confirmPassword) {
      setError(t("signUp.errors.passwordsDoNotMatch"));
      return;
    }

    setIsLoading(true);

    try {
      // Prepare phone number (digits only, no dial code)
      const rawNumber = phone.number.replaceAll(/\D/g, "").replace(/^0+/, "");

      const response = await signUp({
        name: name.trim(),
        phone: rawNumber,
        phone_country: phone.code.toUpperCase(),
        password,
        password_confirmation: confirmPassword,
      });

      const authedUser = response.user;

      if (authedUser) {
        // API already returns user+token; trust the payload
        setUser(authedUser);
        const from =
          (location.state as { from?: Location } | null)?.from?.pathname || "/";
        navigate(from, { replace: true });
      } else {
        setError(t("signUp.errors.signUpFailed"));
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-[#192540] text-[40px] font-medium text-center">
        {t("signUp.title")}
      </h2>
      <p className="text-[#717171] text-base font-medium mt-3 leading-[150%] text-center">
        {t("signUp.subtitle")}
      </p>

      <form className="mt-6" onSubmit={handleSubmit}>
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <div className="mb-6">
          <label
            htmlFor="name"
            className="text-[#192540] text-xl font-medium leading-[100%]"
          >
            {t("signUp.nameLabel")}
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-14 border border-[#F0F0F0] rounded-md mt-3 px-3 placeholder:text-sm placeholder:font-medium"
            placeholder={t("signUp.namePlaceholder")}
            disabled={isLoading}
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="text-[#192540] text-xl font-medium leading-[100%]"
          >
            {t("signUp.phoneLabel")}
          </label>

          <div className="mt-3">
            <PhoneInput
              value={phone}
              onChange={(newValue) => setPhone(newValue)}
            />
          </div>
        </div>

        <div className="mt-6">
          <label
            htmlFor="password"
            className="text-[#192540] text-xl font-medium leading-[100%]"
          >
            {t("signUp.passwordLabel")}
          </label>

          <div className="relative mt-3">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-14 border border-[#F0F0F0] rounded-md px-3 pr-12 placeholder:text-sm placeholder:font-medium"
              placeholder={t("signUp.passwordPlaceholder")}
              disabled={isLoading}
            />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute ltr:right-3 rtl:left-3 top-1/2 -translate-y-1/2 text-[#717171] hover:text-[#192540]"
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
          </div>
        </div>

        <div className="mt-6">
          <label
            htmlFor="confirmPassword"
            className="text-[#192540] text-xl font-medium leading-[100%]"
          >
            {t("signUp.confirmPasswordLabel")}
          </label>

          <div className="relative mt-3">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full h-14 border border-[#F0F0F0] rounded-md px-3 pr-12 placeholder:text-sm placeholder:font-medium"
              placeholder={t("signUp.confirmPasswordPlaceholder")}
              disabled={isLoading}
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute ltr:right-3 rtl:left-3 top-1/2 -translate-y-1/2 text-[#717171] hover:text-[#192540]"
            >
              {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-14 text-[#192540] text-base font-semibold bg-[#EBAF29] rounded-md mt-6 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isLoading ? t("signUp.submitting") : t("signUp.submit")}
        </button>

        <div className="mt-4 flex items-center justify-center gap-2">
          <p className="text-[#717171] text-base font-medium">
            {t("signUp.alreadyHaveAccount")}
          </p>
          <Link to="/signin" className="text-[#EBAF29] text-lg font-semibold">
            {t("signUp.signInLink")}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
