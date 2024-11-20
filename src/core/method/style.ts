import type { ExCSSProperties } from '../../_internal';
import { isDevAndTest, injectClientCSS, styleCompiler, genBase36Hash, injectServerCSS, isServer } from '../../_internal';
import { createGlobalStyleSheetPromise, globalStyleSheetPromise, resolveGlobalStyleSheet } from './style-build-in-helper';
import styles from '../styles/style.module.css';

export function style(object: ExCSSProperties): string {
  const base36Hash = genBase36Hash(object, 8);
  const { styleSheet } = styleCompiler(object, base36Hash);
  const injectCSS = isServer ? injectServerCSS : injectClientCSS;
  if (typeof globalStyleSheetPromise === 'undefined') createGlobalStyleSheetPromise();
  resolveGlobalStyleSheet(styleSheet);

  if (isDevAndTest) injectCSS(base36Hash, styleSheet);
  return isDevAndTest ? base36Hash : styles[base36Hash];
}
