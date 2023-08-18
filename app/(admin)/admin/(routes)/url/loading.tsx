import { DataTableLoading } from '@/components/url/data-table/data-table-loading';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

export default function UrlLoading() {
  return (
    <Card className='rounded-lg border-none'>
      <CardHeader className='mx-[1px] pb-9'>
        <CardTitle className='text-xl font-bold'>Short URL</CardTitle>
        <CardDescription>
          Here&apos;s the list of your short URLs.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DataTableLoading columnCount={5} />
      </CardContent>
    </Card>
  );
}
