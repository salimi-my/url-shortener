import { redirect } from 'next/navigation';

interface KeywordPageProps {
  params: { keyword: string };
}

const KeywordPage: React.FC<KeywordPageProps> = ({ params }) => {
  if (params.keyword === 'hello') {
    redirect('https://www.google.com');
  }
  return <div>Keyword Not Found!</div>;
};

export default KeywordPage;
