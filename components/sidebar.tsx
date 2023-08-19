'use client';

import Link from 'next/link';
import { Link as LinkIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import useStore from '@/hooks/use-store';
import MainNav from '@/components/main-nav';
import { Button } from '@/components/ui/button';
import SidebarToggle from '@/components/sidebar-toggle';
import useSidebarToggle from '@/hooks/use-sidebar-toggle';

const Sidebar = () => {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 z-20 h-screen transition-all ease-in-out duration-300',
        sidebar?.isOpen === false
          ? '-translate-x-full lg:translate-x-0 w-[90px]'
          : '-translate-x-full lg:translate-x-0 w-72'
      )}
    >
      <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
      <div className='relative h-full px-3 py-4 overflow-y-auto shadow-md dark:shadow-gray-800'>
        <Button
          className={cn(
            'transition-all ease-in-out duration-300 mb-1',
            sidebar?.isOpen === false ? 'translate-x-1' : 'translate-x-9'
          )}
          variant='link'
          asChild
        >
          <Link href='/admin'>
            <LinkIcon
              className={cn(sidebar?.isOpen === false ? '-mt-1' : 'mr-2 -mt-1')}
              size={28}
              strokeWidth={3}
            />
            <h1
              className={cn(
                'font-extrabold text-lg whitespace-nowrap transition-all ease-in-out duration-300',
                sidebar?.isOpen === false
                  ? '-translate-x-96 opacity-0 hidden'
                  : 'translate-x-0 opacity-100'
              )}
            >
              URL Shortener
            </h1>
          </Link>
        </Button>
        <MainNav isOpen={sidebar?.isOpen} />
      </div>
    </aside>
  );
};

export default Sidebar;
