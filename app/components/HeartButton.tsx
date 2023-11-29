"use client";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SafeUser } from "../types";

interface HeartButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser,
}) => {
  const hasFavorited = false;
  const toggleFavrite = () => {};

  return (
    <div onClick={toggleFavrite} className="relative cursor-pointer ">
      <AiFillHeart
        size={28}
        className={`absolute -top-[2px] -right-[2px] ${
          hasFavorited ? "fill-rose-600" : " fill-black/25"
        }`}
      />
      <AiOutlineHeart
        size={28}
        className={`absolute -top-[2px] -right-[2px] fill-white ${
          hasFavorited ? "hover:fill-white/70" : "hover:fill-rose-500"
        } transition`}
      />
    </div>
  );
};

export default HeartButton;
