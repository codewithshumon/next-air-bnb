"use client";

import { useState, useEffect, useCallback } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);

    //here using setTimeout, to perform the Modal Animation currely
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [disabled, secondaryAction]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      // Close the modal only if the click occurred outside the modal content
      if (e.target === e.currentTarget) {
        handleClose();
      }
    },
    [handleClose]
  );

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        onClick={handleOverlayClick}
        className="flex justify-center items-center w-full h-full fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70"
      >
        <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full mt-[15%] md:mt-[5%]">
          {/* CONTENT */}
          <div
            className={`translate duration-300 h-full ${
              showModal ? "translate-y-0" : "translate-y-full"
            } ${showModal ? "opacity-100" : "opacity-0"}`}
          >
            <div className="relative translate h-[90%] border-0 rounded-xl shadow-lg flex flex-col w-full bg-white focus:outline-none">
              {/* MODAL HEADEAR */}
              <div className="w-full flex items-center rounded-t-xl justify-center h-auto bg-white border-b-[1px] z-30">
                <button
                  onClick={handleClose}
                  className="p-1 border-0 hover:opacity-70 transition absolute left-9"
                >
                  <IoMdClose size={18} />
                </button>
                <div className="text-lg font-bold p-3">{title}</div>
              </div>
              <div className="overflow-y-scroll rounded-lg p-3">
                {/* MODAL BODY */}
                <div className="p-6 flex-auto">{body}</div>
                {/* MODAL FOOTER */}
                <div className="flex flex-col gap-2 p-6">
                  <div className="flex flex-row items-center gap-4 w-full">
                    <Button
                      disabled={disabled}
                      label={actionLabel}
                      onClick={handleSubmit}
                    />
                    {secondaryAction && secondaryActionLabel && (
                      <Button
                        outline
                        disabled={disabled}
                        label={secondaryActionLabel}
                        onClick={handleSecondaryAction}
                      />
                    )}
                  </div>
                  {footer}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
