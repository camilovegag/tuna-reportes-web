import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import { loginSchema, type LoginFormData } from "@/schemas";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form";
import {
  H1,
  TextMuted,
  TextError,
  TextSmall,
} from "@/components/ui/typography";

export function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuth();

  const methods = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
      navigate("/");
    } catch {
      // Error is handled by auth context
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-2 text-center">
        <H1>Iniciar sesión</H1>
        <TextMuted>Ingresa tus credenciales para continuar</TextMuted>
      </div>

      {/* Form */}
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-4">
            <FormInput<LoginFormData>
              name="email"
              label="Email"
              type="email"
              placeholder="tu@email.com"
              autoComplete="email"
            />

            <FormInput<LoginFormData>
              name="password"
              label="Contraseña"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          {/* API Error */}
          {error && <TextError className="text-center">{error}</TextError>}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
          </Button>
        </form>
      </FormProvider>

      {/* Footer */}
      <TextSmall className="text-center">
        ¿No tienes cuenta?{" "}
        <Link
          to="/register"
          className="text-primary hover:underline font-medium"
        >
          Regístrate
        </Link>
      </TextSmall>
    </div>
  );
}
