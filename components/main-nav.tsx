'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LayoutGrid, List, User } from 'lucide-react';

export function MainNav({
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  const routes = [
    {
      href: '/admin',
      label: 'Dashboard',
      active: pathname === '/admin',
      icon: <LayoutGrid size={18} />
    },
    {
      href: '/admin/url',
      label: 'Short URL',
      active: pathname === '/admin/url',
      icon: <List size={18} />
    },
    {
      href: '/admin/profile',
      label: 'My Profile',
      active: pathname === '/admin/profile',
      icon: <User size={18} />
    }
  ];

  return (
    <nav className='mt-8'>
      <ul className={cn('flex flex-col items-start space-y-1 px-2', className)}>
        {routes.map((route) => (
          <Link className='w-full' key={route.href} href={route.href}>
            <Button
              variant={route.active ? 'secondary' : 'ghost'}
              className='w-full justify-start h-10'
            >
              <span className='mr-2'>{route.icon}</span>
              {route.label}
            </Button>
          </Link>
        ))}
      </ul>
    </nav>
  );
}
