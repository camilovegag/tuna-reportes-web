import { Outlet } from "react-router";
import { ThemeToggle } from "@/components/theme-toggle";
import { H1, Text, TextLarge } from "@/components/ui/typography";

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
          <H1 className="text-4xl mb-4 text-primary-foreground">
            Tuna Reportes
          </H1>
          <TextLarge className="max-w-md text-primary-foreground/80">
            Gestiona asistencias y eventos de la Tuna Universidad de La Sabana
            de manera simple y eficiente.
          </TextLarge>

          <ul className="mt-4 flex flex-col gap-3">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground/50" />
              <Text className="text-primary-foreground/70">
                Control de asistencia en tiempo real
              </Text>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground/50" />
              <Text className="text-primary-foreground/70">
                Reportes automáticos
              </Text>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground/50" />
              <Text className="text-primary-foreground/70">
                Gestión de integrantes
              </Text>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
