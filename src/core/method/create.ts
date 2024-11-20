import type { ReturnStyleType, CreateStyle, MediaStyle } from '../../_internal';
import { isDevAndTest, sheetCompiler, injectServerCSS, genBase36Hash, isServer, injectClientCSS } from '../../_internal';
import { createGlobalStyleSheetPromise, globalStyleSheetPromise, resolveGlobalStyleSheet } from './create-build-in-helper';
import styles from '../styles/style.module.css';

export function create<T extends MediaStyle>(object: CreateStyle<T> | MediaStyle): ReturnStyleType<T> {
  const base36Hash = genBase36Hash(object, 6);
  const { styleSheet } = sheetCompiler(object, base36Hash);
  const injectCSS = isServer ? injectServerCSS : injectClientCSS;
  if (typeof globalStyleSheetPromise === 'undefined') createGlobalStyleSheetPromise();
  resolveGlobalStyleSheet(styleSheet);

  Object.keys(object).forEach(key => {
    Object.defineProperty(object, key, {
      get: () => {
        const className = key + '_' + base36Hash;
        if (isDevAndTest) injectCSS(base36Hash, styleSheet);
        return isDevAndTest ? className : styles[className];
      },
    });
  });
  return object as ReturnStyleType<T>;
}
