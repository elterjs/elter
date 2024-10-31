import { MediaStyle } from '..';

const isWindowDefined = typeof window !== 'undefined';
const isDocumentDefined = typeof document !== 'undefined';
export const isServer = !isWindowDefined || !isDocumentDefined;
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isDevAndTest = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test';
export const isDevServer = isDevelopment && isServer;

const exception = ['line-height', 'font-weight', 'opacity', 'scale', 'z-index'];

export const applyCssValue = (value: string | number, cssProp: string): string => {
  if (typeof value === 'number') {
    return exception.includes(cssProp) ? value.toString() : value + 'px';
  }
  return value;
};

export const isClassesObjectType = (object: object): object is MediaStyle => {
  return typeof object === 'object' && !Array.isArray(object);
};

export const toPascalCase = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const camelToKebabCase = (property: string) => {
  return property.replace(/([A-Z])/g, '-$1').toLowerCase();
};
