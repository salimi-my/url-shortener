import Link from 'next/link';

import { Button } from '@/components/ui/button';

interface NotFoundProps {
  message: string;
  isKeyword: boolean;
}

const NotFound: React.FC<NotFoundProps> = ({ message, isKeyword }) => {
  return (
    <div className='flex flex-col justify-center items-center h-screen w-full'>
      <h1 className='text-8xl leading-[6rem] md:text-[10rem] md:leading-[9rem] font-medium'>
        OOPS!
      </h1>
      <div className='text-xl md:text-2xl px-4 py-1 bg-white rounded-lg mb-3'>
        {isKeyword && (
          <p className='text-center'>
            Keyword: <span className='font-bold underline'>{message}</span> not
            found.
          </p>
        )}
        {!isKeyword && <p className='text-center'>{message}</p>}
      </div>
      <Button>
        <Link href='/'>Go to Home</Link>
      </Button>
    </div>
  );
};

export default NotFound;
