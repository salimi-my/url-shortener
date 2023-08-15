import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { Link as LinkModel } from '@prisma/client';
import { Copy, Edit, Trash2 } from 'lucide-react';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';

import { useOrigin } from '@/hooks/use-origin';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { AlertModal } from '@/components/modal/alert-modal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';

interface CellActionProps {
  data: LinkModel;
}

export function CellAction({ data }: CellActionProps) {
  const origin = useOrigin();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onCopy = (keyword: string) => {
    navigator.clipboard.writeText(`${origin}/${keyword}`);
    toast({
      variant: 'success',
      title: 'Success!',
      description: 'Short URL has been copied.'
    });
  };

  const onDelete = async () => {
    try {
      setLoading(true);

      await axios.delete(`/api/link/${data.id}`);

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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-label='Open menu'
            variant='ghost'
            className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
          >
            <DotsHorizontalIcon className='h-4 w-4' aria-hidden='true' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <Link href={`/admin/url/${data.id}`}>
            <DropdownMenuItem>
              <Edit className='mr-2' size={14} />
              View
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem onClick={() => onCopy(data.keyword)}>
            <Copy className='mr-2' size={14} />
            Copy
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className='group' onClick={() => setOpen(true)}>
            <Trash2 className='mr-2 group-hover:text-destructive' size={14} />
            <span className='group-hover:text-destructive'>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
