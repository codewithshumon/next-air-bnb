"use client";

import axios from "axios";
import { useCallback, useState, Suspense, lazy } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { Listing, Reservation } from "@prisma/client";
import { SafeUser } from "../types";

import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCardSkeleton from "../components/skeletons/ListingCardSkeleton";

const ListingCard = lazy(() => import("../components/listings/ListingCard"));

interface TripsClientProps {
  reservations: (Reservation & { listing: Listing })[];
  currentUser?: SafeUser;
}

const TripsClient: React.FC<TripsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState("");

  const onCancle = useCallback(
    async (id: string) => {
      setDeleteId(id);

      await axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation cancelled");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeleteId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you've been and where you've going"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
        {reservations.map((reservation: any) => (
          <Suspense
            key={reservation.id}
            fallback={<ListingCardSkeleton isButton />}
          >
            <ListingCard
              key={reservation.id}
              data={reservation.listing}
              reservation={reservation}
              actionId={reservation.id}
              onAction={onCancle}
              disabled={deleteId === reservation.id}
              actionLabel="Cancel Reservation"
              currentUser={currentUser}
            />
          </Suspense>
        ))}
      </div>
    </Container>
  );
};

export default TripsClient;
