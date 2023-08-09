'use client';

import { Modal } from '@/components/ui/modal';
import { useUrlModal } from '@/hooks/use-url-modal';

const UrlModal = () => {
  const urlModal = useUrlModal();

  return (
    <Modal
      title='Create Shorl URL'
      description='Add a new lengthy URL to be shortened.'
      isOpen={urlModal.isOpen}
      onClose={urlModal.onClose}
    >
      Short URL Form
    </Modal>
  );
};

export default UrlModal;
