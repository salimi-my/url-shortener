import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';

export default function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      <main className='lg:ml-72 min-h-screen bg-gray-50 dark:bg-gray-800'>
        <Navbar />
        <div className='container mt-8 pb-8'>{children}</div>
      </main>
    </>
  );
}
