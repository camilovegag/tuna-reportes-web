import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/hooks/use-auth";

interface ProtectedRouteProps {
  redirectTo?: string;
}

/**
 * Protects routes that require authentication.
 * Redirects to login if user is not authenticated.
 */
export function ProtectedRoute({ redirectTo = "/login" }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Cargando...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
}

/**
 * Protects auth routes (login/register) from authenticated users.
 * Redirects to home if user is already authenticated.
 */
export function GuestRoute({ redirectTo = "/" }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Cargando...</div>
      </div>
    );
  }

  if (user) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
}
