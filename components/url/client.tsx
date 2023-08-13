'use client';

import { format } from 'date-fns';
import { Link } from '@prisma/client';
import { useMemo } from 'react';
import { type ColumnDef } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { useUrlModal } from '@/hooks/use-url-modal';
import { DataTable } from '@/components/url/data-table/data-table';
import { DataTableColumnHeader } from './data-table/data-table-column-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

interface UrlClientProps {
  data: Link[];
  pageCount: number;
}

const UrlClient: React.FC<UrlClientProps> = ({ data, pageCount }) => {
  const urlModal = useUrlModal();

  const columns = useMemo<ColumnDef<Link, unknown>[]>(
    () => [
      {
        accessorKey: 'keyword',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Short URL' />
        ),
        cell: ({ row }) => {
          return (
            <span className='max-w-[500px] truncate font-medium'>
              {row.getValue('keyword')}
            </span>
          );
        }
      },
      {
        accessorKey: 'url',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Original URL' />
        ),
        cell: ({ row }) => {
          return (
            <span className='max-w-[500px] truncate'>
              <a
                className='hover:underline'
                href={row.getValue('url')}
                target='_blank'
              >
                {row.getValue('url')}
              </a>
            </span>
          );
        }
      },
      {
        accessorKey: 'createdAt',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Created' />
        ),
        cell: ({ row }) => format(row.getValue('createdAt'), 'dd MMM yyyy')
      },
      {
        accessorKey: 'click',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Clicks' />
        ),
        cell: ({ row }) => row.getValue('click')
      },
      {
        accessorKey: 'ip',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='IP Address' />
        ),
        cell: ({ row }) => row.getValue('ip')
      }
    ],
    []
  );

  return (
    <Card className='rounded-lg border-none'>
      <CardHeader>
        <CardTitle className='text-xl font-bold'>Short URL</CardTitle>
        <CardDescription>
          Here&apos;s the list of your short URLs.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button className='mb-4' onClick={() => urlModal.onOpen()}>
          Add URL
        </Button>
        <DataTable
          columns={columns}
          data={data}
          pageCount={pageCount}
          searchableColumns={[
            {
              id: 'keyword',
              title: 'link'
            }
          ]}
        />
      </CardContent>
    </Card>
  );
};

export default UrlClient;
