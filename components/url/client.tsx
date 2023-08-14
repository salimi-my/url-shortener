'use client';

import { format } from 'date-fns';
import { Link } from '@prisma/client';
import { useMemo } from 'react';
import { type ColumnDef } from '@tanstack/react-table';

import { DataTable } from '@/components/url/data-table/data-table';
import { DataTableColumnHeader } from './data-table/data-table-column-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { CellAction } from './data-table/data-table-action';

interface UrlClientProps {
  data: Link[];
  pageCount: number;
}

const UrlClient: React.FC<UrlClientProps> = ({ data, pageCount }) => {
  const columns = useMemo<ColumnDef<Link, unknown>[]>(
    () => [
      {
        accessorKey: 'keyword',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Short URL' />
        ),
        cell: ({ row }) => {
          return (
            <p className='max-w-[500px] truncate font-medium'>
              <a
                className='hover:underline'
                href={`/${row.getValue('keyword')}`}
                target='_blank'
              >
                {row.getValue('keyword')}
              </a>
            </p>
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
            <div className='flex flex-col'>
              <p className='max-w-[400px] truncate font-medium'>
                <a
                  className='hover:underline'
                  href={row.getValue('url')}
                  target='_blank'
                >
                  {row.original.title}
                </a>
              </p>
              <p className='max-w-[400px] truncate text-xs'>
                <a
                  className='hover:underline'
                  href={row.getValue('url')}
                  target='_blank'
                >
                  {row.getValue('url')}
                </a>
              </p>
            </div>
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
      },
      {
        id: 'action',
        cell: ({ row }) => <CellAction data={row.original} />
      }
    ],
    []
  );

  return (
    <Card className='rounded-lg border-none'>
      <CardHeader className='mx-[1px] pb-9'>
        <CardTitle className='text-xl font-bold'>Short URL</CardTitle>
        <CardDescription>
          Here&apos;s the list of your short URLs.
        </CardDescription>
      </CardHeader>
      <CardContent>
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
