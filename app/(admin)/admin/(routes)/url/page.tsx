'use client';

import { Button } from '@/components/ui/button';
import { useUrlModal } from '@/hooks/use-url-modal';

const UrlPage = () => {
  const urlModal = useUrlModal();

  return (
    <div>
      <Button onClick={() => urlModal.onOpen()}>Add URL</Button>
    </div>
  );
};

export default UrlPage;
