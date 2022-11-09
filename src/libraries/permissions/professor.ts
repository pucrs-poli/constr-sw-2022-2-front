import { Permission } from 'models/permission';
import { GrupoUsuario } from 'models/usuario';

export const ProfessorPermission: Permission = {
  key: GrupoUsuario.Professor,
  cadastro: {
    acesso: true,
    edicao: false,
  },
};
