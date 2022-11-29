import { Turma } from 'models/turmas';
import { toRequest } from 'utils/request';
import { api } from './api';
import { getEnvironment } from './environment';

const getTurmasEndpoint = () => `${getEnvironment()?.classes}`


export const getAllTurmas = () => {
  const url = `${getTurmasEndpoint()}/classroom`;
  // TODO: DESLIGAR O mock
  return toRequest<Turma[]>(api.get, [url], 'turmas', false);
};

export const getTurmaByID = (id: string) => {
  const url = `${getTurmasEndpoint()}/classroom/${id}`;
  // TODO: Desligar o mock
  return toRequest<Turma>(api.get, [url], 'turma', false);
};

export const postTurma = () => {
  return Promise.reject();
};
export const putTurma = () => {
  return Promise.reject();
};
export const deleteTurmas = (...id: number[]) => {
  return Promise.reject();
};
