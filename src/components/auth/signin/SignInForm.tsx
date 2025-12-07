import React from "react";
import { Link, useNavigate, useLocation } from "react-router";
import type { Location } from "react-router";
import { PhoneInput, type PhoneValue } from "../../compound/PhoneInput";
import { login, getErrorMessage } from "../../../lib/api/auth";
import { useAuthStore } from "../../../store/useAuthStore";
// country lookup not needed here — we send iso2 separately

const SignInForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const setUser = useAuthStore((state) => state.setUser);

  const [phone, setPhone] = React.useState<PhoneValue>({
    code: "EG",
    number: "",
  });
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!phone.number.trim()) {
      setError("Please enter your phone number");
      return;
    }

    if (!password) {
      setError("Please enter your password");
      return;
    }

    setIsLoading(true);

    try {
      // Get country dial code and format phone number
      // Prepare phone number: number-only (strip non-digits and leading zeros)
      const rawNumber = phone.number.replaceAll(/\D/g, "").replace(/^0+/, "");
      const response = await login({
        phone: rawNumber,
        phone_country: phone.code.toUpperCase(),
        password,
      });

      const authedUser = response.user;

      if (authedUser) {
        // We already got user+token from the API; store user and go
        setUser(authedUser);
        const from =
          (location.state as { from?: Location } | null)?.from?.pathname || "/";
        navigate(from, { replace: true });
      } else {
        setError(
          "Login succeeded but no user payload was returned. Please try again."
        );
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
        Sign In
      </h2>
      <p className="text-[#717171] text-base font-medium mt-3 leading-[150%] text-center">
        Join now and design your custom plate
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
            />
          </div>
        </div>

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
            disabled={isLoading}
          />
        </div>

        <div className="mt-3 text-end">
          <Link
            to="/forget_password"
            className="text-[#717171] text-lg font-medium"
          >
            Forget Password ?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-14 text-[#192540] text-base font-semibold bg-[#EBAF29] rounded-md mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </button>

        <div className="mt-4 flex items-center justify-center gap-2">
          <p className="text-[#717171] text-base font-medium">
            Don't have an account ?
          </p>
          <Link to="/signup" className="text-[#EBAF29] text-lg font-semibold">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
