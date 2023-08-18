import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

interface DataTableLoadingProps {
  columnCount: number;
  rowCount?: number;
}

export function DataTableLoading({
  columnCount,
  rowCount = 10
}: DataTableLoadingProps) {
  return (
    <div className='w-full space-y-3 overflow-auto'>
      <div className='flex w-full items-center justify-between space-x-2 overflow-auto py-1 px-[1px]'>
        <div className='flex flex-1 items-center space-x-2'>
          <Skeleton className='h-7 w-[140px] lg:w-[250px]' />
        </div>
        <div className='flex items-center space-x-2'>
          <Skeleton className='hidden h-7 w-[70px] lg:flex' />
          <Skeleton className='h-7 w-[96px] lg:flex' />
        </div>
      </div>
      <div className='rounded-md border px-[1px]'>
        <Table>
          <TableHeader>
            {Array.from({ length: 1 }).map((_, i) => (
              <TableRow key={i} className='hover:bg-transparent'>
                {Array.from({ length: columnCount }).map((_, i) => (
                  <TableHead key={i}>
                    <Skeleton className='h-6 w-full' />
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {Array.from({ length: rowCount }).map((_, i) => (
              <TableRow key={i} className='hover:bg-transparent'>
                {Array.from({ length: columnCount }).map((_, i) => (
                  <TableCell key={i}>
                    <Skeleton className='h-6 w-full' />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className='flex w-full flex-col items-center justify-between gap-4 overflow-auto py-1 sm:flex-row sm:gap-8 px-[1px]'>
        <div className='flex items-center space-x-2'>
          <Skeleton className='h-8 w-24' />
          <Skeleton className='h-8 w-[70px]' />
        </div>
        <div className='flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8'>
          <div className='flex w-[100px] items-center justify-center text-sm font-medium'>
            <Skeleton className='h-8 w-20' />
          </div>
          <div className='flex items-center space-x-2'>
            <Skeleton className='hidden h-8 w-8 lg:block' />
            <Skeleton className='h-8 w-8' />
            <Skeleton className='h-8 w-8' />
            <Skeleton className='hidden h-8 w-8 lg:block' />
          </div>
        </div>
      </div>
    </div>
  );
}
