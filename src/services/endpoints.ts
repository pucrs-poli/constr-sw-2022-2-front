import { getEnvironment } from './environment';

export const getAuthEndpoint = () => `${getEnvironment()?.auth}`;
