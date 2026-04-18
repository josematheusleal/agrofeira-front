const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export interface RelatorioDTO {
  id: string;
  mes: string;
  ano: number;
  titulo: string;
  valor: number;
  status: string;
}

export async function listarRelatoriosPorMes(
  token: string,
  ano: number,
): Promise<RelatorioDTO[]> {
  const response = await fetch(`${API_URL}/api/relatorios/por-mes?ano=${ano}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Erro ao buscar relatórios");
  return response.json();
}

export async function listarRelatoriosPorComercianteMes(
  token: string,
  comercianteId: string,
  ano: number,
  mes: number,
): Promise<RelatorioDTO[]> {
  const response = await fetch(
    `${API_URL}/api/relatorios/por-comerciante/mes?comercianteId=${comercianteId}&ano=${ano}&mes=${mes}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) throw new Error("Erro ao buscar relatórios");
  return response.json();
}

export async function listarRelatoriosPorComercianteAno(
  token: string,
  comercianteId: string,
  ano: number,
): Promise<RelatorioDTO[]> {
  const response = await fetch(
    `${API_URL}/api/relatorios/por-comerciante/ano?comercianteId=${comercianteId}&ano=${ano}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) throw new Error("Erro ao buscar relatórios");
  return response.json();
}
