"use client";

import { useCallback, useState, useRef, useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import { SafeUser } from "@/app/types";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";

import useRentModal from "@/app/hooks/useRentModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const rentModal = useRentModal();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const toggleOpen = useCallback(() => {
    setIsOpen((currentValue) => !currentValue);
  }, []);

  const openLoginModal = () => {
    // Close the dropdown when the login modal is opened
    toggleOpen();
    // Open the login modal
    loginModal.onOpen();
  };

  const openRegisterModal = () => {
    // Close the dropdown when the register modal is opened
    toggleOpen();
    // Open the register modal
    registerModal.onOpen();
  };

  //fixing UserMenu Modal closing by key escape and clicking outside of the div documents
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        toggleOpen();
      }
    };

    const handleOverlayClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        toggleOpen();
      }
    };

    document.addEventListener("click", handleOverlayClick);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("click", handleOverlayClick);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, toggleOpen]);

  //functino for airbnb your home
  //open rent modal
  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  return (
    <div className="relative z-50">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block text-sm font-semibold py-3 px-4 hover:bg-neutral-100 transition cursor-pointer rounded-full"
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block object-cover">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          ref={modalRef}
          className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm"
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <div className="">
                <MenuItem
                  onClick={() => router.push("/trips")}
                  label="My trips"
                />
                <MenuItem onClick={() => {}} label="My favorites" />
                <MenuItem onClick={() => {}} label="My reservations" />
                <MenuItem onClick={rentModal.onOpen} label="Airbnb my home" />
                <h1>
                  <MenuItem onClick={() => signOut()} label="Log Out" />
                </h1>
              </div>
            ) : (
              <div className="">
                <MenuItem onClick={openLoginModal} label="Log In" />
                <MenuItem onClick={openRegisterModal} label="Sign Up" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
