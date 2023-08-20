import { PlusIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import { useUrlModal } from '@/hooks/use-url-modal';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

const AddUrl = () => {
  const urlModal = useUrlModal();

  return (
    <TooltipProvider disableHoverableContent>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <Button
            onClick={() => urlModal.onOpen()}
            className='rounded-full w-8 h-8'
            variant='outline'
            size='icon'
          >
            <PlusIcon className='h-[1.2rem] w-[1.2rem]' />
            <span className='sr-only'>Add URL</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side='bottom'>Add URL</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AddUrl;
