import { AlunoPermission } from 'libraries/permissions/aluno';
import { CoordenadorPermission } from 'libraries/permissions/coordenador';
import { ProfessorPermission } from 'libraries/permissions/professor';
import { GrupoUsuario } from './usuario';

export type Permission = {
  cadastro: {
    acesso: boolean;
    edicao: boolean;
  };
};

export const userPermissionByGroup = (group: GrupoUsuario) => {
  switch (group) {
    case GrupoUsuario.Coordenador:
      return CoordenadorPermission;
    case GrupoUsuario.Professor:
      return ProfessorPermission;
    case GrupoUsuario.Estudante:
      return AlunoPermission;
    default:
      return null;
  }
};
