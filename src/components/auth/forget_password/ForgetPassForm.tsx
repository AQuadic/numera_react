import React from "react";
import { useNavigate } from "react-router";
import { PhoneInput, type PhoneValue } from "../../compound/PhoneInput";
import { requestPasswordReset, getErrorMessage } from "../../../lib/api/auth";
import { usePasswordResetStore } from "../../../store/usePasswordResetStore";

const ForgetPassForm = () => {
  const navigate = useNavigate();
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

  React.useEffect(() => {
    // Fresh flow each time the screen opens
    setStep("request");
    setResetToken(null);
  }, [setResetToken, setStep]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!phone.number.trim()) {
      setError("Please enter your phone number");
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
      });

      // Prepare next step state
      setPhoneAndCountry(cleanedPhone, phone.code.toUpperCase());
      setResetToken(null);
      setStep("verify");
      navigate("/verify_reset");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-[#192540] text-[40px] font-medium text-center">
        Forget Password
      </h2>
      <p className="text-[#717171] text-base font-medium mt-3 leading-[150%] text-center">
        Enter your phone number to receive an OTP and reset your password.
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
            Phone Number
          </label>

          <div className="mt-3">
            <PhoneInput
              value={phone}
              onChange={(newValue) => setPhone(newValue)}
              disabled={isLoading}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-14 text-[#192540] text-base font-semibold bg-[#EBAF29] rounded-md mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Sending..." : "Send OTP"}
        </button>
      </form>
    </div>
  );
};

export default ForgetPassForm;
