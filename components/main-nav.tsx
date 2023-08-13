'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LayoutGrid, List, LogOut, User } from 'lucide-react';
import { SignOutButton } from '@clerk/nextjs';

const MainNav = ({ className }: React.HtmlHTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();

  const routes = [
    {
      href: '/admin',
      label: 'Dashboard',
      active: pathname === '/admin',
      icon: <LayoutGrid size={18} />
    },
    {
      href: '/admin/url?page=1&per_page=10',
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
          <li className='w-full' key={route.href}>
            <Link href={route.href}>
              <Button
                variant={route.active ? 'secondary' : 'ghost'}
                className='w-full justify-start h-10'
              >
                <span className='mr-4'>{route.icon}</span>
                {route.label}
              </Button>
            </Link>
          </li>
        ))}
        <li className='w-full'>
          <SignOutButton>
            <Button variant='ghost' className='w-full justify-start h-10'>
              <span className='mr-4'>
                <LogOut size={18} />
              </span>
              Sign Out
            </Button>
          </SignOutButton>
        </li>
      </ul>
    </nav>
  );
};

export default MainNav;
