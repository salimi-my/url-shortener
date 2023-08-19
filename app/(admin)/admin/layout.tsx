'use client';

import { cn } from '@/lib/utils';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import useStore from '@/hooks/use-store';
import Sidebar from '@/components/sidebar';
import useSidebarToggle from '@/hooks/use-sidebar-toggle';

export default function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  return (
    <>
      <Sidebar />
      <main
        className={cn(
          'min-h-[calc(100vh_-_56px)] bg-gray-50 dark:bg-gray-800 transition-[margin-left] ease-in-out duration-300',
          sidebar?.isOpen === false ? 'lg:ml-[90px]' : 'lg:ml-72'
        )}
      >
        <Navbar />
        <div className='container mt-8 pb-8'>{children}</div>
      </main>
      <footer
        className={cn(
          'transition-[margin-left] ease-in-out duration-300',
          sidebar?.isOpen === false ? 'lg:ml-[90px]' : 'lg:ml-72'
        )}
      >
        <Footer />
      </footer>
    </>
  );
}
