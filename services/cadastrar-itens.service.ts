const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export interface ItemData {
  name: string;
  unit: string;
  price: string;
}

export interface ItemResponse {
  id: string;
  nome: string;
  unidadeMedida: string;
  precoBase: number;
}

export const cadastrarItemService = async (
  data: ItemData,
): Promise<ItemResponse> => {
  const token = localStorage.getItem("ecofeira_token");
  if (!token) {
    throw new Error(
      "Token de autenticação não encontrado. Por favor, faça login.",
    );
  }

  const response = await fetch(`${API_URL}/api/itens`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      nome: data.name,
      unidadeMedida: data.unit,
      precoBase: parseFloat(data.price),
    }),
  });

  if (!response.ok) {
    let errorMessage = "Erro ao cadastrar item";
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
