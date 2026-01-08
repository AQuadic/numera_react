import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getCurrentUser } from "../../lib/api/auth";
import { getToken } from "../../lib/axios";
import { useAuthStore } from "../../store/useAuthStore";
import { deleteFcmToken } from "../../lib/firebase";
import { getSlider } from "../../lib/api/slider/getSlider";
import GlobalLoader from "../general/GlobalLoader";

interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * AuthProvider - fetches user data and prefetches critical data (sliders) on mount.
 * Shows a branded loading screen until hydration is complete.
 */
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    const hydrateApp = async () => {
      // Fetch user and slider data in parallel
      const promises: Promise<void>[] = [];

      // Prefetch slider data into React Query cache
      promises.push(
        queryClient.prefetchQuery({
          queryKey: ["slider"],
          queryFn: getSlider,
        })
      );

      // Fetch user if token exists
      const token = getToken();
      if (token) {
        promises.push(
          (async () => {
            try {
              const { user } = await getCurrentUser();
              useAuthStore.getState().setUser(user);
            } catch {
              useAuthStore.getState().setUser(null);
            }
          })()
        );
      } else {
        // No token present: ensure any existing FCM token/local markers are removed
        try {
          deleteFcmToken();
        } catch {}
      }

      // Wait for all to complete
      await Promise.all(promises);
      setIsHydrated(true);
    };

    hydrateApp();
  }, [queryClient]);

  if (!isHydrated) {
    return <GlobalLoader />;
  }

  return <>{children}</>;
};

export default AuthProvider;
