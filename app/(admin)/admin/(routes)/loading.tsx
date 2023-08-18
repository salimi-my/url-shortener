import { Link as LinkIcon, MapPin, MousePointer, Share } from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

export default function DashboardLoading() {
  return (
    <>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card className='rounded-lg border-none'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total URL</CardTitle>
            <LinkIcon className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <Skeleton className='h-7 w-[100px]' />
            <p className='text-xs text-muted-foreground mt-1'>
              total links all time
            </p>
          </CardContent>
        </Card>
        <Card className='rounded-lg border-none'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Hit</CardTitle>
            <MousePointer className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <Skeleton className='h-7 w-[100px]' />
            <p className='text-xs text-muted-foreground mt-1'>
              total hits all time
            </p>
          </CardContent>
        </Card>
        <Card className='rounded-lg border-none'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Top URL</CardTitle>
            <Share className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <Skeleton className='h-7 w-[100px]' />
            <p className='text-xs text-muted-foreground mt-1'>
              top link keyword
            </p>
          </CardContent>
        </Card>
        <Card className='rounded-lg border-none'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Top Country</CardTitle>
            <MapPin className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <Skeleton className='h-7 w-[100px]' />
            <p className='text-xs text-muted-foreground mt-1'>
              top hit location
            </p>
          </CardContent>
        </Card>
      </div>
      <div className='grid xl:grid-cols-2 gap-4 mt-4'>
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
        <Card className='xl:col-span-2 rounded-lg border-none'>
          <CardHeader className='relative mx-[1px]'>
            <CardTitle className='text-xl font-bold'>
              Traffic Locations
            </CardTitle>
            <CardDescription>
              The charts below shows historical click location.
            </CardDescription>
          </CardHeader>
          <CardContent className='pb-9 grid xl:grid-cols-2 gap-4'>
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
      </div>
    </>
  );
}
