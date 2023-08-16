'use client';

import axios from 'axios';
import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { AlertModal } from '@/components/modal/alert-modal';

interface DeleteProps {
  id: string;
}

const Delete: React.FC<DeleteProps> = ({ id }) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);

      await axios.delete(`/api/link/${id}`);

      router.back();
      router.refresh();
      toast({
        variant: 'success',
        title: 'Success!',
        description: 'Short URL has been deleted.'
      });
    } catch (error) {
      console.log(error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.'
      });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <Button
        onClick={() => setOpen(true)}
        variant='outline'
        size='icon'
        className='absolute right-0 !mt-0 mr-6 group hover:border-destructive hover:bg-transparent h-7 w-7 sm:h-9 sm:w-9'
      >
        <Trash2 className='group-hover:text-destructive h-5 w-5 sm:h-6 sm:w-6' />
      </Button>
    </>
  );
};

export default Delete;
