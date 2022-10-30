export enum GrupoUsuario {
  Estudante = 'alunos',
  Professor = 'professores',
  Coordenador = 'coordenadores',
}

export type TokenType = {
  // TODO: MAPEAR ESTE TIPO
  access_token: string;
  id_token: string;
  refresh_token: string;
  expires_at: number;
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
