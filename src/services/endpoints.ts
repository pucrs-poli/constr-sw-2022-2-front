import { getEnvironment } from './environment';

export const getAuthEndpoint = () => `${getEnvironment()?.auth}`;

export const getPrediosSalasEndpoint = () => `${getEnvironment()?.prediosSalas}`