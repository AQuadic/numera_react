import { Navigate, Outlet, useLocation } from "react-router";
import { useAuthStore } from "../../store/useAuthStore";

/**
 * ProtectedRoute - requires the user to be authenticated.
 * If not authenticated, redirects to /signin (preserving the intended destination).
 */
const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated()) {
    // Redirect to signin, but remember where the user wanted to go
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
