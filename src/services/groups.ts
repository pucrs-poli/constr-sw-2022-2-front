import { Group } from 'models/group';
import { toRequest } from 'utils/request';
import { api } from './api';
import { getGroupsEndpoint } from './endpoints';

export const getGroupsBySubject = (subjectId: string) => {
  const url = `${getGroupsEndpoint()}/groups/subjectId=${subjectId}`;
  return toRequest<Group[]>(
    api.get,
    [url],
    'groupList',
    true     
  );
};
