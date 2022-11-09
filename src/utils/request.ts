import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getEnvironment } from 'services/environment';

export const getNoCache = () =>
  `${new Date().getTime()}${Math.round(Math.random() * 99999)}`;

export const toRequest = <Type = any>(
  requestMethod:
    | typeof axios.get
    | typeof axios.post
    | typeof axios.put
    | typeof axios.delete,
  requestMethodOnlineParams:
    | [string]
    | [string, AxiosRequestConfig | any]
    | [string, any, AxiosRequestConfig],
  offlineJSONName?: string,
  mock?: boolean
): Promise<AxiosResponse<Type>> => {
  if (getEnvironment()?.isOffline || mock) {
    const url = `/assets/mock/${offlineJSONName}.json`;
    return axios.get(url);
  } else {
    return requestMethod.apply({}, requestMethodOnlineParams as any) as Promise<
      AxiosResponse<Type>
    >;
  }
};

export const getMergedParamsFromObject = (obj: object) => {
  return Object.entries(obj)
    .filter(
      (it) =>
        it[1] !== undefined &&
        it[1] !== null &&
        it[1] !== '' &&
        (!Array.isArray(it[1]) || it[1].length)
    )
    .map((it) => {
      return `${it[0]}=${it[1]}`;
    })
    .join('&');
};
