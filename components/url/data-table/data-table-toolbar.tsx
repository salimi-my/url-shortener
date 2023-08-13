'use client';

import { PlusCircle } from 'lucide-react';
import { Cross2Icon } from '@radix-ui/react-icons';
import type { Table } from '@tanstack/react-table';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useUrlModal } from '@/hooks/use-url-modal';
import type { DataTableSearchableColumn } from '@/types';
import { DataTableViewOptions } from '@/components/url/data-table/data-table-view-options';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchableColumns?: DataTableSearchableColumn<TData>[];
}

export function DataTableToolbar<TData>({
  table,
  searchableColumns = []
}: DataTableToolbarProps<TData>) {
  const urlModal = useUrlModal();

  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className='flex items-center justify-between py-1'>
      <div className='flex flex-1 items-center space-x-2'>
        {searchableColumns.length > 0 &&
          searchableColumns.map(
            (column) =>
              table.getColumn(column.id ? String(column.id) : '') && (
                <Input
                  key={String(column.id)}
                  placeholder={`Search ${column.title}...`}
                  value={
                    (table
                      .getColumn(String(column.id))
                      ?.getFilterValue() as string) ?? ''
                  }
                  onChange={(event) =>
                    table
                      .getColumn(String(column.id))
                      ?.setFilterValue(event.target.value)
                  }
                  className='h-8 w-[150px] lg:w-[250px]'
                />
              )
          )}
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
            Reset
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
      <div className='flex items-center space-x-2'>
        <DataTableViewOptions table={table} />
        <Button size='sm' className='h-8' onClick={() => urlModal.onOpen()}>
          <PlusCircle size={16} className='mr-2' />
          Add URL
        </Button>
      </div>
    </div>
  );
}
