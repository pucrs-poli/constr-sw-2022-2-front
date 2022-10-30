import { getEnvironment } from './environment';

export const authEndpoint = `${getEnvironment()?.auth}/`;
