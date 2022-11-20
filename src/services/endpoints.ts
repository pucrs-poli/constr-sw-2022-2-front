import { getEnvironment } from './environment';

export const getAuthEndpoint = () => `${getEnvironment()?.auth}`;
export const getClassesEndpoint = () => `${getEnvironment()?.classes}`;
