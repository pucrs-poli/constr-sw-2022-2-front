import { Turma } from 'models/turmas';
import { toRequest } from 'utils/request';
import { api } from './api';
import { getEnvironment } from './environment';

// const getTurmasEndpoint = () => `${getEnvironment()?.turmas}`
const getTurmasEndpoint = () => `${getEnvironment()}`

export const getAllTurmas = () => {
  const url = `${getTurmasEndpoint()}/turmas`;
  // TODO: DESLIGAR O mock
  return toRequest<Turma[]>(api.get, [url], 'getTurmas', true);
};

export const getPredioByID = (id: string) => {
  const url = `${getTurmasEndpoint()}/turmas/${id}`;
  // TODO: Desligar o mock
  return toRequest<Turma>(api.get, [url], 'getTurma', true);
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
