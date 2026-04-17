const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export interface ClienteData {
  name: string;
  phone: string;
  description: string;
  cep?: string;
  street?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
}

export interface ClienteResponse {
  id: string;
  nome: string;
  telefone: string;
  descricao: string;
}

export const cadastrarClienteService = async (
  data: ClienteData,
): Promise<ClienteResponse> => {
  const token = localStorage.getItem("ecofeira_token");
  if (!token) {
    throw new Error(
      "Token de autenticação não encontrado. Por favor, faça login.",
    );
  }

  const response = await fetch(`${API_URL}/api/clientes`, {
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
    let errorMessage = "Erro ao cadastrar cliente";
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
