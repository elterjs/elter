import { globalStyleSheetPromise } from '../src/core/method/style-build-in-helper';
import { style } from '../src/core/method/style';

test('set function should create globalStyleSheetPromise and add styles to it', () => {
  expect(globalStyleSheetPromise).toBeUndefined();
  style({ color: 'red' });
  expect(globalStyleSheetPromise).toBeDefined();
  expect(globalStyleSheetPromise).resolves.toContain('color: red');
});
