'use client';

import * as z from 'zod';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import isSlug from 'validator/es/lib/isSlug';

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
import { AlertCircle } from 'lucide-react';

const formSchema = z.object({
  url: z.string().toLowerCase().url({ message: 'Please enter a valid URL.' }),
  keyword: z
    .string()
    .toLowerCase()
    .min(3, { message: 'Please enter 3 or more characters.' })
    .refine((string) => isSlug(string), {
      message: 'Please enter valid slug.'
    })
});

const UrlModal = () => {
  const urlModal = useUrlModal();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: '',
      keyword: ''
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setAlert('');

    try {
      setLoading(true);

      const res = await axios.get('https://api.ipify.org/?format=json');
      const response = await axios.post('/api/link', values, {
        headers: {
          'client-ip-address': res.data.ip
        }
      });

      if (response.data.success) {
        console.log(response.data.link);
      }
    } catch (error: any) {
      if (error.response.data.error === 'Please choose different keyword.') {
        setAlert(error.response.data.error);
      } else {
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title='Create Short URL'
      description='Paste your long link to be shortened with custom keyword.'
      isOpen={urlModal.isOpen}
      onClose={urlModal.onClose}
    >
      <div className='py-2 pb-4'>
        {alert.length > 0 && (
          <div className='flex items-center bg-red-100 rounded-md border border-destructive p-2 px-3 text-sm text-destructive mb-4'>
            <AlertCircle className='mr-2' />
            <p>{alert}</p>
          </div>
        )}
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
                type='button'
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
