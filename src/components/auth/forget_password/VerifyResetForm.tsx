import React from "react";
import { useNavigate } from "react-router";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../../ui/input-otp";
import {
  requestPasswordReset,
  verifyResetCode,
  getErrorMessage,
} from "../../../lib/api/auth";
import { usePasswordResetStore } from "../../../store/usePasswordResetStore";

const OTP_LENGTH = 6;

const VerifyResetForm = () => {
  const navigate = useNavigate();
  const phone = usePasswordResetStore((state) => state.phone);
  const phone_country = usePasswordResetStore((state) => state.phone_country);
  const step = usePasswordResetStore((state) => state.step);
  const resetToken = usePasswordResetStore((state) => state.resetToken);
  const setResetToken = usePasswordResetStore((state) => state.setResetToken);
  const setStep = usePasswordResetStore((state) => state.setStep);

  const [code, setCode] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [isVerifying, setIsVerifying] = React.useState(false);
  const [isResending, setIsResending] = React.useState(false);

  React.useEffect(() => {
    const handler = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue =
        "Are you sure you want to refresh? You will need to restart verification.";
      return event.returnValue;
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, []);

  const phoneSuffix = React.useMemo(() => {
    if (!phone) return "***";
    return phone.slice(-4).padStart(4, "*");
  }, [phone]);

  // Guard: require phone info from previous step
  React.useEffect(() => {
    const nav = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;
    if (nav?.type === "reload") {
      usePasswordResetStore.getState().clear();
      navigate("/forget_password", { replace: true });
      return;
    }

    if (!phone || !phone_country || step === "request") {
      navigate("/forget_password", { replace: true });
      return;
    }

    if (step === "reset") {
      if (resetToken) {
        navigate("/reset_password", { replace: true });
        return;
      }

      // Token missing while step says reset: fall back to verify state
      setStep("verify");
    }
  }, [navigate, phone, phone_country, resetToken, setStep, step]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (code.trim().length !== OTP_LENGTH) {
      setError(`Please enter the ${OTP_LENGTH}-digit code`);
      return;
    }

    setIsVerifying(true);

    try {
      const response = await verifyResetCode({
        code,
        phone,
        phone_country,
        type: "reset",
      });

      setResetToken(response.reset_token);
      setStep("reset");
      navigate("/reset_password");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    setError(null);
    setIsResending(true);
    try {
      await requestPasswordReset({
        phone,
        phone_country,
        reset_type: "sms",
      });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-[#192540] text-[40px] font-medium text-center">
        Enter Verification Code
      </h2>
      <p className="text-[#717171] text-base font-medium mt-3 leading-[150%] text-center">
        We&apos;ve sent a {OTP_LENGTH}-digit code to your phone ending with{" "}
        {phoneSuffix}. Enter it below to continue.
      </p>

      <form className="mt-6" onSubmit={handleSubmit}>
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <div className="flex flex-col items-center gap-4">
          <label className="text-[#192540] text-xl font-medium leading-[100%]">
            Verification Code
          </label>
          <InputOTP
            maxLength={OTP_LENGTH}
            value={code}
            onChange={setCode}
            containerClassName="justify-center"
            className="text-lg"
            disabled={isVerifying}
          >
            <InputOTPGroup>
              {Array.from({ length: OTP_LENGTH }).map((_, idx) => (
                <InputOTPSlot
                  key={idx}
                  index={idx}
                  className="h-14 w-12 text-lg"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        <button
          type="submit"
          disabled={isVerifying}
          className="w-full h-14 text-[#192540] text-base font-semibold bg-[#EBAF29] rounded-md mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isVerifying ? "Verifying..." : "Verify Code"}
        </button>

        <div className="mt-4 text-center">
          <p className="text-[#717171] text-sm font-medium">
            Didn’t receive the code?
          </p>
          <button
            type="button"
            onClick={handleResend}
            disabled={isResending || isVerifying}
            className="text-[#EBAF29] text-base font-semibold mt-2 underline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isResending ? "Resending..." : "Resend Code"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VerifyResetForm;
