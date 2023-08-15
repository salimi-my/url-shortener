import axios from 'axios';
import prismadb from '@/lib/prismadb';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

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
    return <p>Keyword: {params.keyword} not found!</p>;
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
    return <p>Log create error!</p>;
  }

  const updatedLink = await prismadb.link.update({
    where: {
      id: link.id
    },
    data: {
      click: link.click++
    }
  });

  if (!updatedLink) {
    return <p>Link update error!</p>;
  }

  redirect(link.url);
};

export default KeywordPage;
