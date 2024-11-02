'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export const RefreshOn = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    router.refresh();
    const handleSave = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        router.refresh();
      }
    };
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const targetAnchor = target.closest('a');
      if (pathname && targetAnchor instanceof HTMLAnchorElement && targetAnchor.origin === window.location.origin) {
        router.refresh();
      }
    };

    document.addEventListener('click', handleClick);
    window.addEventListener('keydown', handleSave);

    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('keydown', handleSave);
    };
  }, [router, pathname]);

  return null;
};
