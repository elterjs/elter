'use client';

import elter, { max_lg } from 'elter';

const styles = elter.create({
  e2e: {
    color: 'pink',
    [max_lg]: {
      color: 'aqua',
    },
  },
});

export function E2ETest() {
  return (
    <div className={styles.e2e} data-testid="e2e-test-div">
      Component-attach-class and Responsive-design test
    </div>
  );
}
