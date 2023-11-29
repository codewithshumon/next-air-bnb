"use client";

import { useRouter } from "next/navigation";

import { Listing, Reservation } from "@prisma/client";
import { SafeUser } from "@/app/types";

interface ListingCardProps {
  disabled?: boolean;
  data: Listing;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  actionId?: string;
  actionLabel?: string;
  currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
  disabled,
  data,
  reservation,
  onAction,
  actionId,
  actionLabel,
  currentUser,
}) => {
  const router = useRouter();

  return <div>Listing Card</div>;
};

export default ListingCard;
