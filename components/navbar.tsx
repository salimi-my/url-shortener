import { ClerkLoaded, ClerkLoading, UserButton } from '@clerk/nextjs';

import PageTitle from '@/components/page-title';
import SheetMenu from '@/components/sheet-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { ModeToggle } from '@/components/mode-toggle';

const Navbar = () => {
  return (
    <header className='z-10 supports-backdrop-blur:bg-background/60 sticky top-0 w-full shadow dark:shadow-secondary bg-background/95 backdrop-blur'>
      <div className='mx-8 flex h-14 items-center'>
        <div className='flex items-center space-x-4 lg:space-x-0'>
          <SheetMenu />
          <PageTitle />
        </div>
        <div className='flex flex-1 items-center space-x-3 justify-end'>
          <ModeToggle />
          <ClerkLoading>
            <Skeleton className='h-8 w-8 rounded-full' />
          </ClerkLoading>
          <ClerkLoaded>
            <UserButton afterSignOutUrl='/' />
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
