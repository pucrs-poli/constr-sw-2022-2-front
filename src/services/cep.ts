import { CEPAPIReturnDTO } from 'models/cep';
import { getUnmaskedNumber } from 'utils/format';
import { toRequest } from 'utils/request';
import { api } from './api';

const getCEPEndpoint = () => `https://viacep.com.br/ws`;

export const getCEPInfo = (cep: string) => {
  const url = `${getCEPEndpoint()}/${getUnmaskedNumber(cep)}/json`;
  return toRequest<CEPAPIReturnDTO | { error: true }>(api.get, [url], 'getCEP');
};
