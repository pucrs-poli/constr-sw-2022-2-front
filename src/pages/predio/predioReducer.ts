import { Endereco, Predio } from 'models/prediosSalas';

type StateType = {
  predio: Partial<Predio>;
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
    default:
      throw new Error();
  }
}
