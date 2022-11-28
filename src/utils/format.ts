export const getUnmaskedNumber = (str: string) => str.replaceAll(/\D/g, '');

export const formatCEP = (str: string) =>
  getUnmaskedNumber(str)
    .substring(0, 8)
    .replace(/(\d{5})(\d{1,3})/, '$1-$2');
