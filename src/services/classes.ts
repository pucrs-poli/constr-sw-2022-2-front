import { Class } from 'models/class';
import { toRequest } from 'utils/request';
import { api } from './api';
import { getClassesEndpoint } from './endpoints';

export const getClasses = () => {
  const url = `${getClassesEndpoint()}/classes`;
  return toRequest<Class[]>(
    api.get,
    [url],
    'classes',
    false
  );
};
