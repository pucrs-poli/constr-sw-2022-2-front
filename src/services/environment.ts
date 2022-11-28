import axios from 'axios';
import { getNoCache } from 'utils/request';

interface Environment {
  isOffline: boolean;
  auth: string;
}

let loadedEnvironment: Environment;

export const loadEnvironment = async () => {
  try {
    const { data } = await axios.get<Environment>(
      `/assets/environment/default.json?noCache=${getNoCache()}`
      // `/assets/environment/${process.env.NODE_ENV}.json?noCache=${getNoCache()}`
    );
    loadedEnvironment = data;
    return data;
  } catch (err) {
    alert('Não foi possível carregar as variáveis de ambiente!');
    return null;
  }
};

export const getEnvironment = (): Environment => {
  return loadedEnvironment;
};
