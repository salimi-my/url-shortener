'use client';

import * as z from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useUrlModal } from '@/hooks/use-url-modal';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';

const formSchema = z.object({
  url: z.string().toLowerCase().url({ message: 'Invalid URL' }),
  keyword: z
    .string()
    .toLowerCase()
    .min(3, { message: 'Must be 3 or more characters long' })
});

const UrlModal = () => {
  const urlModal = useUrlModal();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: '',
      keyword: ''
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Modal
      title='Create Short URL'
      description='Paste your long link to be shortened with custom keyword.'
      isOpen={urlModal.isOpen}
      onClose={urlModal.onClose}
    >
      <div className='py-2 pb-4'>
        <Form {...form}>
          <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='url'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paste the Long URL</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='Example: https://super-long-link.com/long-params'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='keyword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short URL Keyword</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='Example: short'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='pt-6 space-x-2 flex items-center justify-end w-full'>
              <Button
                disabled={loading}
                variant='outline'
                onClick={urlModal.onClose}
              >
                Cancel
              </Button>
              <Button disabled={loading} type='submit'>
                Shorten URL
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};

export default UrlModal;
