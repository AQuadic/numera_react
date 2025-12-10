import React from "react";
import { useNavigate } from "react-router";
import { resetPasswordWithToken, getErrorMessage } from "../../../lib/api/auth";
import { usePasswordResetStore } from "../../../store/usePasswordResetStore";

const ResetPassForm = () => {
  const navigate = useNavigate();
  const phone = usePasswordResetStore((state) => state.phone);
  const phone_country = usePasswordResetStore((state) => state.phone_country);
  const resetToken = usePasswordResetStore((state) => state.resetToken);
  const step = usePasswordResetStore((state) => state.step);
  const setStep = usePasswordResetStore((state) => state.setStep);
  const clearResetState = usePasswordResetStore((state) => state.clear);

  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    const handler = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue =
        "Are you sure you want to refresh? You will restart from the first step.";
      return event.returnValue;
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, []);

  // Guard: require valid reset token
  React.useEffect(() => {
    const nav = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;
    if (nav?.type === "reload") {
      usePasswordResetStore.getState().clear();
      navigate("/forget_password", { replace: true });
      return;
    }

    if (!phone || !phone_country) {
      navigate("/forget_password", { replace: true });
      return;
    }

    if (!resetToken) {
      if (step !== "verify") {
        setStep("verify");
      }
      navigate("/verify_reset", { replace: true });
    }
  }, [navigate, phone, phone_country, resetToken, setStep, step]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!password || !confirmPassword) {
      setError("Please fill out both password fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!resetToken) {
      setError("Reset token is missing. Please restart the flow.");
      navigate("/forget_password", { replace: true });
      return;
    }

    setIsSubmitting(true);

    try {
      await resetPasswordWithToken({
        password,
        password_confirmation: confirmPassword,
        reset_token: resetToken,
        phone,
        phone_country,
      });

      clearResetState();
      navigate("/signin", { replace: true });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-[#192540] text-[40px] font-medium text-center">
        Reset Password
      </h2>
      <p className="text-[#717171] text-base font-medium mt-3 leading-[150%] text-center">
        Please enter your new password.
      </p>

      <form className="mt-6" onSubmit={handleSubmit}>
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <div className="mt-6">
          <label
            htmlFor="password"
            className="text-[#192540] text-xl font-medium leading-[100%]"
          >
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-14 border border-[#F0F0F0] rounded-md mt-3 px-3 placeholder:text-sm placeholder:font-medium"
            placeholder="Enter your password"
            disabled={isSubmitting}
          />
        </div>

        <div className="mt-6">
          <label
            htmlFor="confirm_password"
            className="text-[#192540] text-xl font-medium leading-[100%]"
          >
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full h-14 border border-[#F0F0F0] rounded-md mt-3 px-3 placeholder:text-sm placeholder:font-medium"
            placeholder="Confirm your password"
            disabled={isSubmitting}
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-14 text-[#192540] text-base font-semibold bg-[#EBAF29] rounded-md mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Updating..." : "Confirm"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassForm;
