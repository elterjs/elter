import { pseudo, camelToKebabCase, isClassesObjectType, applyCssValue } from '..';
import type { PropertyType, MediaStyle, CustomCSSProperties, CustomHTMLType } from '..';

export function sheetCompiler(object: MediaStyle | CustomCSSProperties | CustomHTMLType, base36Hash?: string, core?: string) {
  let styleSheet = '';
  let bigIndent = false;
  const mediaQueries: { media: string; css: string }[] = [];

  const classNameType = (property: string) => {
    if (core === '--global') return property;
    else return '.' + property + '_' + base36Hash;
  };

  const rules = (indent: string, rulesValue: unknown, property: unknown) => {
    if (typeof property !== 'string') return '';
    const value = (rulesValue as Record<string, unknown>)[property];
    const cssProp = camelToKebabCase(property);
    return indent + cssProp + ': ' + value + ';\n';
  };

  const selector = (className: string, property: string, rule: string, indent = '  ') => {
    return `${indent}${className}${property} {\n${rule}${indent}}\n`;
  };

  const stringConverter = (className: string, properties: PropertyType | CustomCSSProperties, indentLevel = 0): PropertyType => {
    const classSelector: PropertyType = {};
    const indent = '  '.repeat(indentLevel);
    const innerIndent = '  '.repeat(indentLevel + 1);
    let cssRule = '';

    for (const property in properties) {
      if (Object.prototype.hasOwnProperty.call(properties, property)) {
        const value = (properties as PropertyType)[property];
        const isClassInc = pseudo.classes.includes(property);
        const isElementInc = pseudo.elements.includes(property);
        const classIndex = pseudo.classes.indexOf(property);
        const elementIndex = pseudo.elements.indexOf(property);
        const isPseudoOrMediaClass = property.startsWith('@') ? isClassInc || isElementInc : classIndex || elementIndex;
        let colon = '';

        if (property.startsWith('@keyframes')) {
          let keyframesRule = `${property} {\n`;
          for (const keyframe in value as PropertyType) {
            if (Object.prototype.hasOwnProperty.call(value, keyframe)) {
              const keyframeValue = (value as PropertyType)[keyframe];
              keyframesRule += `${innerIndent}${keyframe} {\n`;
              if (typeof keyframeValue === 'object' && keyframeValue !== null) {
                for (const prop in keyframeValue) {
                  if (Object.prototype.hasOwnProperty.call(keyframeValue, prop)) {
                    const propValue = keyframeValue[prop];
                    keyframesRule += `${innerIndent}  ${camelToKebabCase(prop)}: ${propValue};\n`;
                  }
                }
              }
              keyframesRule += `${innerIndent}}\n`;
            }
          }
          keyframesRule += `}\n`;
          cssRule += keyframesRule;
        } else if (typeof value === 'string' || typeof value === 'number') {
          const CSSProp = camelToKebabCase(property);
          const applyValue = applyCssValue(value, CSSProp);
          cssRule += `${bigIndent ? '    ' : '  '}${CSSProp}: ${applyValue};\n`;
        } else if (isPseudoOrMediaClass) {
          if (isClassInc) colon = ':';
          if (isElementInc) colon = '::';
          const kebabPseudoSelector = camelToKebabCase(property.replace('&', ''));
          const styles = stringConverter(className + colon + kebabPseudoSelector, value, indentLevel + 1);
          Object.assign(classSelector, styles);
        } else if (property.startsWith('@media')) {
          const mediaRule = property;
          let nestedRules = '';
          let regularRules = '';

          for (const mediaProp in value as PropertyType) {
            if (Object.prototype.hasOwnProperty.call(value, mediaProp)) {
              const mediaValue = value[mediaProp];
              const mediaClassIndex = pseudo.classes.indexOf(mediaProp);
              const isMediaClassInc = pseudo.classes.includes(mediaProp);
              const isMediaElementInc = pseudo.elements.includes(mediaProp);
              const isAndInc = mediaProp.startsWith('&');
              if (mediaProp.startsWith('not') || mediaProp.startsWith('lang') ? mediaClassIndex : isMediaClassInc || isMediaElementInc || isAndInc) {
                if (isMediaClassInc) colon = ':';
                if (isMediaElementInc) colon = '::';
                const kebabMediaProp = camelToKebabCase(mediaProp.replace('&', ''));
                let pseudoClassRule = '';

                if (typeof mediaValue === 'object' && mediaValue !== null) {
                  for (const pseudoProp in mediaValue) {
                    if (Object.prototype.hasOwnProperty.call(mediaValue, pseudoProp)) {
                      const CSSProp = camelToKebabCase(pseudoProp);
                      const applyValue = applyCssValue(mediaValue[pseudoProp] as string | number, CSSProp);
                      pseudoClassRule += rules(innerIndent + '  ', { [pseudoProp]: applyValue }, pseudoProp);
                    }
                  }
                }
                nestedRules += selector(indent + className, colon + kebabMediaProp, pseudoClassRule, innerIndent);
              } else {
                const CSSProp = camelToKebabCase(mediaProp);
                const applyValue = applyCssValue(mediaValue as string | number, CSSProp);
                regularRules += rules(innerIndent + '  ', { [mediaProp]: applyValue }, mediaProp);
              }
            }
          }
          if (regularRules) {
            mediaQueries.push({
              media: mediaRule,
              css: `\n${mediaRule} {\n${indent}  ${className} {\n${regularRules}  }\n${nestedRules}${indent}}${indent}\n`,
            });
          } else {
            mediaQueries.push({
              media: mediaRule,
              css: `\n${mediaRule} {\n${nestedRules}${indent}}\n`,
            });
          }
        }
      }
    }

    classSelector[className] = cssRule;
    return classSelector;
  };

  const createStyles = (styleObject: PropertyType | CustomCSSProperties | MediaStyle, indentLevel = 0): string => {
    let styleSheet = '';

    const processStyles = (styles: PropertyType | CustomCSSProperties | MediaStyle, currentIndentLevel = 0): void => {
      const indent = '  '.repeat(currentIndentLevel);
      for (const property in styles) {
        if (Object.prototype.hasOwnProperty.call(styles, property)) {
          const value = (styles as PropertyType)[property] as unknown as PropertyType;
          if (isClassesObjectType(value)) {
            if (property.startsWith('@keyframes')) {
              const keyframesStyles = stringConverter('', { [property]: value }, currentIndentLevel);
              styleSheet += '\n' + Object.values(keyframesStyles)[0];
            } else if (property.startsWith('@media')) {
              bigIndent = true;
              const mediaStyles = createStyles(value, currentIndentLevel + 1);
              styleSheet += `\n${indent}${property} {${mediaStyles}${indent}}\n`;
              bigIndent = false;
            } else {
              const classSelectors = stringConverter(classNameType(property), value, currentIndentLevel);
              for (const selector in classSelectors) {
                if (Object.prototype.hasOwnProperty.call(classSelectors, selector) && classSelectors[selector] !== '') {
                  styleSheet += `\n${indent}${selector} {\n${classSelectors[selector]}${indent}}\n`;
                }
              }
            }
          }
        }
      }
    };

    processStyles(styleObject, indentLevel);
    return styleSheet;
  };

  styleSheet = createStyles(object);

  mediaQueries.forEach(({ css }) => {
    styleSheet += css;
  });

  return { styleSheet };
}
