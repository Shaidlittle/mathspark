'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';

const NAV_ITEMS = [
  { href: '/',          icon: '🏠', label: 'Home'     },
  { href: '/learn',     icon: '📚', label: 'Learn'    },
  { href: '/practice',  icon: '✏️', label: 'Practice' },
  { href: '/challenge', icon: '🎯', label: 'Challenge' },
  { href: '/progress',  icon: '📊', label: 'Progress' },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 shadow-lg safe-area-pb">
      <div className="flex items-stretch justify-around max-w-lg mx-auto">
        {NAV_ITEMS.map(({ href, icon, label }) => {
          const active = pathname === href || (href !== '/' && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                'flex flex-col items-center justify-center py-3 px-2 flex-1 gap-0.5',
                'transition-colors duration-150 min-h-[64px]',
                active
                  ? 'text-brand-700'
                  : 'text-gray-400 hover:text-gray-600',
              )}
              aria-current={active ? 'page' : undefined}
            >
              <span className={clsx('text-xl', active && 'scale-110 transition-transform')}>{icon}</span>
              <span className={clsx('text-[10px] font-semibold tracking-wide', active && 'text-brand-700')}>
                {label}
              </span>
              {active && (
                <span className="absolute bottom-0 w-8 h-0.5 bg-brand-600 rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
