"use client";

import Modal from "./Modal";
import useRentModal from "@/app/hooks/useRentModal";

const RentModal = () => {
  const rentModal = useRentModal();

  return (
    <div>
      <Modal
        isOpen={rentModal.isOpen}
        onClose={rentModal.onClose}
        onSubmit={rentModal.onClose}
        actionLabel="Submit"
        title="Airbnb your home!"
      />
    </div>
  );
};

export default RentModal;
