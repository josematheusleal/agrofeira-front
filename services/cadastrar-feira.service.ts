const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export interface ComercianteDTO {
  id: string;
  nome: string;
  telefone: string | null;
  descricao: string | null;
  itens: ItemDTO[];
}

export interface ItemDTO {
  id: string;
  nome: string;
  unidadeMedida: string;
  precoBase: number;
}

export interface CriarFeiraRequest {
  feira: {
    dataHora: string;
    status: "AGENDADA";
  };
  comercianteIds: string[];
  itemIds: string[];
}

async function authFetch(url: string, token: string, options?: RequestInit) {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options?.headers,
    },
  });
  if (!response.ok) throw new Error(`Erro na requisição: ${response.status}`);
  return response.json();
}

export function listarComerciantes(token: string): Promise<ComercianteDTO[]> {
  return authFetch(`${API_URL}/api/comerciantes`, token);
}

export function listarItens(token: string): Promise<ItemDTO[]> {
  return authFetch(`${API_URL}/api/itens`, token);
}

export function criarFeira(token: string, data: CriarFeiraRequest) {
  return authFetch(`${API_URL}/api/feiras`, token, {
    method: "POST",
    body: JSON.stringify(data),
  });
}
