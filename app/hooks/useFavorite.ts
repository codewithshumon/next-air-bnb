"use client";

import axios from "axios";
import { useCallback, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "../types";
import useLoginModal from "./useLoginModal";

interface UserFavoriteProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: UserFavoriteProps) => {
  const logingModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [listingId, currentUser]);

  const [isHasFavorite, setIsHasFavorite] = useState(hasFavorited);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return logingModal.onOpen();
      }

      try {
        let request;
        if (isHasFavorite) {
          request = () => {
            axios.delete(`/api/favorites/${listingId}`);
            setIsHasFavorite(!isHasFavorite);
            toast.error("Removed from favorites", {
              style: {
                border: "1px solid black",
              },
              position: "top-right",
              duration: 1000,
            });
          };
        } else {
          request = () => {
            axios.post(`/api/favorites/${listingId}`);
            setIsHasFavorite(!isHasFavorite);
            toast.success("Saved to favorites", {
              style: {
                border: "1px solid black",
              },
              position: "top-right",
              duration: 1000,
            });
          };
        }

        await request();
      } catch (error: any) {
        toast.error("Something went wrong");
      }
    },
    [currentUser, isHasFavorite, listingId, logingModal]
  );

  return { isHasFavorite, toggleFavorite };
};

export default useFavorite;
