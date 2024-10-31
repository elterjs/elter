import { E2ETest } from '@/component/style-create';
import { Conflict } from '@/component/style-not-conflict';
import Link from 'next/link';
import elter from 'elter';

const css = elter.create({
  page: {
    color: 'orange',
  },
});

elter.global({
  h1: {
    color: 'cyan',
  },
});

elter.root({
  '--color-skyblue': 'skyblue',
});

export default function Home() {
  return (
    <main>
      <h1>Typed CSS X E2E Test</h1>
      <h2 className={css.page}>page.tsx in elter</h2>
      <Link href="/server">Server Page</Link>
      <E2ETest />
      <Conflict />
    </main>
  );
}
