import prismadb from '@/lib/prismadb';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import EditForm from '@/components/url/edit-form';

const LinkPage = async ({ params }: { params: { linkId: string } }) => {
  const link = await prismadb.link.findUnique({
    where: {
      id: params.linkId
    }
  });

  return (
    <>
      <Button className='bg-white' variant='outline' asChild>
        <Link href='/admin/url'>
          <ChevronLeft size={18} />
          Back
        </Link>
      </Button>
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
