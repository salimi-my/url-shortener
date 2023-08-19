import prismadb from '@/lib/prismadb';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import NotFound from '@/components/not-found';

interface KeywordPageProps {
  params: { keyword: string };
}

const KeywordPage: React.FC<KeywordPageProps> = async ({ params }) => {
  const headersList = headers();
  const referer = headersList.get('referer');
  const userAgent = headersList.get('user-agent');

  // Get IP address
  let ip = headersList.get('x-real-ip');
  const forwardedFor = headersList.get('x-forwarded-for');
  if (!ip && forwardedFor) {
    ip = forwardedFor.split(',').at(0) ?? null;
  }

  // Get country code from Vercel
  let countryCode = headersList.get('x-vercel-ip-country-region');

  // Get country code from Cloudflare
  if (!countryCode) countryCode = headersList.get('cf-ipcountry');

  // Get country code from AWS CloudFront
  if (!countryCode) countryCode = headersList.get('cloudfront-viewer-country');

  const link = await prismadb.link.findUnique({
    where: {
      keyword: params.keyword
    }
  });

  if (!link) {
    return <NotFound message={params.keyword} isKeyword={true} />;
  }

  const log = await prismadb.log.create({
    data: {
      linkKeyword: link.keyword,
      referrer: referer ?? 'Direct',
      userAgent: userAgent ?? 'Unknown',
      ip: ip ?? 'Unknown',
      countryCode: countryCode ?? 'Unknown'
    }
  });

  if (!log) {
    return <NotFound message='Log create error!' isKeyword={false} />;
  }

  const updatedLink = await prismadb.link.update({
    where: {
      id: link.id
    },
    data: {
      click: link.click + 1
    }
  });

  if (!updatedLink) {
    return <NotFound message='Link update error!' isKeyword={false} />;
  }

  redirect(link.url);
};

export default KeywordPage;
