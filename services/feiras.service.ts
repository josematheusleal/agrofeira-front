const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export interface FeiraDTO {
  id: string;
  dataHora: string;
  status:
    | "RASCUNHO"
    | "ABERTA_OFERTAS"
    | "ABERTA_PEDIDOS"
    | "FINALIZADA"
    | "CANCELADA";
  comerciantes: unknown[];
  itens: unknown[];
}

export async function listarFeiras(token: string): Promise<FeiraDTO[]> {
  const response = await fetch(`${API_URL}/api/feiras`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Erro ao buscar feiras");
  return response.json();
}
