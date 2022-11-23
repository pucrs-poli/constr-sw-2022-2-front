import { Subject } from 'models/subject';
import { toRequest } from 'utils/request';
import { api } from './api';
import { getSubjectsEndpoint } from './endpoints';

export const getSubjects = () => {
  const url = `${getSubjectsEndpoint()}/subjects`;
  return toRequest<Subject[]>(
    api.get,
    [url],
    'subjectList',
    true     
  );
};
