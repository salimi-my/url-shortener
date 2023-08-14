'use client';

import { useEffect, useState } from 'react';

import UrlModal from '@/components/modal/url-modal';

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <UrlModal />
    </>
  );
};

export default ModalProvider;
