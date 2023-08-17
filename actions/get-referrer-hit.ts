import prismadb from '@/lib/prismadb';
import { notFound } from 'next/navigation';

interface ReferrerData {
  [index: number]: string | number;
}

export const getReferrerHit = async (
  linkId: string
): Promise<ReferrerData[]> => {
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
      ['Referrer', 'Hits'],
      ['No data', 0]
    ];
  }

  // Create a Map to store referrer counts
  const referrerCounts = new Map();

  // Iterate through the data array
  logs.forEach((item) => {
    const { hostname } = new URL(item.referrer); // Get hostname
    if (referrerCounts.has(hostname)) {
      referrerCounts.set(hostname, referrerCounts.get(hostname) + 1);
    } else {
      referrerCounts.set(hostname, 1);
    }
  });

  // Convert referrerCounts Map to a list of arrays
  const resultList = [...referrerCounts].map(([hostname, count]) => [
    hostname,
    count
  ]);

  const referrerData: ReferrerData[] = [['Referrer', 'Hits'], ...resultList];

  return referrerData;
};
