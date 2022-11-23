import { Class, CreateClass } from 'models/class';
import { toRequest } from 'utils/request';
import { api } from './api';
import { getClassesEndpoint } from './endpoints';

export const getClasses = () => {
  const url = `${getClassesEndpoint()}/classes`;
  return toRequest<Class[]>(
    api.get,
    [url],
    'classList',
     false     
  );
};

export const deleteClass = (id: string) => {
  const url = `${getClassesEndpoint()}/classes/${id}`;
  return toRequest<Class>(
    api.delete,
    [url],
    'classList',
     false
  );
};

export const createClass = (classe: CreateClass) => {
  const url = `${getClassesEndpoint()}/classes`;
  return toRequest<Class>(
    api.post,
    [url,classe], 
    'classList',
     false
  );
};

export const updateClass = (classe: CreateClass) => {
  const url = `${getClassesEndpoint()}/classes`;
  return toRequest<Class>(
    api.put,
    [url,classe], 
    'classList',
     false
  );
};

