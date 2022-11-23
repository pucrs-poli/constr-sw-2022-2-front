import { CEPAPIReturnDTO } from 'models/cep';
import { toRequest } from 'utils/request';
import { api } from './api';

const getCEPEndpoint = () => `https://viacep.com.br/ws`;

export const getCEPInfo = (cep: string) => {
  const url = `${getCEPEndpoint()}/${cep.replaceAll(/\D/, '')}/json`;
  return toRequest<CEPAPIReturnDTO>(api.get, [url], 'getCEP');
};
