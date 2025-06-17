import { format } from 'date-fns';
import deeptrim from 'deep-trim';
import humps from 'humps';

export const normalizePhone = (phone: string) => {
  if (phone.startsWith('0')) {
    return phone.replace(/^0+/, '');
  }
  return phone;
}

export const generateUrlWithParams = (url: string, params: Record<string, string | number | boolean>): string => {
  const queryString = new URLSearchParams(params as Record<string, string>).toString();
  return `${url}?${queryString}`;
}

export const deepTrim = (obj: any) => deeptrim(obj);

const deepConvertKeys = (obj: any, caseConverter: (key: string) => string): any => {
  if (Array.isArray(obj)) {
    return obj.map(item => deepConvertKeys(item, caseConverter));
  } else if (typeof obj === 'object' && obj !== null) {
    return Object.keys(obj).reduce((result, key) => {
      const newKey = caseConverter(key);
      result[newKey] = deepConvertKeys(obj[key], caseConverter);
      return result;
    }, {} as any);
  }
  return obj;
};

export const toSnakeCaseKeys = (obj: any): any => deepConvertKeys(obj, humps.decamelize);

// export const toKebabCaseKeys = (obj: any): any => deepConvertKeys(obj, changeCase.kebabCase);

export const toCamelCaseKeys = (obj: any): any => deepConvertKeys(obj, humps.camelize);

export const formatLocalDate = (date: string) => format(date, "MMM d 'at' h:mma");
