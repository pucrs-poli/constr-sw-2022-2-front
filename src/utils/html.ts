export const REDIRECT_URL_KEY = 'redirectUrl';
export const TOKEN_STORAGE_KEY = 'cras_tkn';

export const KeysFiltered = <Type>(
  obj: object,
  keysToExclude: string[]
): Type => {
  const p = { ...obj } as any;
  for (let k of keysToExclude) {
    delete p[k];
  }
  return p as Type;
};
