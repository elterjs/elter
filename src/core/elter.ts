import type { MediaStyle, CreateStyle, ReturnStyleType, CustomHTMLType, ExCSSProperties } from '../_internal';
import { create } from './method/create';
import { global } from './method/global';
import { root } from './method/root';
import { style } from './method/style';
import { union } from './method/union';

const elter = {
  create<T extends MediaStyle>(object: CreateStyle<T> | MediaStyle): ReturnStyleType<T> {
    return create(object);
  },

  global(object: CustomHTMLType): void {
    return global(object);
  },

  root(object: ExCSSProperties): void {
    return root(object);
  },

  style(object: ExCSSProperties): string {
    return style(object);
  },

  union(...classes: Array<string | undefined | false>): string {
    return union(...classes);
  },
};

export default elter;
export { union };
