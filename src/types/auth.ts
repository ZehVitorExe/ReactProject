export interface LoginFormData {
  email: string;
  senha: string;
}

export interface UsuarioLogado {
  id: string;
  nome: string;
  email: string;
  token: string;
}