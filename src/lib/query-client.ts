import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Reintentar solo 1 vez en caso de error
      retry: 1,
      // Considerar datos frescos por 1 minuto
      staleTime: 1000 * 60,
      // No refetchear automáticamente al enfocar la ventana
      refetchOnWindowFocus: false,
    },
  },
});
