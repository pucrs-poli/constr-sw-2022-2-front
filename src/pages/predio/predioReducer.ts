import { Endereco, Predio, Sala } from 'models/prediosSalas';

type StateType = {
  predio: Partial<Predio>;
  editedClassRooms: string[];
  deletedClassrooms: string[];
  loading: boolean;
  loadingAddress: boolean;
};

interface GenericType<Type = string, Payload = any> {
  type: Type;
  payload: Payload;
}

export const PredioInitialState = {
  predio: {
    address: {},
    classrooms: [],
  },
  editedClassRooms: [],
  deletedClassrooms: [],
  loading: false,
  loadingAddress: false,
} as StateType;

export default function PredioReducer(
  state: StateType = PredioInitialState,
  action:
    | GenericType<'setLoading', boolean>
    | GenericType<'setLoadingAddress', boolean>
    | GenericType<'setCampo', Partial<Predio>>
    | GenericType<'setEndereco', Partial<Endereco>>
    | GenericType<'addSala', Partial<Sala>>
    | GenericType<'editSala', { sala: Partial<Sala>; index: number }>
    | GenericType<'deleteSala', { index?: number; id?: string }>
    | { type: 'clearSalaHistory'; payload?: never }
): StateType {
  const { type, payload } = action;
  switch (type) {
    case 'setLoading':
      return { ...state, loading: payload };
    case 'setLoadingAddress':
      return { ...state, loadingAddress: payload };
    case 'setCampo':
      return { ...state, predio: { ...state.predio, ...payload } };
    case 'setEndereco':
      return {
        ...state,
        predio: {
          ...state.predio,
          address: { ...state.predio.address, ...payload },
        },
      };
    case 'addSala':
      state.predio.classrooms.push(payload as Sala);
      return {
        ...state,
      };
    case 'editSala':
      state.editedClassRooms.push(payload.sala._id);
      state.predio.classrooms[payload.index] = payload.sala;
      return { ...state };
    case 'deleteSala':
      if (payload.id) {
        state.deletedClassrooms.push(payload.id);
      } else {
        state.predio.classrooms.splice(payload.index, 1);
      }
      return { ...state };
    case 'clearSalaHistory':
      state.deletedClassrooms = [];
      state.editedClassRooms = [];
      return { ...state };
    default:
      throw new Error();
  }
}
