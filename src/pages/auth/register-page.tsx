import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import { registerSchema, type RegisterFormData } from "@/schemas";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form";
import {
  H1,
  TextMuted,
  TextError,
  TextSmall,
} from "@/components/ui/typography";

export function RegisterPage() {
  const navigate = useNavigate();
  const { register: registerUser, isLoading, error } = useAuth();

  const methods = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data);
      navigate("/");
    } catch {
      // Error is handled by auth context
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-2 text-center">
        <H1>Crear cuenta</H1>
        <TextMuted>Completa tus datos para registrarte</TextMuted>
      </div>

      {/* Form */}
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-4">
            <FormInput<RegisterFormData>
              name="email"
              label="Email"
              type="email"
              placeholder="tu@email.com"
              autoComplete="email"
            />

            <FormInput<RegisterFormData>
              name="password"
              label="Contraseña"
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
            />

            <FormInput<RegisterFormData>
              name="vinculationCode"
              label="Código de vinculación"
              type="text"
              placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
              description="Solicita este código al administrador de tu organización"
            />
          </div>

          {/* API Error */}
          {error && <TextError className="text-center">{error}</TextError>}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Registrando..." : "Crear cuenta"}
          </Button>
        </form>
      </FormProvider>

      {/* Footer */}
      <TextSmall className="text-center">
        ¿Ya tienes cuenta?{" "}
        <Link to="/login" className="text-primary hover:underline font-medium">
          Inicia sesión
        </Link>
      </TextSmall>
    </div>
  );
}
