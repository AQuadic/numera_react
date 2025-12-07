import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../../store/useAuthStore";

/**
 * GuestRoute - only accessible when the user is NOT authenticated.
 * If already logged in, redirects to home.
 */
const GuestRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isInitialized = useAuthStore((state) => state.isInitialized);

  // Wait for auth initialization before making a decision
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EBAF29]"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    // Already logged in — redirect to home
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default GuestRoute;
