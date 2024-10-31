import { style } from '../src/core/method/style';

test('style creates a class with correct styles', () => {
  const styleObject = {
    color: 'blue',
    margin: '10px',
  };

  const styles = style(styleObject);
  expect(typeof styles).toBe('string');

  const styleElement = document.createElement('style');
  styleElement.textContent = `.${styles} { color: ${styleObject.color}; margin: ${styleObject.margin}; }`;
  document.head.appendChild(styleElement);

  document.body.innerHTML = `<div class="${styles}">Test Element</div>`;
  const element = document.querySelector(`.${styles}`) as HTMLElement;
  const computedStyle = window.getComputedStyle(element);
  expect(computedStyle.color).toBe('blue');
  expect(computedStyle.margin).toBe('10px');
});
