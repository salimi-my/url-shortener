import { auth } from '@clerk/nextjs';
import prismadb from '@/lib/prismadb';
import { notFound } from 'next/navigation';

interface DeviceData {
  [index: number]: string | number;
}

export const getDeviceHit = async (linkId?: string): Promise<DeviceData[]> => {
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
    return [['Device', 'Hits']];
  }

  // device type function
  const getDeviceType = (userAgent: string) => {
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent)) {
      return 'Tablet';
    }
    if (
      /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        userAgent
      )
    ) {
      return 'Mobile';
    }
    return 'Desktop';
  };

  // Create a Map to store device counts
  const deviceCounts = new Map();

  // Iterate through the data array
  logs.forEach((item) => {
    // Get device type
    const device = getDeviceType(item.userAgent);
    if (deviceCounts.has(device)) {
      deviceCounts.set(device, deviceCounts.get(device) + 1);
    } else {
      deviceCounts.set(device, 1);
    }
  });

  // Convert referrerCounts Map to a list of arrays
  const resultList = [...deviceCounts].map(([device, count]) => [
    device,
    count
  ]);

  const referrerData: DeviceData[] = [['Device', 'Hits'], ...resultList];

  return referrerData;
};
