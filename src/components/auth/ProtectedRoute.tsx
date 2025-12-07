import { Navigate, Outlet, useLocation } from "react-router";
import { useAuthStore } from "../../store/useAuthStore";

/**
 * ProtectedRoute - requires the user to be authenticated.
 * If not authenticated, redirects to /signin (preserving the intended destination).
 */
const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const location = useLocation();

  // Wait for auth initialization before making a decision
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EBAF29]"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to signin, but remember where the user wanted to go
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
