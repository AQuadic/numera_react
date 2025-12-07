import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../../store/useAuthStore";

/**
 * GuestRoute - only accessible when the user is NOT authenticated.
 * If already logged in, redirects to home.
 */
const GuestRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated()) {
    // Already logged in — redirect to home
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default GuestRoute;
