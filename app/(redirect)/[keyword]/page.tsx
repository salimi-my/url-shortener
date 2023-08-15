import axios from 'axios';
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

  const link = await prismadb.link.findUnique({
    where: {
      keyword: params.keyword
    }
  });

  if (!link) {
    return <NotFound message={params.keyword} isKeyword={true} />;
  }

  // Get IP address
  const ipResponse = await axios.get('http://ip-api.com/json/');
  const ip = ipResponse.data.query ?? 'Unknown';
  const countryCode = ipResponse.data.countryCode ?? 'Unknown';

  const log = await prismadb.log.create({
    data: {
      linkKeyword: link.keyword,
      referrer: referer ?? 'Direct',
      userAgent: userAgent ?? 'Unknown',
      ip,
      countryCode
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
