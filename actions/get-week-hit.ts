import { format } from 'date-fns';
import prismadb from '@/lib/prismadb';
import { notFound } from 'next/navigation';

interface WeekData {
  [index: number]: string | number;
}

export const getWeekHit = async (linkId?: string): Promise<WeekData[]> => {
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

  const today = new Date();
  const last6day = ((d) => new Date(d.setDate(d.getDate() - 6)))(new Date());

  const logs = await prismadb.log.findMany({
    where: {
      ...(linkId ? { linkKeyword: link?.keyword } : {}),
      createdAt: {
        lte: today.toISOString(),
        gte: last6day.toISOString()
      }
    },
    orderBy: {
      createdAt: 'asc'
    }
  });

  // Convert the date strings to Date objects
  const dateObjects = logs.map(
    (item) => new Date(item.createdAt.toISOString().split('T')[0])
  );

  // Create a list of dates for the last 30 days
  const dateList = [];
  let currentDate = new Date(last6day);
  while (currentDate <= today) {
    dateList.push(format(currentDate, 'dd MMM'));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Count occurrences of each unique date
  const dateCountMap: { [date: string]: number } = {};
  dateList.forEach((dateString) => {
    dateCountMap[dateString] = 0; // Initialize with 0 count
  });

  dateObjects.forEach((date) => {
    const dateString = format(date, 'dd MMM');
    if (dateCountMap[dateString] !== undefined) {
      dateCountMap[dateString] += 1;
    }
  });

  // Create an array of arrays with date value and data count
  const resultList = dateList.map((dateString) => [
    dateString,
    dateCountMap[dateString]
  ]);

  const weekData: WeekData[] = [['Time', 'Hits'], ...resultList];

  return weekData;
};
