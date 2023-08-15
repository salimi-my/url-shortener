import prismadb from '@/lib/prismadb';

import EditForm from '@/components/url/edit-form';
import BackButton from '@/components/back-button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

const LinkPage = async ({ params }: { params: { linkId: string } }) => {
  const link = await prismadb.link.findUnique({
    where: {
      id: params.linkId
    }
  });

  return (
    <>
      <BackButton />
      <Card className='rounded-lg border-none mt-4'>
        <CardHeader className='mx-[1px]'>
          <CardTitle className='text-xl font-bold'>Edit Short URL</CardTitle>
          <CardDescription>
            Edit short URL details using this form.
          </CardDescription>
        </CardHeader>
        <CardContent className='pb-9'>
          <EditForm initialData={link} />
        </CardContent>
      </Card>
    </>
  );
};

export default LinkPage;
