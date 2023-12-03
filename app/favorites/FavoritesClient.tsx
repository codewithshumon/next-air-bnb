"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RiRefreshLine } from "react-icons/ri";

import { Listing } from "@prisma/client";
import { SafeUser } from "../types";

import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";

interface FavoritesClientProps {
  listings: Listing[];
  currentUser: SafeUser | null;
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
  listings,
  currentUser,
}) => {
  const router = useRouter();
  const [showTooltip, setShowTooltip] = useState(false);
  let timeoutId: NodeJS.Timeout;

  const handleMouseEnter = () => {
    setShowTooltip(false);
    timeoutId = setTimeout(() => {
      setShowTooltip(true);
    }, 800);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutId);
    setShowTooltip(false);
  };

  return (
    <Container>
      <Heading
        center
        title="Favorites"
        subtitle="List of places you have favorited!"
      />
      <div className="mt-1 w-fit font-semibold">
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="group relative flex flex-row items-center cursor-pointer"
        >
          <RiRefreshLine
            size={30}
            className="text-gray-800"
            onClick={() => router.refresh()}
          />
          {showTooltip && (
            <div className="flex flex-row items-center">
              <div className="toottip-text"></div>
              <div className="absolute w-[125px] bg-gray-800 text-white text-sm p-2 rounded-lg left-[150%]">
                Refresh favorites
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            currentUser={currentUser}
            data={listing}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavoritesClient;
