'use client';

import { usePathname } from 'next/navigation';

const PageTitle = () => {
  const pathname = usePathname();

  let pageTitle = '';

  if (pathname === '/admin') {
    pageTitle = 'Dashboard';
  } else if (pathname === '/admin/url') {
    pageTitle = 'Short URL';
  } else if (pathname === '/admin/profile') {
    pageTitle = 'My Profile';
  }

  return <h1>{pageTitle}</h1>;
};

export default PageTitle;
