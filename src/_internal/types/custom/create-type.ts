import type { CustomCSSProperties } from './custom-css-properties';
import { MediaQuery } from './custom-html-type';

export type MediaStyle = Record<MediaQuery, Record<string, CustomCSSProperties>>;

export type CreateStyle<T> = {
  readonly [K in keyof T | string]: K extends keyof T ? T[K] : CustomCSSProperties;
};

export type ReturnStyleType<T> = { [key in keyof T]: string };
