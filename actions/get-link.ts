import { auth } from '@clerk/nextjs';
import prismadb from '@/lib/prismadb';
import { notFound } from 'next/navigation';

export const getLink = async (linkId: string) => {
  const { userId } = auth();

  if (!userId) {
    notFound();
  }

  const link = await prismadb.link.findUnique({
    where: {
      id: linkId,
      userId: userId
    }
  });

  if (!link) {
    notFound();
  }

  return link;
};
