const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export interface ComercianteData {
  name: string;
  phone: string;
  description: string;
}

export interface ComercianteResponse {
  id: string;
  nome: string;
  telefone: string;
  descricao: string;
  itens?: Array<{
    id: string;
    nome: string;
    unidadeMedida: string;
    precoBase: number;
  }>;
}

export const cadastrarComercianteService = async (
  data: ComercianteData,
): Promise<ComercianteResponse> => {
  const token = localStorage.getItem("ecofeira_token");
  if (!token) {
    throw new Error(
      "Token de autenticação não encontrado. Por favor, faça login.",
    );
  }

  const response = await fetch(`${API_URL}/api/comerciantes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      nome: data.name,
      telefone: data.phone,
      descricao: data.description,
    }),
  });

  if (!response.ok) {
    let errorMessage = "Erro ao cadastrar comerciante";
    try {
      const errorData = await response.json();
      errorMessage =
        errorData.message || errorData.error || `Erro ${response.status}`;
    } catch {
      errorMessage = `Erro ${response.status}: ${response.statusText}`;
    }
    console.error("Erro na API:", errorMessage);
    throw new Error(errorMessage);
  }

  return response.json();
};
