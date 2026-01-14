import {
  createContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { InferResponseType, InferRequestType } from "hono/client";
import { publicApi, createAuthenticatedClient } from "@/lib/api-client";

const client = createAuthenticatedClient();

type User = Extract<
  InferResponseType<typeof client.users.me.$get>,
  { email: string }
>;

type LoginRequest = InferRequestType<typeof publicApi.auth.login.$post>["json"];

type RegisterRequest = InferRequestType<
  typeof publicApi.auth.register.$post
>["json"];

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const logout = useCallback(() => {
    localStorage.removeItem("auth_token");
    setUser(null);
    setError(null);
  }, []);

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const api = createAuthenticatedClient();
      const res = await api.users.me.$get();

      if (!res.ok) {
        logout();
        return;
      }

      const userData = await res.json();
      setUser(userData as User);
    } catch (err) {
      console.error("Error verificando sesión:", err);
      logout();
    } finally {
      setIsLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (credentials: LoginRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await publicApi.auth.login.$post({
        json: credentials,
      });

      if (!res.ok) {
        const errorData = await res.json();
        const message = errorData.error.message || "Error al iniciar sesión";
        setError(message);
        throw new Error(message);
      }

      const data = await res.json();

      if ("token" in data) {
        localStorage.setItem("auth_token", data.token);
        await checkAuth();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error de conexión");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await publicApi.auth.register.$post({
        json: data,
      });

      if (!res.ok) {
        const errorData = await res.json();
        const message = errorData.error.message || "Error en el registro";
        setError(message);
        throw new Error(message);
      }

      await login({ email: data.email, password: data.password });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al registrarse");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        login,
        register,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
