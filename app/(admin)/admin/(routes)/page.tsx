import type { Metadata } from 'next';
import { Link as LinkIcon, MapPin, MousePointer, Share } from 'lucide-react';

import { getWeekHit } from '@/actions/get-week-hit';
import { getMonthHit } from '@/actions/get-month-hit';
import { getStatistic } from '@/actions/get-statistic';
import { getDeviceHit } from '@/actions/get-device-hit';
import { getAllTimeHit } from '@/actions/get-all-time-hit';
import { getLocationHit } from '@/actions/get-location-hit';
import { getReferrerHit } from '@/actions/get-referrer-hit';

import PieChart from '@/components/chart/pie-chart';
import GeoChart from '@/components/chart/geo-chart';
import DonutChart from '@/components/chart/donut-chart';
import StatisticChartsTabs from '@/components/url/statistic-charts-tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Dashboard — URL Shortener'
};

const DashboardPage = async () => {
  const { totalLinks, totalHits, topLink, topCountry } = await getStatistic();
  const weekData = await getWeekHit();
  const monthData = await getMonthHit();
  const deviceData = await getDeviceHit();
  const allTimeData = await getAllTimeHit();
  const locationData = await getLocationHit();
  const referrerData = await getReferrerHit();

  return (
    <>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card className='rounded-lg border-none'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total URL</CardTitle>
            <LinkIcon className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {typeof totalLinks === 'number' ? totalLinks : 0}
            </div>
            <p className='text-xs text-muted-foreground'>
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
            <div className='text-2xl font-bold'>
              {typeof totalHits === 'number' ? totalHits : 0}
            </div>
            <p className='text-xs text-muted-foreground'>total hits all time</p>
          </CardContent>
        </Card>
        <Card className='rounded-lg border-none'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Top URL</CardTitle>
            <Share className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold max-w-[206px] truncate'>
              {topLink !== null ? topLink?.keyword : 'N/A'}
            </div>
            <p className='text-xs text-muted-foreground'>top link keyword</p>
          </CardContent>
        </Card>
        <Card className='rounded-lg border-none'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Top Country</CardTitle>
            <MapPin className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold max-w-[206px] truncate'>
              {topCountry}
            </div>
            <p className='text-xs text-muted-foreground'>top hit location</p>
          </CardContent>
        </Card>
      </div>
      <div className='grid xl:grid-cols-2 gap-4 mt-4'>
        <Card className='rounded-lg border-none min-h-[538px]'>
          <CardHeader className='relative mx-[1px]'>
            <CardTitle className='text-xl font-bold'>
              Traffic Statistics
            </CardTitle>
            <CardDescription>
              The charts below shows historical click count.
            </CardDescription>
          </CardHeader>
          <CardContent className='pb-9'>
            <StatisticChartsTabs
              weekData={weekData}
              monthData={monthData}
              allTimeData={allTimeData}
            />
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
              <DonutChart title='Top 5 referrers' data={referrerData} />
            </div>
            <div className='flex flex-col'>
              <DonutChart title='Device categories' data={deviceData} />
            </div>
          </CardContent>
        </Card>
        <Card className='xl:col-span-2 rounded-lg border-none min-h-[538px]'>
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
              <PieChart title='Top 5 countries' data={locationData} />
            </div>
            <div className='flex flex-col'>
              <GeoChart title='Overall traffic' data={locationData} />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default DashboardPage;
