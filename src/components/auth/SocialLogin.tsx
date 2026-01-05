import React from "react";
import { useNavigate, useLocation } from "react-router";
import type { Location } from "react-router";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, googleProvider } from "../../lib/firebase";
import { socialLogin, getErrorMessage } from "../../lib/api/auth";
import { useAuthStore } from "../../store/useAuthStore";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const SocialLogin = () => {
  const { t } = useTranslation("auth");
  const navigate = useNavigate();
  const location = useLocation();
  const setUser = useAuthStore((state) => state.setUser);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // The signed-in user info.
      // const user = result.user;
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;

      if (!token) {
        throw new Error("No access token returned from Google");
      }

      const response = await socialLogin({
        provider: "google",
        access_token: token,
      });

      const authedUser = response.user;

      if (authedUser) {
        setUser(authedUser);
        const from =
          (location.state as { from?: Location } | null)?.from?.pathname || "/";
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error(error);
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full mt-6">
      <div className="relative flex items-center justify-center mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#EAEAEA]"></div>
        </div>
        <span className="relative bg-white px-4 text-[#717171] text-sm font-medium">
          OR
        </span>
      </div>

      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={isLoading}
        className="w-full h-[56px] flex items-center justify-center gap-3 bg-white border border-[#EAEAEA] rounded-[12px] hover:bg-gray-50 transition-colors"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23.766 12.2764C23.766 11.4607 23.6999 10.6406 23.5588 9.83807H12.24V14.4591H18.7217C18.4528 15.9494 17.5885 17.2678 16.323 18.1056V21.1039H20.19C22.4608 19.0139 23.766 15.9274 23.766 12.2764Z"
            fill="#4285F4"
          />
          <path
            d="M12.2401 24.0008C15.4766 24.0008 18.2059 22.9382 20.1945 21.1039L16.3275 18.1055C15.2517 18.8375 13.8627 19.252 12.2445 19.252C9.11388 19.252 6.45946 17.1399 5.50705 14.3003H1.5166V17.3912C3.55371 21.4434 7.7029 24.0008 12.2401 24.0008Z"
            fill="#34A853"
          />
          <path
            d="M5.50253 14.3003C5.00236 12.8099 5.00236 11.1961 5.50253 9.70575V6.61481H1.51649C-0.18551 10.0056 -0.18551 14.0004 1.51649 17.3912L5.50253 14.3003Z"
            fill="#FBBC05"
          />
          <path
            d="M12.2401 4.74966C13.9509 4.7232 15.6044 5.36697 16.8434 6.54867L20.2695 3.12262C18.1001 1.0855 15.2208 -0.034466 12.2401 0.000808666C7.7029 0.000808666 3.55371 2.55822 1.5166 6.61481L5.50264 9.70575C6.45064 6.86173 9.10947 4.74966 12.2401 4.74966Z"
            fill="#EA4335"
          />
        </svg>
        <span className="text-[#192540] text-base font-medium">
          {t('continue_with_google')}
        </span>
      </button>
    </div>
  );
};

export default SocialLogin;
