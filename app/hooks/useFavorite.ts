import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "../types";
import useLoginModal from "./useLoginModal";

interface UserFavoriteProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: UserFavoriteProps) => {
  const router = useRouter();
  const logingModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [listingId, currentUser?.favoriteIds]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return logingModal.onOpen();
      }

      try {
        let request;
        if (hasFavorited) {
          request = () => {
            axios.delete(`/api/favorites/${listingId}`);
          };
          router.refresh();
          toast.success("Removed");
        } else {
          request = () => {
            axios.post(`/api/favorites/${listingId}`);
          };
          router.refresh();
          toast.success("Saved");
        }

        await request();
        router.refresh();
      } catch (error: any) {
        toast.error("Something went wrong");
      }
    },
    [currentUser, hasFavorited, listingId, logingModal, router]
  );

  return { hasFavorited, toggleFavorite };
};

export default useFavorite;
