import { Predio } from 'models/prediosSalas';
import { toRequest } from 'utils/request';
import { api } from './api';
import { getEnvironment } from './environment';

const getPrediosSalasEndpoint = () => `${getEnvironment()?.prediosSalas}`

export const getAllPredios = () => {
  const url = `${getPrediosSalasEndpoint()}/building`;
  // TODO: DESLIGAR O mock
  return toRequest<Predio[]>(api.get, [url], 'getPredios', true);
};

export const getPredioByID = (id: string) => {
  const url = `${getPrediosSalasEndpoint()}/building/${id}`;
  // TODO: Desligar o mock
  return toRequest<Predio>(api.get, [url], 'getPredio', true);
};

// export const getAllSalas = (idPredio: string) => {
//   const url = `${getPrediosSalasEndpoint()}/classroom`;
//   // TODO: DESLIGAR O TRUE
//   return toRequest<Sala[]>(api.get, [url], 'getSalas', true);
// };

export const postPredio = () => {
  return Promise.reject();
};
export const postSala = () => {
  return Promise.reject();
};

export const putPredio = () => {
  return Promise.reject();
};
export const putSala = () => {
  return Promise.reject();
};

export const deletePredios = (...id: number[]) => {
  return Promise.reject();
};
export const deleteSalas = (...id: number[]) => {
  return Promise.reject();
};
