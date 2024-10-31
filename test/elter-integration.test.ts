import elter from '../src/core/elter';

test('elter.create returns an object with string values', () => {
  const styles = elter.create({ test: { color: 'aqua' } });
  expect(typeof styles).toBe('object');
  expect(typeof styles.test).toBe('string');
});

test('elter.style returns a string', () => {
  const style = elter.style({ color: 'aqua' });
  expect(typeof style).toBe('string');
});

test('elter.global returns undefined', () => {
  const result = elter.global({});
  expect(result).toBeUndefined();
});

test('elter.root returns undefined', () => {
  const result = elter.root({});
  expect(result).toBeUndefined();
});

test('elter.union returns a string', () => {
  const result = elter.union('test', '', false, undefined, 'abc');
  expect(result).toBe('test abc');
});
