import { useEffect } from "react";
import { useAuthStore } from "../../store/useAuthStore";

interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * AuthProvider component that initializes authentication state on app load.
 * This component should wrap your entire app to ensure the user is fetched
 * when the app loads if a token exists.
 */
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);
  const isInitialized = useAuthStore((state) => state.isInitialized);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // Show a loading spinner while initializing (checking token/fetching user)
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EBAF29]"></div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthProvider;
