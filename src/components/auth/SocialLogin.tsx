import React from "react";
import { useNavigate, useLocation } from "react-router";
import type { Location } from "react-router";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, googleProvider } from "../../lib/firebase";
import { socialLogin, getErrorMessage } from "../../lib/api/auth";
import { useAuthStore } from "../../store/useAuthStore";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import GoogleIcon from "../icons/auth/GoogleIcon";
import AppleIcon from "../icons/auth/AppleIcon";

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
        window.AppleID.auth.init({
          clientId: "ae.numra.apple",
          scope: "email name",
          redirectURI: `${window.location.origin}/auth/apple/callback`,
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
        className="cursor-pointer w-full h-[56px] flex items-center justify-center gap-3 bg-white border border-[#EAEAEA] rounded-[12px] hover:bg-gray-50 transition-colors"
      >
        <GoogleIcon />
        <span className="text-[#192540] text-base font-medium">
          {t("continue_with_google")}
        </span>
      </button>

      <button
        type="button"
        onClick={handleAppleLogin}
        disabled={isLoading}
        className="cursor-pointer w-full h-[56px] flex items-center justify-center gap-3 bg-white border border-[#EAEAEA] rounded-[12px] hover:bg-gray-50 transition-colors mt-3"
      >
        <AppleIcon />
        <span className="text-[#192540] text-base font-medium">
          {t("continue_with_apple")}
        </span>
      </button>
    </div>
  );
};

export default SocialLogin;
