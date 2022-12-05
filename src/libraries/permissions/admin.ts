import { Permission } from 'models/permission';
import { GrupoUsuario } from 'models/usuario';

export const AdminPermission: Permission = {
  key: GrupoUsuario.Admin,
  cadastro: {
    acesso: true,
    edicao: true,
  },
};
