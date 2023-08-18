import type { Metadata } from 'next';

import { getLink } from '@/actions/get-link';
import { getWeekHit } from '@/actions/get-week-hit';
import { getMonthHit } from '@/actions/get-month-hit';
import { getDeviceHit } from '@/actions/get-device-hit';
import { getAllTimeHit } from '@/actions/get-all-time-hit';
import { getLocationHit } from '@/actions/get-location-hit';
import { getReferrerHit } from '@/actions/get-referrer-hit';

import Delete from '@/components/url/delete';
import EditForm from '@/components/url/edit-form';
import BackButton from '@/components/back-button';
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
  title: 'Short URL Details — URL Shortener'
};

const UrlDetailPage = async ({ params }: { params: { linkId: string } }) => {
  const link = await getLink(params.linkId);
  const weekData = await getWeekHit(params.linkId);
  const monthData = await getMonthHit(params.linkId);
  const deviceData = await getDeviceHit(params.linkId);
  const allTimeData = await getAllTimeHit(params.linkId);
  const locationData = await getLocationHit(params.linkId);
  const referrerData = await getReferrerHit(params.linkId);

  return (
    <>
      <BackButton />
      <Card className='rounded-lg border-none mt-4'>
        <CardHeader className='relative mx-[1px]'>
          <CardTitle className='text-xl font-bold'>Edit Short URL</CardTitle>
          <CardDescription>
            Edit short URL details using this form.
          </CardDescription>
          <Delete id={params.linkId} />
        </CardHeader>
        <CardContent className='pb-9'>
          <EditForm initialData={link} />
        </CardContent>
      </Card>
      <div className='grid xl:grid-rows-2 xl:grid-cols-2 xl:grid-flow-col gap-4 mt-4'>
        <Card className='xl:row-span-2 rounded-lg border-none min-h-[1082px]'>
          <CardHeader className='relative mx-[1px]'>
            <CardTitle className='text-xl font-bold'>
              Traffic Locations
            </CardTitle>
            <CardDescription>
              The charts below shows historical click location.
            </CardDescription>
          </CardHeader>
          <CardContent className='pb-9 grid space-y-8'>
            <PieChart title='Top 5 countries' data={locationData} />
            <GeoChart title='Overall traffic' data={locationData} />
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
      </div>
    </>
  );
};

export default UrlDetailPage;
