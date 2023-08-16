import prismadb from '@/lib/prismadb';
import { notFound } from 'next/navigation';

export const getLink = async (linkId: string) => {
  const link = await prismadb.link.findUnique({
    where: {
      id: linkId
    }
  });

  if (!link) {
    notFound();
  }

  return link;
};
