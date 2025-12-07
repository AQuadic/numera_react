import React from "react";
import { Link, useNavigate, useLocation } from "react-router";
import type { Location } from "react-router";
import { PhoneInput, type PhoneValue } from "../../compound/PhoneInput";
import { signUp, getErrorMessage } from "../../../lib/api/auth";
import { useAuthStore } from "../../../store/useAuthStore";
// Send phone and phone_country separately (number-only in phone)

const SignUpForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }

    if (!phone.number.trim()) {
      setError("Please enter your phone number");
      return;
    }

    if (!password) {
      setError("Please enter a password");
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
        setError(
          "Sign up succeeded but no user payload was returned. Please try again."
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
        Sign Up
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

        <div className="mb-6">
          <label
            htmlFor="name"
            className="text-[#192540] text-xl font-medium leading-[100%]"
          >
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-14 border border-[#F0F0F0] rounded-md mt-3 px-3 placeholder:text-sm placeholder:font-medium"
            placeholder="Enter your name"
            disabled={isLoading}
          />
        </div>

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

        <div className="mt-6">
          <label
            htmlFor="confirmPassword"
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
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-14 text-[#192540] text-base font-semibold bg-[#EBAF29] rounded-md mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Signing up..." : "Sign up"}
        </button>

        <div className="mt-4 flex items-center justify-center gap-2">
          <p className="text-[#717171] text-base font-medium">
            Already have an account ?
          </p>
          <Link to="/signin" className="text-[#EBAF29] text-lg font-semibold">
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
