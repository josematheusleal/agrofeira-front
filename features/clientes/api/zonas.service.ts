import { apiClient } from "@/lib/api-client";
import { ZonaEntregaDTO } from "./types";

export const zonasService = {
  async getAll(): Promise<ZonaEntregaDTO[]> {
    return apiClient<ZonaEntregaDTO[]>("/api/v1/zonas-entrega", {});
  },
};
