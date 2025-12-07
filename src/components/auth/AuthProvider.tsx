interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * AuthProvider component - a simple wrapper for auth context.
 * Auth state is now persisted in localStorage via zustand persist middleware.
 */
export const AuthProvider = ({ children }: AuthProviderProps) => {
  return <>{children}</>;
};

export default AuthProvider;
