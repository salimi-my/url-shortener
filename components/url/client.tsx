'use client';

import { Button } from '@/components/ui/button';
import { useUrlModal } from '@/hooks/use-url-modal';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

const UrlClient = () => {
  const urlModal = useUrlModal();

  return (
    <Card className='rounded-lg border-none'>
      <CardHeader>
        <CardTitle className='text-xl font-bold'>Short URL</CardTitle>
        <CardDescription>
          Here&apos;s the list of your short URLs.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={() => urlModal.onOpen()}>Add URL</Button>
      </CardContent>
    </Card>
  );
};

export default UrlClient;
