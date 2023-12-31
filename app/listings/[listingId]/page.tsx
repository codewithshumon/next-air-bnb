import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";

import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservations";

interface ListingParamsProps {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: ListingParamsProps }) => {
  const currentUser = await getCurrentUser();
  const reservations = await getReservations(params);
  const listing = await getListingById(params);

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState
          title="Listing not availabe"
          subtitle="The listing property is possibly removed or disabled"
        />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <ListingClient
        listing={listing}
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default ListingPage;
