"use client";

import { Suspense, lazy } from "react";

import { Listing } from "@prisma/client";
import { SafeUser } from "./types/index";

import Container from "./components/Container";
import ListingCardSkeleton from "./components/skeletons/ListingCardSkeleton";

const ListingCard = lazy(() => import("./components/listings/ListingCard"));

interface PageClientProps {
  listings: Listing[];
  currentUser?: SafeUser | null;
}

const PageClient: React.FC<PageClientProps> = ({ listings, currentUser }) => {
  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
        {listings.map((listing) => {
          return (
            <Suspense key={listing.id} fallback={<ListingCardSkeleton />}>
              <ListingCard
                key={listing.id}
                currentUser={currentUser}
                data={listing}
              />
            </Suspense>
          );
        })}
      </div>
    </Container>
  );
};

export default PageClient;
