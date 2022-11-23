import { getEnvironment } from './environment';

export const getAuthEndpoint = () => `${getEnvironment()?.auth}`;
export const getClassesEndpoint = () => `${getEnvironment()?.classes}`;
export const getGroupsEndpoint = () => `${getEnvironment()?.groups}`;
export const getSubjectsEndpoint = () => `${getEnvironment()?.subjects}`;
