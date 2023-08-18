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
      <main className='lg:ml-72 min-h-[calc(100vh_-_56px)] bg-gray-50 dark:bg-gray-800'>
        <Navbar />
        <div className='container mt-8 pb-8'>{children}</div>
      </main>
      <footer className='lg:ml-72'>
        <div className='supports-backdrop-blur:bg-background/60 z-20 w-full shadow bg-background/95 backdrop-blur'>
          <div className='mx-8 flex h-14 items-center'>
            <small className='text-muted-foreground'>
              Created by{' '}
              <a
                className='hover:underline'
                href='https://www.salimi.my/'
                aria-label='Salimi'
                target='_blank'
                rel='noreferrer'
              >
                Salimi
              </a>{' '}
              &copy; {new Date().getFullYear()}. All right reserved.
            </small>
          </div>
        </div>
      </footer>
    </>
  );
}
