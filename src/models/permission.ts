import { AdminPermission } from 'libraries/permissions/admin';
import { AlunoPermission } from 'libraries/permissions/aluno';
import { CoordenadorPermission } from 'libraries/permissions/coordenador';
import { ProfessorPermission } from 'libraries/permissions/professor';
import { getMergedObjects } from 'utils/parse';
import { GrupoUsuario } from './usuario';

export type Permission = {
  key: GrupoUsuario | GrupoUsuario[];
  cadastro: {
    acesso: boolean;
    edicao: boolean;
  };
};

export const userPermissionByGroup = (
  groups: GrupoUsuario[]
): Permission | undefined => {
  const permissions = [
    AdminPermission,
    CoordenadorPermission,
    ProfessorPermission,
    AlunoPermission,
  ];

  return getMergedObjects(
    ...permissions.filter((p) => groups.includes(p.key as GrupoUsuario))
  ) as Permission;
};
