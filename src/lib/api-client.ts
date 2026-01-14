import { hc } from "hono/client";
import type { AppType } from "tuna-reportes-api";

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Cliente público para endpoints sin autenticación
 * Usado para: login, register, members/registration
 */
export const publicApi = hc<AppType>(API_URL);

/**
 * Crea un cliente autenticado con el token JWT del usuario actual
 * 
 * El token se inyecta automáticamente en todas las peticiones.
 * 
 * @example
 * const api = createAuthenticatedClient();
 * const res = await api.events.$get();
 */
export const createAuthenticatedClient = () => {
  const token = localStorage.getItem("auth_token");
  
  return hc<AppType>(API_URL, {
    init: {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    },
  });
};
