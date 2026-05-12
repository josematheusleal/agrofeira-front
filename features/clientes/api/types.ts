export interface EnderecoDTO {
  rua: string | null;
  numero: string | null;
  complemento: string | null;
  bairro: string | null;
  cidade: string | null;
  estado: string | null;
  cep: string | null;
  zonaEntregaId: string | null;
  zonaEntrega?: ZonaEntregaDTO | null;
}

export interface ZonaEntregaDTO {
  id: string;
  nome: string;
  taxa: number;
}

export interface ClienteDTO {
  id: string;
  nome: string;
  email?: string | null;
  telefone?: string | null;
  dataNascimento?: string | null;
  descricao?: string | null;
  endereco?: EnderecoDTO | null;
  dataCadastro?: string | null;
}

export interface CreateClienteDTO extends Omit<ClienteDTO, "id"> {
  senha?: string;
}
