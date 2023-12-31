"use client";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SafeUser } from "../types";
import useFavorite from "../hooks/useFavorite";

interface HeartButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser,
}) => {
  const { isHasFavorite, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
  });

  return (
    <div onClick={toggleFavorite} className="relative cursor-pointer ">
      <AiFillHeart
        size={28}
        className={`absolute -top-[2px] -right-[2px] ${
          isHasFavorite ? "fill-rose-600" : " fill-black/25"
        }`}
      />
      <AiOutlineHeart
        size={28}
        className={`absolute -top-[2px] -right-[2px] fill-white ${
          isHasFavorite ? "hover:fill-white/70" : "hover:fill-rose-500"
        } transition`}
      />
    </div>
  );
};

export default HeartButton;
