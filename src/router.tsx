import { createBrowserRouter } from "react-router";
import { ProtectedRoute, GuestRoute } from "@/components/route-guards";
import { AppLayout } from "@/layouts/app-layout";
import { AuthLayout } from "@/layouts/auth-layout";
import { HomePage } from "@/pages/home-page";
import { LoginPage } from "@/pages/auth/login-page";
import { RegisterPage } from "@/pages/auth/register-page";

export const router = createBrowserRouter([
  // Protected routes (require authentication)
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: "/",
            element: <HomePage />,
          },
          {
            path: "/events",
            element: (
              <div className="text-muted-foreground">
                Eventos - Próximamente
              </div>
            ),
          },
          {
            path: "/members",
            element: (
              <div className="text-muted-foreground">
                Integrantes - Próximamente
              </div>
            ),
          },
          {
            path: "/reports",
            element: (
              <div className="text-muted-foreground">
                Reportes - Próximamente
              </div>
            ),
          },
        ],
      },
    ],
  },
  // Guest routes (only for unauthenticated users)
  {
    element: <GuestRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/login",
            element: <LoginPage />,
          },
          {
            path: "/register",
            element: <RegisterPage />,
          },
        ],
      },
    ],
  },
]);
