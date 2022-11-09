import { Permission } from 'models/permission';
import { GrupoUsuario } from 'models/usuario';

export const CoordenadorPermission: Permission = {
  key: GrupoUsuario.Coordenador,
  cadastro: {
    acesso: true,
    edicao: true,
  },
};
