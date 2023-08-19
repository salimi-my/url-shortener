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
          <Button
            className='flex justify-center items-center pb-2 pt-1'
            variant='link'
            asChild
          >
            <Link href='/admin'>
              <LinkIcon className='mr-2 -mt-1' size={28} strokeWidth={3} />
              <h1 className='font-extrabold text-lg'>URL Shortener</h1>
            </Link>
          </Button>
        </SheetHeader>
        <MainNav isOpen />
      </SheetContent>
    </Sheet>
  );
};

export default SheetMenu;
