import React from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { PhoneInput, type PhoneValue } from "../../compound/PhoneInput";
import { requestPasswordReset, getErrorMessage } from "../../../lib/api/auth";
import { usePasswordResetStore } from "../../../store/usePasswordResetStore";

const ForgetPassForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("auth");
  const setPhoneAndCountry = usePasswordResetStore(
    (state) => state.setPhoneAndCountry
  );
  const setStep = usePasswordResetStore((state) => state.setStep);
  const setResetToken = usePasswordResetStore((state) => state.setResetToken);

  const [phone, setPhone] = React.useState<PhoneValue>({
    code: "EG",
    number: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // New state and ref for reCAPTCHA
  const [captchaToken, setCaptchaToken] = React.useState<string | null>(null);
  const widgetIdRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    // Fresh flow each time the screen opens
    setStep("request");
    setResetToken(null);
    setCaptchaToken(null);

    const loadCaptcha = () => {
      // @ts-ignore
      if (window.grecaptcha?.enterprise) {
        // @ts-ignore
        window.grecaptcha.enterprise.ready(() => {
          const container = document.getElementById("recaptcha-container");
          if (container && !container.hasChildNodes()) {
            try {
              // @ts-ignore
              widgetIdRef.current = window.grecaptcha.enterprise.render(
                "recaptcha-container",
                {
                  sitekey: "6LfKH0gsAAAAALpAx8M4VCa8y_eGpOsoQ25X4jeB",
                  callback: (token: string) => setCaptchaToken(token),
                  "expired-callback": () => setCaptchaToken(null),
                }
              );
            } catch (e) {
              console.error("reCAPTCHA render error:", e);
            }
          }
        });
      }
    };

    const scriptId = "recaptcha-script";
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src =
        "https://www.google.com/recaptcha/enterprise.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.onload = loadCaptcha;
      document.head.appendChild(script);
    } else {
      loadCaptcha();
    }

    // Cleanup not strictly necessary for script, but could reset widget if needed
    return () => {
      // Optional cleanup
    };
  }, [setResetToken, setStep]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!phone.number.trim()) {
      setError(t("forgetPassword.errors.phoneRequired"));
      return;
    }

    if (!captchaToken) {
      setError("Please verify you are not a robot");
      return;
    }

    setIsLoading(true);

    try {
      const cleanedPhone = phone.number
        .replaceAll(/\D/g, "")
        .replace(/^0+/, "");

      await requestPasswordReset({
        phone: cleanedPhone,
        phone_country: phone.code.toUpperCase(),
        reset_type: "sms",
        recaptcha_token: captchaToken,
      });

      // Prepare next step state
      setPhoneAndCountry(cleanedPhone, phone.code.toUpperCase());
      setResetToken(null);
      setStep("verify");
      navigate("/verify_reset");
    } catch (err) {
      setError(getErrorMessage(err));
      // Reset captcha on error so user can try again
      // @ts-ignore
      if (window.grecaptcha?.enterprise && widgetIdRef.current !== null) {
        // @ts-ignore
        window.grecaptcha.enterprise.reset(widgetIdRef.current);
        setCaptchaToken(null);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-[#192540] text-[40px] font-medium text-center">
        {t("forgetPassword.title")}
      </h2>
      <p className="text-[#717171] text-base font-medium mt-3 leading-[150%] text-center">
        {t("forgetPassword.subtitle")}
      </p>

      <form className="mt-6" onSubmit={handleSubmit}>
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <div>
          <label
            htmlFor="phone"
            className="text-[#192540] text-xl font-medium leading-[100%]"
          >
            {t("forgetPassword.phoneLabel")}
          </label>

          <div className="mt-3">
            <PhoneInput
              value={phone}
              onChange={(newValue) => setPhone(newValue)}
              disabled={isLoading}
            />
          </div>
        </div>

        {/* reCAPTCHA Container */}
        <div className="mt-6 flex justify-center min-h-[78px]">
          <div id="recaptcha-container"></div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-14 text-[#192540] text-base font-semibold bg-[#EBAF29] rounded-md mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading
            ? t("forgetPassword.submitting")
            : t("forgetPassword.submit")}
        </button>
      </form>
    </div>
  );
};

export default ForgetPassForm;
