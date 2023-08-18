import { Skeleton } from '@/components/ui/skeleton';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

export default function UrlDetailLoading() {
  return (
    <>
      <Skeleton className='h-9 w-[85px]' />
      <Card className='rounded-lg border-none mt-4'>
        <CardHeader className='relative mx-[1px]'>
          <CardTitle className='text-xl font-bold'>Edit Short URL</CardTitle>
          <CardDescription>
            Edit short URL details using this form.
          </CardDescription>
          <Skeleton className='absolute right-0 !mt-0 mr-6 group hover:border-destructive hover:bg-transparent h-7 w-7 sm:h-9 sm:w-9' />
        </CardHeader>
        <CardContent className='pb-9'>
          <div className='flex flex-col lg:grid lg:grid-cols-5 gap-4 lg:items-end'>
            <div className='flex flex-col'>
              <Skeleton className='h-5 w-[70px]' />
              <Skeleton className='h-9 w-full mt-3' />
            </div>
            <div className='flex flex-col lg:col-span-2'>
              <Skeleton className='h-5 w-[90px]' />
              <Skeleton className='h-9 w-full mt-3' />
            </div>
            <div className='flex flex-col lg:flex-row gap-8 lg:gap-4 lg:items-end lg:col-span-2'>
              <div className='flex flex-col relative flex-1'>
                <Skeleton className='h-5 w-[90px]' />
                <Skeleton className='h-9 w-full mt-3' />
              </div>
              <Skeleton className='h-9 w-[126px] ml-auto' />
            </div>
          </div>
        </CardContent>
      </Card>
      <div className='grid xl:grid-rows-2 xl:grid-cols-2 xl:grid-flow-col gap-4 mt-4'>
        <Card className='xl:row-span-2 rounded-lg border-none'>
          <CardHeader className='relative mx-[1px]'>
            <CardTitle className='text-xl font-bold'>
              Traffic Locations
            </CardTitle>
            <CardDescription>
              The charts below shows historical click location.
            </CardDescription>
          </CardHeader>
          <CardContent className='pb-9 grid space-y-8'>
            <div className='flex flex-col'>
              <p className='font-medium'>Top 5 countries</p>
              <div className='flex justify-center items-center'>
                <Skeleton className='h-[300px] w-[300px] md:h-[360px] md:w-[360px] rounded-full mt-8' />
              </div>
            </div>
            <div className='flex flex-col'>
              <p className='font-medium'>Overall traffic</p>
              <Skeleton className='h-[360px] w-full mt-8' />
            </div>
          </CardContent>
        </Card>
        <Card className='rounded-lg border-none'>
          <CardHeader className='relative mx-[1px]'>
            <CardTitle className='text-xl font-bold'>
              Traffic Statistics
            </CardTitle>
            <CardDescription>
              The charts below shows historical click count.
            </CardDescription>
          </CardHeader>
          <CardContent className='pb-9'>
            <Skeleton className='h-9 w-full' />
            <Skeleton className='h-9 w-[300px] mt-4' />
            <Skeleton className='h-[300px] w-full mt-2' />
          </CardContent>
        </Card>
        <Card className='rounded-lg border-none'>
          <CardHeader className='relative mx-[1px]'>
            <CardTitle className='text-xl font-bold'>Traffic Sources</CardTitle>
            <CardDescription>
              The charts below shows historical click sources.
            </CardDescription>
          </CardHeader>
          <CardContent className='pb-9 grid xl:grid-cols-2 gap-6'>
            <div className='flex flex-col'>
              <p className='font-medium'>Top 5 referrers</p>
              <div className='flex justify-center items-center'>
                <Skeleton className='h-[265px] w-[265px] rounded-full mt-8' />
              </div>
            </div>
            <div className='flex flex-col'>
              <p className='font-medium'>Device categories</p>
              <div className='flex justify-center items-center'>
                <Skeleton className='h-[265px] w-[265px] rounded-full mt-8' />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
