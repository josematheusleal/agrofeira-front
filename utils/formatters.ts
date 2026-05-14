export function formatarData(dataString: string): string {
  const data = new Date(dataString);
  return data.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function formatarHora(dataString: string): string {
  const data = new Date(dataString);
  return data.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatarMoeda(valor: number): string {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function mascararTelefone(value: string): string {
  if (!value) return "";
  let v = value.replace(/\D/g, "");
  v = v.slice(0, 11); // Máximo 11 dígitos (DD + 9 números)

  if (v.length > 10) {
    // Formato Celular: (XX) 9XXXX-XXXX
    v = v.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
  } else if (v.length > 5) {
    // Formato Fixo: (XX) XXXX-XXXX
    v = v.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
  } else if (v.length > 2) {
    // Formato com DDD: (XX) X
    v = v.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
  } else if (v.length > 0) {
    // Apenas DDD
    v = v.replace(/^(\d{0,2})/, "($1");
  }
  return v;
}
