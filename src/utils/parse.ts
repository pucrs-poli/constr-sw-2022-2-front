type acceptedObject = {
  [k: string]: string | string[] | boolean | acceptedObject;
};

export const getValueByKeyArr = (
  obj: { [k: string]: any },
  keyArr: string[]
): any => {
  return keyArr.reduce((acumulator, atual) => {
    if (typeof acumulator !== 'undefined' && acumulator[atual]) {
      return acumulator[atual];
    }
    return undefined;
  }, obj);
};

export const getMergedObjects = (...arr: acceptedObject[]) => {
  if (!arr.length) return undefined;
  const merged = JSON.parse(JSON.stringify(arr[0])); // modelo para consulta
  if (arr.length === 1) return merged;

  const pathsToGo: string[] = Object.keys(merged); // chaves primarias (nesse primeiro caso)
  const paths: string[] = [];

  while (pathsToGo.length) {
    // iterar sobre as chaves
    const path = pathsToGo.shift() || ''; //pegar a primeira da lista para testar ex: cadastro, na prox cadastro.acesso
    const pathArr = path?.split('.') || []; // ["cadastro"] e na prox ["cadastro", "acesso"], [""]
    const value = getValueByKeyArr(merged, pathArr);
    if (typeof value === 'undefined') continue;
    else if (
      typeof value === 'string' ||
      typeof value === 'boolean' ||
      Array.isArray(value) ||
      value === null
    ) {
      paths.push(pathArr.join('.')); // key \ cadastro \ cadastro.acesso \ cadastro.edicao
    } else if (typeof value === 'object' && Object.keys(value).length) {
      pathsToGo.push(
        ...Object.keys(value).map((k) => pathArr.concat(k).join('.'))
      );
    }
  }

  paths.forEach((p) => {
    const pArr = p.split('.');
    let value: any = arr.reduce<any>((acumulator, atual) => {
      const actualValue = getValueByKeyArr(atual, pArr);
      if (typeof actualValue === 'undefined' || actualValue === null) {
        return acumulator;
      } else if (typeof actualValue === 'string') {
        return [...(acumulator ?? []), actualValue];
      } else if (typeof actualValue === 'boolean') {
        return acumulator || actualValue;
      } else if (Array.isArray(actualValue)) {
        return [
          ...(acumulator ?? []),
          ...actualValue.filter(
            (it) => !Array.isArray(acumulator) || !acumulator.includes(it)
          ),
        ];
      }
      return acumulator;
    }, undefined);

    let aux: any = merged;
    for (let i = 0; i < pArr.length; i++) {
      if (i === pArr.length - 1) {
        aux[pArr[i]] = value;
      } else {
        aux = aux[pArr[i]];
      }
    }
  });
  return merged;
};
