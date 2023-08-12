import { Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';
import MainNav from '@/components/main-nav';

const Sidebar = () => {
  return (
    <aside className='fixed top-0 left-0 z-40 w-72 h-screen transition-transform -translate-x-full sm:translate-x-0'>
      <div className='h-full px-3 py-4 overflow-y-auto shadow-md'>
        <h1 className='flex justify-center items-center font-extrabold text-xl pb-2 pt-1'>
          <LinkIcon className='mr-1 -mt-1' size={28} strokeWidth={3} />
          <Link href='/admin'>URL Shortener</Link>
        </h1>
        <MainNav />
      </div>
    </aside>
  );
};

export default Sidebar;
