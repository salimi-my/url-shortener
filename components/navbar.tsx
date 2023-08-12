import { UserButton } from '@clerk/nextjs';
import PageTitle from '@/components/page-title';

const Navbar = () => {
  return (
    <header className='supports-backdrop-blur:bg-background/60 sticky top-0 z-20 w-full shadow bg-background/95 backdrop-blur'>
      <div className='mx-8 flex h-14 items-center'>
        <div className='mr-4 hidden md:flex'>
          <PageTitle />
        </div>
        <div className='flex flex-1 items-center justify-between space-x-2 md:justify-end'>
          <UserButton afterSignOutUrl='/' />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
