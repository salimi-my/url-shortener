import { getLink } from '@/actions/get-link';
import { getWeekHit } from '@/actions/get-week-hit';

import Delete from '@/components/url/delete';
import EditForm from '@/components/url/edit-form';
import BackButton from '@/components/back-button';
import LineChartsTabs from '@/components/url/line-charts-tabs';
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
      <div className='grid xl:grid-cols-2 gap-4'>
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
            <LineChartsTabs weekData={weekData} />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default LinkPage;
