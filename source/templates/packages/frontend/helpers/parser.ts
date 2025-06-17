
export const findFirstKey = (obj: any, key: string): any => {
  if (Object.prototype.hasOwnProperty.call(obj, key)) {
    return obj[key];
  }

  for (const k in obj) {
    if (typeof obj[k] === 'object' && obj[k] !== null) {
      const result = findFirstKey(obj[k], key);
      if (result !== undefined) {
        return result;
      }
    }
  }

  return undefined;
};
