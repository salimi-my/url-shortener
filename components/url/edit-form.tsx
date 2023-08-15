'use client';

import * as z from 'zod';
import axios from 'axios';
import { useState } from 'react';
import { Link } from '@prisma/client';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import isSlug from 'validator/es/lib/isSlug';
import { useParams, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';

interface EditFormProps {
  initialData: Link | null;
}

const formSchema = z.object({
  title: z.string().min(3, { message: 'Please enter 3 or more characters.' }),
  url: z.string().toLowerCase().url({ message: 'Please enter a valid URL.' }),
  keyword: z
    .string()
    .toLowerCase()
    .min(3, { message: 'Please enter 3 or more characters.' })
    .refine((string) => isSlug(string), {
      message: 'Please enter valid slug.'
    })
});

const EditForm: React.FC<EditFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      title: '',
      url: '',
      keyword: ''
    }
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      const response = await axios.patch(`/api/link/${params.linkId}`, data);

      if (response.data.success) {
        router.refresh();
        toast({
          variant: 'success',
          title: 'Success!',
          description: 'Short URL has been updated.'
        });
      }
    } catch (error: any) {
      if (error.response.data.error === 'Please enter different keyword.') {
        form.setError('keyword', {
          type: 'manual',
          message: error.response.data.error
        });
      } else {
        console.log(error);
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your request.'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col lg:grid lg:grid-cols-5 gap-4 lg:items-end'
      >
        <FormField
          control={form.control}
          name='keyword'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel>Keyword</FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  placeholder='Example: short'
                  {...field}
                />
              </FormControl>
              <FormMessage className='lg:absolute lg:whitespace-nowrap' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='url'
          render={({ field }) => (
            <FormItem className='relative lg:col-span-2'>
              <FormLabel>Original URL</FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  placeholder='Example: https://super-long-link.com/long-params'
                  {...field}
                />
              </FormControl>
              <FormMessage className='lg:absolute lg:whitespace-nowrap' />
            </FormItem>
          )}
        />
        <div className='flex flex-col lg:flex-row gap-8 lg:gap-4 lg:items-end lg:col-span-2'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem className='relative flex-1'>
                <FormLabel>URL Title</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder='Example: https://super-long-link.com/long-params'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='lg:absolute lg:whitespace-nowrap' />
              </FormItem>
            )}
          />
          <Button disabled={loading} className='ml-auto' type='submit'>
            {loading && (
              <>
                <Loader2 className='animate-spin mr-2' size={18} />
                Saving...
              </>
            )}
            {!loading && <>Save changes</>}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditForm;
