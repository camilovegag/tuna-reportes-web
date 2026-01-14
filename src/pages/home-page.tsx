import { H1, TextMuted } from "@/components/ui/typography";
import { useAuth } from "@/hooks/use-auth";

export function HomePage() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <H1>¡Bienvenido{user?.email ? `, ${user.email}` : ""}!</H1>
        <TextMuted>
          Gestiona asistencias y eventos de la Tuna Universidad de La Sabana.
        </TextMuted>
      </div>

      {/* Dashboard cards placeholder */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold">Próximos eventos</h3>
          <p className="text-sm text-muted-foreground mt-1">
            No hay eventos programados
          </p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold">Asistencias pendientes</h3>
          <p className="text-sm text-muted-foreground mt-1">Todo al día</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold">Integrantes activos</h3>
          <p className="text-sm text-muted-foreground mt-1">0 integrantes</p>
        </div>
      </div>
    </div>
  );
}
