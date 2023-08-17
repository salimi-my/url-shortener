import { format } from 'date-fns';
import prismadb from '@/lib/prismadb';
import { notFound } from 'next/navigation';

interface AllTimeData {
  [index: number]: string | number;
}

export const getAllTimeHit = async (linkId: string): Promise<AllTimeData[]> => {
  const link = await prismadb.link.findUnique({
    where: {
      id: linkId
    }
  });

  if (!link) {
    notFound();
  }

  const logs = await prismadb.log.findMany({
    where: {
      linkKeyword: link.keyword
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
