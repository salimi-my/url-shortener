import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function SetupLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (!userId) {
    redirect('sign-in');
  }

  redirect('admin');

  return <>{children}</>;
}
