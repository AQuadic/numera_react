import React from "react";
import { useNavigate, useLocation } from "react-router";
import type { Location } from "react-router";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, googleProvider } from "../../lib/firebase";
import { socialLogin, getErrorMessage } from "../../lib/api/auth";
import { useAuthStore } from "../../store/useAuthStore";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

// Apple Sign In types
declare global {
  interface Window {
    AppleID?: {
      auth: {
        init: (config: any) => void;
        signIn: () => Promise<any>;
      };
    };
  }
}

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

  // Initialize Apple Sign In when component mounts
  React.useEffect(() => {
    if (window.AppleID) {
      try {
        const baseURL =
          import.meta.env.VITE_API_BASE_URL || "https://numra.motofy.io/api";
        window.AppleID.auth.init({
          clientId: "ae.numra.apple",
          scope: "email name",
          redirectURI: `${baseURL}/auth/apple/callback`,
          usePopup: true,
        });
      } catch (error) {
        console.error("Failed to initialize Apple Sign In:", error);
      }
    }
  }, []);

  const handleAppleLogin = async () => {
    setIsLoading(true);
    try {
      if (!window.AppleID) {
        throw new Error("Apple Sign In SDK not loaded");
      }

      // Add event listener for Apple Sign In response
      const handleAppleResponse = async (event: any) => {
        try {
          const response = event.detail;
          const { id_token } = response.authorization;

          if (!id_token) {
            throw new Error("No id_token returned from Apple");
          }

          const responseData = await socialLogin({
            provider: "apple",
            access_token: id_token,
          });

          const authedUser = responseData.user;

          if (authedUser) {
            setUser(authedUser);
            const from =
              (location.state as { from?: Location } | null)?.from?.pathname ||
              "/";
            navigate(from, { replace: true });
          }
        } catch (error) {
          console.error(error);
          toast.error(getErrorMessage(error));
        } finally {
          setIsLoading(false);
          document.removeEventListener(
            "AppleIDSignInOnSuccess",
            handleAppleResponse
          );
        }
      };

      const handleAppleError = (event: any) => {
        console.error("Apple Sign In error:", event.detail);
        toast.error("Apple Sign In failed. Please try again.");
        setIsLoading(false);
        document.removeEventListener(
          "AppleIDSignInOnFailure",
          handleAppleError
        );
      };

      document.addEventListener("AppleIDSignInOnSuccess", handleAppleResponse);
      document.addEventListener("AppleIDSignInOnFailure", handleAppleError);

      await window.AppleID.auth.signIn();
    } catch (error) {
      console.error(error);
      toast.error(getErrorMessage(error));
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
          {t("or")}
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
          {t("continue_with_google")}
        </span>
      </button>

      <button
        type="button"
        onClick={handleAppleLogin}
        disabled={isLoading}
        className="w-full h-[56px] flex items-center justify-center gap-3 bg-white border border-[#EAEAEA] rounded-[12px] hover:bg-gray-50 transition-colors mt-3"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.8899 8.74706C19.159 9.13483 18.5583 9.72888 18.1623 10.4554C17.7664 11.1818 17.5927 12.0087 17.6629 12.8331C17.7175 13.6636 18.0035 14.4623 18.4884 15.1388C18.9734 15.8153 19.6379 16.3426 20.4069 16.6611C20.4106 16.6923 20.4106 16.7238 20.4069 16.7551C19.8795 18.278 19.0457 19.6768 17.9569 20.8651C17.5326 21.3884 16.9502 21.7602 16.2969 21.9251C15.8121 22.0092 15.3138 21.9686 14.8489 21.8071C14.3539 21.6541 13.8709 21.4541 13.3649 21.3121C12.4757 21.1012 11.5422 21.184 10.7039 21.5481C10.2746 21.7047 9.8386 21.8381 9.39593 21.9481C9.12869 22.009 8.85178 22.0143 8.58239 21.9637C8.313 21.9132 8.05688 21.8078 7.82993 21.6541C7.29235 21.3056 6.8151 20.8719 6.41693 20.3701C5.00376 18.6484 4.08042 16.5779 3.74393 14.3761C3.43775 12.8861 3.58938 11.3383 4.17893 9.93606C4.49685 9.15494 5.00498 8.46566 5.6571 7.9309C6.30922 7.39614 7.08467 7.03285 7.91293 6.87406C8.67337 6.72948 9.45883 6.79482 10.1849 7.06306L11.7399 7.59306C12.0129 7.69806 12.3149 7.69806 12.5879 7.59306C13.2467 7.33983 13.9191 7.12349 14.6019 6.94506C15.5158 6.68088 16.4871 6.69072 17.3955 6.97336C18.3038 7.256 19.1093 7.799 19.7119 8.53507L19.8899 8.74706Z"
            fill="#0A0A0A"
          />
          <path
            d="M16.1909 2C16.2575 2.61475 16.177 3.23651 15.9559 3.814C15.5485 4.86682 14.792 5.74791 13.8129 6.31C13.325 6.6004 12.7667 6.75122 12.1989 6.746C12.0459 6.746 12.0109 6.746 11.9989 6.546C11.9737 5.5645 12.2948 4.60546 12.9059 3.837C13.6467 2.85738 14.7414 2.20663 15.9559 2.024L16.1909 2Z"
            fill="#0A0A0A"
          />
        </svg>
        <span className="text-[#192540] text-base font-medium">
          {t("continue_with_apple")}
        </span>
      </button>
    </div>
  );
};

export default SocialLogin;
