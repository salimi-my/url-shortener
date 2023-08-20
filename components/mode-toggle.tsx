'use client';

import { useTheme } from 'next-themes';
import { MixerVerticalIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface ToggleProps {
  float?: boolean;
}

export function ModeToggle({ float }: ToggleProps) {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger
              className={cn(float ? 'absolute top-1 right-1' : '')}
              asChild
            >
              <Button
                className='rounded-full w-8 h-8'
                variant='outline'
                size='icon'
              >
                <SunIcon className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-transform ease-in-out duration-500 dark:-rotate-90 dark:scale-0' />
                <MoonIcon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-transform ease-in-out duration-500 dark:rotate-0 dark:scale-100' />
                <span className='sr-only'>Switch Theme</span>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side='bottom'>Switch Theme</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => setTheme('light')}>
          <SunIcon className='h-4 w-4 mr-2 dark:text-foreground' />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          <MoonIcon className='h-4 w-4 mr-2 dark:text-foreground' />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          <MixerVerticalIcon className='h-4 w-4 mr-2 dark:text-foreground' />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
