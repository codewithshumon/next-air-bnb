"force-dynamic";

import getCurrentUser from "./actions/getCurrentUser";
import getListings, { GetListingParamsProps } from "./actions/getListings";

import PageClient from "./PageClient";
import ClientOnly from "./components/ClientOnly";
import EmptyState from "./components/EmptyState";

interface HomeProps {
  searchParams: GetListingParamsProps;
}

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <PageClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default Home;
