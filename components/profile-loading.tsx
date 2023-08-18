import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

const ProfileSkeletonLoading = () => {
  return (
    <Card className='rounded-lg border-none'>
      <CardContent className='flex p-0'>
        <div className='lg:w-60 lg:px-6 lg:py-[38px] lg:border-r'>
          <Skeleton className='h-8 mb-1 w-full' />
          <Skeleton className='h-8 w-full' />
        </div>
        <div className='flex-1 px-8 py-[38px]'>
          <div className='flex flex-col gap-8'>
            <Skeleton className='flex lg:hidden h-7 w-[65px]' />
            <div>
              <Skeleton className='h-10 mb-1 w-[150px]' />
              <Skeleton className='h-5 w-[200px]' />
            </div>
            <div>
              <Skeleton className='h-7 mb-1 w-[100px]' />
              <div className='flex items-center px-5 py-[10px] border-t space-x-4'>
                <Skeleton className='h-[50px] w-[50px] rounded-full' />
                <Skeleton className='h-5 w-[150px]' />
              </div>
            </div>
            <div>
              <Skeleton className='h-7 mb-1 w-[100px]' />
              <div className='flex flex-col px-5 py-[10px] border-t space-y-1'>
                <Skeleton className='h-[30px] w-full' />
                <Skeleton className='h-[30px] w-full' />
              </div>
            </div>
            <div>
              <Skeleton className='h-7 mb-1 w-[100px]' />
              <div className='flex flex-col px-5 py-[10px] border-t space-y-1'>
                <Skeleton className='h-[30px] w-full' />
                <Skeleton className='h-[30px] w-full' />
              </div>
            </div>
            <div>
              <Skeleton className='h-10 mb-1 w-[150px]' />
              <Skeleton className='h-5 w-[200px]' />
            </div>
            <div>
              <Skeleton className='h-7 mb-1 w-[100px]' />
              <div className='flex flex-col px-5 py-[10px] border-t space-y-1'>
                <Skeleton className='h-[30px] w-full' />
              </div>
            </div>
            <div>
              <Skeleton className='h-7 mb-1 w-[100px]' />
              <div className='flex flex-col px-5 py-[10px] border-t space-y-1'>
                <Skeleton className='h-[80px] w-full' />
              </div>
            </div>
            <div>
              <Skeleton className='h-7 mb-1 w-[100px]' />
              <div className='flex flex-col px-5 py-[10px] border-t space-y-1'>
                <Skeleton className='h-[80px] w-full' />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSkeletonLoading;
