import Link from 'next/link';
import { LinkIcon, Menu } from 'lucide-react';

import MainNav from '@/components/main-nav';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger
} from '@/components/ui/sheet';

const SheetMenu = () => {
  return (
    <Sheet>
      <SheetTrigger className='lg:hidden' asChild>
        <Button className='h-8' variant='outline' size='icon'>
          <Menu size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className='sm:w-72 px-3' side='left'>
        <SheetHeader>
          <h1 className='flex justify-center items-center font-extrabold text-xl pb-2 pt-1'>
            <LinkIcon className='mr-1 -mt-1' size={28} strokeWidth={3} />
            <Link href='/admin'>URL Shortener</Link>
          </h1>
        </SheetHeader>
        <MainNav />
      </SheetContent>
    </Sheet>
  );
};

export default SheetMenu;
