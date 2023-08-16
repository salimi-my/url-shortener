import prismadb from '@/lib/prismadb';
import { notFound } from 'next/navigation';

interface WeekData {
  [index: number]: string | number;
}

export const getWeekHit = async (linkId: string): Promise<WeekData[]> => {
  const link = await prismadb.link.findUnique({
    where: {
      id: linkId
    }
  });

  if (!link) {
    notFound();
  }

  let hits: number[] = [0, 0, 0, 0, 0, 0, 0];
  const today = new Date();
  const yesterday = ((d) => new Date(d.setDate(d.getDate() - 1)))(new Date());
  const last2day = ((d) => new Date(d.setDate(d.getDate() - 2)))(new Date());
  const last3day = ((d) => new Date(d.setDate(d.getDate() - 3)))(new Date());
  const last4day = ((d) => new Date(d.setDate(d.getDate() - 4)))(new Date());
  const last5day = ((d) => new Date(d.setDate(d.getDate() - 5)))(new Date());
  const last6day = ((d) => new Date(d.setDate(d.getDate() - 6)))(new Date());

  const logs = await prismadb.log.findMany({
    where: {
      linkKeyword: link.keyword,
      createdAt: {
        lte: today.toISOString(),
        gte: last6day.toISOString()
      }
    },
    orderBy: {
      createdAt: 'asc'
    }
  });

  for (const log of logs) {
    if (log.createdAt.getDate() === today.getDate()) {
      hits[6] = hits[6] + 1;
    } else if (log.createdAt.getDate() === yesterday.getDate()) {
      hits[5] = hits[5] + 1;
    } else if (log.createdAt.getDate() === last2day.getDate()) {
      hits[4] = hits[4] + 1;
    } else if (log.createdAt.getDate() === last3day.getDate()) {
      hits[3] = hits[3] + 1;
    } else if (log.createdAt.getDate() === last4day.getDate()) {
      hits[2] = hits[2] + 1;
    } else if (log.createdAt.getDate() === last5day.getDate()) {
      hits[1] = hits[1] + 1;
    } else if (log.createdAt.getDate() === last6day.getDate()) {
      hits[0] = hits[0] + 1;
    }
  }

  const weekData: WeekData[] = [
    ['Time', 'Hits'],
    [last6day.toLocaleDateString('en-MY'), hits[0]],
    [last5day.toLocaleDateString('en-MY'), hits[1]],
    [last4day.toLocaleDateString('en-MY'), hits[2]],
    [last3day.toLocaleDateString('en-MY'), hits[3]],
    [last2day.toLocaleDateString('en-MY'), hits[4]],
    [yesterday.toLocaleDateString('en-MY'), hits[5]],
    [today.toLocaleDateString('en-MY'), hits[6]]
  ];

  return weekData;
};
