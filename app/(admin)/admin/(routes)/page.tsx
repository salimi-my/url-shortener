import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';

const DashboardPage = () => {
  return (
    <div>
      <UserButton afterSignOutUrl='/' />
      <Button className='ml-2'>Button</Button>
    </div>
  );
};

export default DashboardPage;
