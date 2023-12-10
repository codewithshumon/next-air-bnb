"use client";

import axios from "axios";
import { useCallback, useState, Suspense, lazy } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { Listing } from "@prisma/client";
import { SafeUser } from "../types";

import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCardSkeleton from "../components/skeletons/ListingCardSkeleton";

const ListingCard = lazy(() => import("../components/listings/ListingCard"));

interface PropertiesClientProps {
  listings: Listing[];
  currentUser?: SafeUser;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
  listings,
  currentUser,
}) => {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState("");

  const onCancle = useCallback(
    async (id: string) => {
      setDeleteId(id);

      await axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Listing deleted");
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
      <Heading title="Properties" subtitle="Listings on your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
        {listings.map((listing: any) => (
          <Suspense
            key={listing.id}
            fallback={<ListingCardSkeleton isButton />}
          >
            <ListingCard
              key={listing.id}
              data={listing}
              actionId={listing.id}
              onAction={onCancle}
              disabled={deleteId === listing.id}
              actionLabel="Delete Property"
              currentUser={currentUser}
            />
          </Suspense>
        ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;
