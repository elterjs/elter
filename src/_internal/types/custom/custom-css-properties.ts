import type {
  CSSColumnsValue,
  CSSLengthSubValue,
  CSSFontSizeSubValue,
  CSSGlobalValue,
  CSSNumericValue,
  CSSEdgeSizeValue,
  CSSRadiusValues,
} from '../common/css-values';

import type { CSSColorValue, CSSVariableProperties, CSSVariableValue } from '../common/css-variables';
import { MediaQuery, MediaQueryType } from './custom-html-type';

type BaseCSSProperties = {
  [K in keyof React.CSSProperties]: React.CSSProperties[K] | CSSVariableValue;
};

interface CustomExtendProperties extends BaseCSSProperties {
  width?: CSSNumericValue | CSSLengthSubValue | 'auto';
  height?: CSSNumericValue | CSSLengthSubValue | 'auto';
  margin?: CSSEdgeSizeValue;
  marginBottom?: CSSNumericValue | 'auto';
  marginLeft?: CSSNumericValue | 'auto';
  marginRight?: CSSNumericValue | 'auto';
  marginTop?: CSSNumericValue | 'auto';
  padding?: CSSEdgeSizeValue;
  paddingBottom?: CSSNumericValue;
  paddingLeft?: CSSNumericValue;
  paddingRight?: CSSNumericValue;
  paddingTop?: CSSNumericValue;
  fontSize?: CSSNumericValue | CSSFontSizeSubValue;
  scale?: CSSNumericValue | 'none';
  opacity?: CSSNumericValue;
  lineHeight?: CSSNumericValue | 'normal';
  letterSpacing?: CSSNumericValue | 'normal';
  wordSpacing?: CSSNumericValue | 'normal';
  borderWidth?: CSSNumericValue | 'thin' | 'medium' | 'thick';
  borderRadius?: CSSRadiusValues | number;
  top?: CSSNumericValue | 'auto';
  right?: CSSNumericValue | 'auto';
  bottom?: CSSNumericValue | 'auto';
  left?: CSSNumericValue | 'auto';
  maxWidth?: CSSNumericValue | CSSLengthSubValue | 'auto';
  maxHeight?: CSSNumericValue | CSSLengthSubValue | 'auto';
  minWidth?: CSSNumericValue | CSSLengthSubValue | 'auto';
  minHeight?: CSSNumericValue | CSSLengthSubValue | 'auto';
  flexBasis?: CSSNumericValue | 'auto';
  gap?: CSSNumericValue;
  rowGap?: CSSNumericValue;
  columnGap?: CSSNumericValue | 'normal';
  columns?: CSSColumnsValue;
  color?: CSSColorValue | CSSGlobalValue;
  backgroundColor?: CSSColorValue | CSSGlobalValue;
}

type PseudoKeys =
  | 'active'
  | 'hover'
  | 'link'
  | 'visited'
  | 'empty'
  | 'firstChild'
  | 'lastChild'
  | 'firstOfType'
  | 'lastOfType'
  | 'onlyOfType'
  | 'onlyChild'
  | 'checked'
  | 'disabled'
  | 'enabled'
  | 'focus'
  | 'inRange'
  | 'invalid'
  | 'valid'
  | 'optional'
  | 'outOfRange'
  | 'readOnly'
  | 'readWrite'
  | 'required'
  | 'target'
  | 'after'
  | 'before'
  | 'firstLetter'
  | 'firstLine'
  | 'marker'
  | 'selection';

type PseudoKeysType = {
  [K in PseudoKeys]?: CustomCSSProperties;
};
type AndString = `&${string}`;
type AndStringType = {
  [key in AndString]: CustomCSSProperties;
};

export type CustomCSSProperties = CustomExtendProperties | AndStringType | CSSVariableProperties | PseudoKeysType | MediaQueryType;
export type ExCSSProperties =
  | CustomCSSProperties
  | {
      [K in AndString | PseudoKeys | MediaQuery]?: CustomCSSProperties;
    };
