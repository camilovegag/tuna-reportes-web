import { NavLink } from "react-router";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  CalendarBlankIcon,
  UsersIcon,
  ChartBarIcon,
  SignOutIcon,
  HouseIcon,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "Inicio", icon: HouseIcon },
  { to: "/events", label: "Eventos", icon: CalendarBlankIcon },
  { to: "/members", label: "Integrantes", icon: UsersIcon },
  { to: "/reports", label: "Reportes", icon: ChartBarIcon },
];

export function Navbar() {
  const { logout, user } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="flex h-14 items-center gap-4 mx-auto w-[min(1280px,90%)]">
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-2 font-bold text-primary"
        >
          <span className="hidden md:inline">Tuna Reportes</span>
          <span className="md:hidden">TR</span>
        </NavLink>

        {/* Navigation */}
        <nav className="flex-1 flex items-center gap-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground"
                )
              }
            >
              <Icon className="size-4" weight="fill" />
              <span className="hidden md:inline">{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {user && (
            <Button
              variant="ghost"
              size="icon"
              onClick={logout}
              aria-label="Cerrar sesión"
            >
              <SignOutIcon weight="fill" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
