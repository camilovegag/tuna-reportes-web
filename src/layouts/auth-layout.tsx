import { Outlet } from "react-router";
import { ThemeToggle } from "@/components/theme-toggle";

export function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <main className="flex-1 flex flex-col">
        <div className="flex-1 flex items-center justify-center p-6 md:p-12">
          <div className="w-full max-w-sm">
            <Outlet />
          </div>
        </div>

        <footer className="p-4 flex justify-center lg:justify-start lg:pl-12">
          <ThemeToggle />
        </footer>
      </main>

      <aside className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary via-primary to-primary/80" />

        <div className="absolute top-1/4 -right-20 w-80 h-80 rounded-full bg-primary-foreground/10 blur-3xl" />
        <div className="absolute bottom-1/4 -left-20 w-60 h-60 rounded-full bg-primary-foreground/5 blur-2xl" />

        <div className="relative z-10 flex flex-col justify-center p-12 text-primary-foreground">
          <h1 className="text-4xl font-bold mb-4">Tuna Reportes</h1>
          <p className="text-primary-foreground/80 max-w-md text-sm">
            Gestiona asistencias y eventos de la Tuna Universidad de La Sabana
            de manera simple y eficiente.
          </p>

          <ul className="mt-4 flex flex-col gap-3 text-primary-foreground/70 text-sm">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground/50" />
              Control de asistencia en tiempo real
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground/50" />
              Reportes automáticos
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground/50" />
              Gestión de integrantes
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
