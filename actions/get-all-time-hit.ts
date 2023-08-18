import { format } from 'date-fns';
import { auth } from '@clerk/nextjs';
import prismadb from '@/lib/prismadb';
import { notFound } from 'next/navigation';

interface AllTimeData {
  [index: number]: string | number;
}

export const getAllTimeHit = async (
  linkId?: string
): Promise<AllTimeData[]> => {
  const { userId } = auth();

  if (!userId) {
    notFound();
  }

  const link = linkId
    ? await prismadb.link.findUnique({
        where: {
          id: linkId
        }
      })
    : undefined;

  if (linkId && !link) {
    notFound();
  }

  const logs = await prismadb.log.findMany({
    where: {
      ...(linkId ? { linkKeyword: link?.keyword } : {}),
      link: {
        userId: userId
      }
    },
    orderBy: {
      createdAt: 'asc'
    }
  });

  if (logs.length < 1) {
    return [
      ['Time', 'Hits'],
      ['No data', 0]
    ];
  }

  // Create a Map to store date counts
  const dateCounts = new Map();

  // Add first date
  const firstDate = ((d) => new Date(d.setDate(d.getDate() - 2)))(
    new Date(logs[0].createdAt.toISOString().split('T')[0])
  );
  dateCounts.set(firstDate, 0);

  // Add second date
  const secondDate = ((d) => new Date(d.setDate(d.getDate() - 1)))(
    new Date(logs[0].createdAt.toISOString().split('T')[0])
  );
  dateCounts.set(secondDate, 0);

  // Iterate through the data array
  logs.forEach((item) => {
    const date = item.createdAt.toISOString().split('T')[0]; // Convert to 'YYYY-MM-DD' format
    if (dateCounts.has(date)) {
      dateCounts.set(date, dateCounts.get(date) + 1);
    } else {
      dateCounts.set(date, 1);
    }
  });

  // Convert dateCounts Map to a list of arrays
  const resultList = [...dateCounts].map(([date, count]) => [
    format(new Date(date), 'dd MMM yy'),
    count
  ]);

  const allTimeData: AllTimeData[] = [['Time', 'Hits'], ...resultList];

  return allTimeData;
};
