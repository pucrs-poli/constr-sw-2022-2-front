import { Permission } from 'models/permission';
import { GrupoUsuario } from 'models/usuario';

export const AlunoPermission: Permission = {
  key: GrupoUsuario.Estudante,
  cadastro: {
    acesso: false,
    edicao: false,
  },
};
