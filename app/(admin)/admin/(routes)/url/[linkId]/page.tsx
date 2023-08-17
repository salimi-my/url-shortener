import { getLink } from '@/actions/get-link';
import { getWeekHit } from '@/actions/get-week-hit';
import { getMonthHit } from '@/actions/get-month-hit';
import { getAllTimeHit } from '@/actions/get-all-time-hit';
import { getLocationHit } from '@/actions/get-location-hit';

import Delete from '@/components/url/delete';
import EditForm from '@/components/url/edit-form';
import BackButton from '@/components/back-button';
import TopLocation from '@/components/pie-chart/top-location';
import LineChartsTabs from '@/components/url/line-charts-tabs';
import LocationChart from '@/components/geo-chart/location-chart';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

const LinkPage = async ({ params }: { params: { linkId: string } }) => {
  const link = await getLink(params.linkId);
  const weekData = await getWeekHit(params.linkId);
  const monthData = await getMonthHit(params.linkId);
  const allTimeData = await getAllTimeHit(params.linkId);
  const locationData = await getLocationHit(params.linkId);

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
      <div className='grid xl:grid-rows-2 xl:grid-cols-2 xl:grid-flow-col gap-4'>
        <Card className='xl:row-span-2 rounded-lg border-none mt-4'>
          <CardHeader className='relative mx-[1px]'>
            <CardTitle className='text-xl font-bold'>
              Traffic Locations
            </CardTitle>
            <CardDescription>
              The charts below shows historical click location.
            </CardDescription>
          </CardHeader>
          <CardContent className='pb-9 grid space-y-8'>
            <TopLocation data={locationData} />
            <LocationChart data={locationData} />
          </CardContent>
        </Card>
        <Card className='rounded-lg border-none mt-4'>
          <CardHeader className='relative mx-[1px]'>
            <CardTitle className='text-xl font-bold'>
              Traffic Statistics
            </CardTitle>
            <CardDescription>
              The charts below shows historical click count.
            </CardDescription>
          </CardHeader>
          <CardContent className='pb-9'>
            <LineChartsTabs
              weekData={weekData}
              monthData={monthData}
              allTimeData={allTimeData}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default LinkPage;
