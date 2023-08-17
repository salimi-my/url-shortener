import prismadb from '@/lib/prismadb';
import { notFound } from 'next/navigation';

interface LocationData {
  [index: number]: string | number | undefined;
}

export const getLocationHit = async (
  linkId: string
): Promise<LocationData[]> => {
  const link = await prismadb.link.findUnique({
    where: {
      id: linkId
    }
  });

  if (!link) {
    notFound();
  }

  const logs = await prismadb.log.groupBy({
    by: ['countryCode'],
    where: {
      linkKeyword: link.keyword
    },
    _count: {
      _all: true
    },
    orderBy: {
      _count: {
        countryCode: 'desc'
      }
    }
  });

  if (logs.length < 1) {
    return [['Country', 'Hits']];
  }

  const regionName = new Intl.DisplayNames(['en'], { type: 'region' });

  // Convert logs to a list of arrays
  const resultList = [...logs].map((item) => [
    regionName.of(item.countryCode),
    item._count._all
  ]);

  const locationData: LocationData[] = [['Country', 'Hit'], ...resultList];

  return locationData;
};
