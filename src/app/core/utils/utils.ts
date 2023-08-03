export const normalizeArray = (array: any): any[] => {
  return Array.isArray(array) ? array : [array];
};
