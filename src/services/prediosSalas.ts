import { Predio, Sala } from 'models/prediosSalas';
import { toRequest } from 'utils/request';
import { api } from './api';
import { getEnvironment } from './environment';

const getPrediosSalasEndpoint = () => getEnvironment()?.buildings;

export const getAllPredios = () => {
  const url = `${getPrediosSalasEndpoint()}/buildings`;
  return toRequest<Predio[]>(api.get, [url], 'getPredios', false);
};

export const getPredioByID = (id: string) => {
  const url = `${getPrediosSalasEndpoint()}/buildings/${id}`;
  return toRequest<Predio>(api.get, [url], 'getPredio', false);
};

// export const getAllSalas = (idPredio: string) => {
//   const url = `${getPrediosSalasEndpoint()}/classroom`;
//   // TODO: DESLIGAR O TRUE
//   return toRequest<Sala[]>(api.get, [url], 'getSalas', true);
// };

export const postPutPredio = (predio: Partial<Predio>) => {
  const url = `${getPrediosSalasEndpoint()}/buildings${
    predio._id ? `/${predio._id}` : ''
  }`;

  return toRequest<Predio>(predio._id ? api.put : api.post, [
    url,
    { ...predio, _id: undefined, __v: undefined },
  ]);
};

export const postSala = (sala: Partial<Sala>) => {
  const url = `${getPrediosSalasEndpoint()}/classrooms/`;
  return toRequest<Sala>(api.post, [url, sala]);
};

export const putSala = (sala: Partial<Sala>) => {
  const url = `${getPrediosSalasEndpoint()}/classrooms/${sala._id}`;
  return toRequest<Sala>(api.put, [
    url,
    { ...sala, _id: undefined, __v: undefined },
  ]);
};

export const deletePredios = (...ids: string[]) => {
  console.log(ids);
  return Promise.all(
    ids.map((id) => {
      const url = `${getPrediosSalasEndpoint()}/buildings/${id}`;
      return toRequest<void>(api.delete, [url]);
    })
  );
};

export const deleteSalas = (...ids: string[]) => {
  return Promise.all(
    ids.map((id) => {
      const url = `${getPrediosSalasEndpoint()}/classrooms/${id}`;
      return toRequest<void>(api.delete, [url], 'deleteSalas');
    })
  );
};
