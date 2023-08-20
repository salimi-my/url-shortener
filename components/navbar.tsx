import { ClerkLoaded, ClerkLoading, UserButton } from '@clerk/nextjs';

import AddUrl from '@/components/add-url';
import PageTitle from '@/components/page-title';
import SheetMenu from '@/components/sheet-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { ModeToggle } from '@/components/mode-toggle';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from './ui/tooltip';

const Navbar = () => {
  return (
    <header className='z-10 supports-backdrop-blur:bg-background/60 sticky top-0 w-full shadow dark:shadow-secondary bg-background/95 backdrop-blur'>
      <div className='mx-8 flex h-14 items-center'>
        <div className='flex items-center space-x-4 lg:space-x-0'>
          <SheetMenu />
          <PageTitle />
        </div>
        <div className='flex flex-1 items-center space-x-2 justify-end'>
          <AddUrl />
          <ModeToggle />
          <TooltipProvider disableHoverableContent>
            <Tooltip delayDuration={100}>
              <TooltipTrigger asChild>
                <div>
                  <ClerkLoading>
                    <Skeleton className='h-8 w-8 rounded-full' />
                  </ClerkLoading>
                  <ClerkLoaded>
                    <UserButton afterSignOutUrl='/sign-in' />
                  </ClerkLoaded>
                </div>
              </TooltipTrigger>
              <TooltipContent side='bottom'>Profile</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
