import { Predio } from 'models/prediosSalas';
import { toRequest } from 'utils/request';
import { api } from './api';
import { getEnvironment } from './environment';

const getPrediosSalasEndpoint = () => `${getEnvironment()?.prediosSalas}`;

export const getAllPredios = () => {
  const url = `${getPrediosSalasEndpoint()}/building`;
  // TODO: DESLIGAR O mock
  return toRequest<Predio[]>(api.get, [url], 'getPredios', false);
};

export const getPredioByID = (id: string) => {
  const url = `${getPrediosSalasEndpoint()}/building/${id}`;
  // TODO: Desligar o mock
  return toRequest<Predio>(api.get, [url], 'getPredio', false);
};

// export const getAllSalas = (idPredio: string) => {
//   const url = `${getPrediosSalasEndpoint()}/classroom`;
//   // TODO: DESLIGAR O TRUE
//   return toRequest<Sala[]>(api.get, [url], 'getSalas', true);
// };

export const postPutPredio = (predio: Partial<Predio>) => {
  const url = `${getPrediosSalasEndpoint()}/building${
    predio._id ? `/${predio._id}` : ''
  }`;

  return toRequest<Predio>(predio._id ? api.put : api.post, [
    url,
    { ...predio, _id: undefined, __v: undefined },
  ]);
};

export const postSala = () => {
  return Promise.reject();
};

export const putSala = () => {
  return Promise.reject();
};

export const deletePredios = (...ids: string[]) => {
  console.log(ids);
  return Promise.all(
    ids.map((id) => {
      const url = `${getPrediosSalasEndpoint()}/building/${id}`;
      return toRequest<void>(api.delete, [url]);
    })
  );
};

export const deleteSalas = (...id: string[]) => {
  return Promise.reject();
};
