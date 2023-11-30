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
  const [isLoading, setIsLoading] = useState(false);

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(listingId);
  }, [listingId, currentUser?.favoriteIds]);

  const [isHasFavorite, setIsHasFavorite] = useState(hasFavorited);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return logingModal.onOpen();
      }

      if (isLoading) {
        //showing error notification
        toast.error("An error occurred. Please try again later.", {
          position: "bottom-left",
          duration: 1500,
          style: {
            border: "2px solid red",
          },
        });

        return;
      }

      try {
        setIsLoading(true);
        const toastId = toast.loading("Loading...", {
          style: {
            border: "1px solid black",
          },
          position: "top-right",
        });

        let request: () => any;
        if (isHasFavorite) {
          request = async () => {
            await axios.delete(`/api/favorites/${listingId}`);
            setIsHasFavorite(!isHasFavorite);

            //showing error notification
            toast.error("Removed from favorites", {
              id: toastId,
              style: {
                border: "1px solid black",
              },
              position: "top-right",
              duration: 1500,
            });
          };
        } else {
          request = async () => {
            await axios.post(`/api/favorites/${listingId}`);
            setIsHasFavorite(!isHasFavorite);

            //showing success notification
            toast.success("Saved to favorites", {
              id: toastId,
              style: {
                border: "1px solid black",
              },
              position: "top-right",
              duration: 1500,
            });
          };
        }

        await request();
        setIsLoading(false);
      } catch (error: any) {
        // Showing error notification
        toast.error("Something went wrong", {
          position: "bottom-left",
          duration: 1500,
          style: {
            border: "2px solid red",
          },
        });
      } finally {
        setIsLoading(false);
      }
    },
    [currentUser, isHasFavorite, listingId, logingModal, isLoading]
  );

  return { isHasFavorite, toggleFavorite };
};

export default useFavorite;
