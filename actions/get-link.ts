import prismadb from '@/lib/prismadb';

export const getLink = async (linkId: string) => {
  const link = await prismadb.link.findUnique({
    where: {
      id: linkId
    }
  });

  return link;
};
