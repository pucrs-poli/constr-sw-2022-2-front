export enum GrupoUsuario {
  Estudante = '/alunos',
  Professor = '/professores',
  Coordenador = '/coordenadores',
  Admin = '/admin',
}

export type TokenType = {
  access_token: string;
  token_type: string;
  id_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_expires_in: number;
};

export type UsuarioType = {
  sub: string;
  email_verified: boolean;
  name?: string;
  groups: GrupoUsuario[];
  preferred_username?: string;
  given_name?: string;
  family_name?: string;
  email: string;
};
