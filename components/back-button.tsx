'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

const BackButton = () => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      className='bg-white'
      variant='outline'
    >
      <ChevronLeft size={18} />
      Back
    </Button>
  );
};

export default BackButton;
