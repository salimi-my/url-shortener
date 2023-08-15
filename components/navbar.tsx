import { UserButton } from '@clerk/nextjs';

import PageTitle from '@/components/page-title';
import SheetMenu from '@/components/sheet-menu';

const Navbar = () => {
  return (
    <header className='supports-backdrop-blur:bg-background/60 sticky top-0 z-20 w-full shadow bg-background/95 backdrop-blur'>
      <div className='mx-8 flex h-14 items-center'>
        <div className='flex items-center space-x-4 lg:space-x-0'>
          <SheetMenu />
          <PageTitle />
        </div>
        <div className='flex flex-1 items-center space-x-2 justify-end'>
          <UserButton afterSignOutUrl='/' />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
