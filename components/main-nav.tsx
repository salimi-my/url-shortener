'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, List, LogOut, User } from 'lucide-react';
import { ClerkLoaded, ClerkLoading, SignOutButton } from '@clerk/nextjs';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

interface MainNavProps {
  isOpen: boolean | undefined;
}

const MainNav: React.FC<MainNavProps> = ({ isOpen }) => {
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
      active: pathname.includes('/admin/url'),
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
      <ul className='flex flex-col items-start space-y-1 px-2'>
        {routes.map((route) => (
          <li className='w-full' key={route.href}>
            <TooltipProvider disableHoverableContent>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <Button
                    variant={route.active ? 'secondary' : 'ghost'}
                    className='w-full justify-start h-10'
                    asChild
                  >
                    <Link href={route.href}>
                      <span className={cn(isOpen === false ? '' : 'mr-4')}>
                        {route.icon}
                      </span>
                      <p
                        className={cn(
                          'whitespace-nowrap transition-all ease-in-out duration-300',
                          isOpen === false
                            ? '-translate-x-96 opacity-0'
                            : 'translate-x-0 opacity-100'
                        )}
                      >
                        {route.label}
                      </p>
                    </Link>
                  </Button>
                </TooltipTrigger>
                {isOpen === false && (
                  <TooltipContent side='right'>{route.label}</TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </li>
        ))}
        <li className='w-full'>
          <ClerkLoading>
            <Button variant='ghost' className='w-full justify-start h-10'>
              <span className={cn(isOpen === false ? '' : 'mr-4')}>
                <LogOut size={18} />
              </span>
              <p
                className={cn(
                  'whitespace-nowrap transition-all ease-in-out duration-300',
                  isOpen === false
                    ? '-translate-x-96 opacity-0'
                    : 'translate-x-0 opacity-100'
                )}
              >
                Sign Out
              </p>
            </Button>
          </ClerkLoading>
          <ClerkLoaded>
            <SignOutButton>
              <TooltipProvider disableHoverableContent>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger asChild>
                    <Button
                      variant='ghost'
                      className='w-full justify-start h-10'
                    >
                      <span className={cn(isOpen === false ? '' : 'mr-4')}>
                        <LogOut size={18} />
                      </span>
                      <p
                        className={cn(
                          'whitespace-nowrap transition-all ease-in-out duration-300',
                          isOpen === false
                            ? '-translate-x-96 opacity-0'
                            : 'translate-x-0 opacity-100'
                        )}
                      >
                        Sign Out
                      </p>
                    </Button>
                  </TooltipTrigger>
                  {isOpen === false && (
                    <TooltipContent side='right'>Sign Out</TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </SignOutButton>
          </ClerkLoaded>
        </li>
      </ul>
    </nav>
  );
};

export default MainNav;
