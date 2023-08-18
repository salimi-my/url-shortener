import type { Metadata } from 'next';
import { auth } from '@clerk/nextjs';
import { Link } from '@prisma/client';
import prismadb from '@/lib/prismadb';
import { redirect } from 'next/navigation';

import UrlClient from '@/components/url/client';

interface UrlPageProps {
  searchParams: {
    page?: string;
    per_page?: string;
    sort?: string;
    keyword?: string;
  };
}

export const metadata: Metadata = {
  title: 'Short URL — URL Shortener'
};

const UrlPage: React.FC<UrlPageProps> = async ({ searchParams }) => {
  const { page, per_page, sort, keyword } = searchParams;
  const { userId } = auth();

  // Number of items per page
  const limit = typeof per_page === 'string' ? parseInt(per_page) : 10;

  // Number of items to skip
  const offset =
    typeof page === 'string'
      ? parseInt(page) > 0
        ? (parseInt(page) - 1) * limit
        : 0
      : 0;

  // Column and order to sort
  const [column, order] =
    typeof sort === 'string'
      ? (sort.split('.') as [
          keyof Link | undefined,
          'asc' | 'desc' | undefined
        ])
      : [];

  // Define orderBy
  const orderBy: any =
    column && ['keyword', 'url', 'click', 'createdAt'].includes(column)
      ? order === 'asc'
        ? { [column]: 'asc' }
        : { [column]: 'desc' }
      : { createdAt: 'desc' };

  if (!userId) {
    redirect('sign-in');
  }

  const [links, totalLinks] = await prismadb.$transaction([
    prismadb.link.findMany({
      skip: offset,
      take: limit,
      where: {
        userId,
        OR:
          typeof keyword === 'string'
            ? [
                {
                  keyword: {
                    contains: keyword
                  }
                },
                {
                  url: {
                    contains: keyword
                  }
                }
              ]
            : undefined
      },
      orderBy
    }),
    prismadb.link.count({
      where: {
        userId,
        OR:
          typeof keyword === 'string'
            ? [
                {
                  keyword: {
                    contains: keyword
                  }
                },
                {
                  url: {
                    contains: keyword
                  }
                }
              ]
            : undefined
      },
      orderBy
    })
  ]);

  const pageCount = Math.ceil(totalLinks / limit);

  return <UrlClient data={links} pageCount={pageCount} />;
};

export default UrlPage;
