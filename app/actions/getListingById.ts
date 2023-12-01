import prisma from "@/app/libs/prismadb";

interface ListingParamsProps {
  listingId?: string;
}

export default async function getListingById(params: ListingParamsProps) {
  try {
    const { listingId } = params;

    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      //also getting user data
      include: {
        user: true,
      },
    });

    if (!listing) {
      return null;
    }

    return listing;
  } catch (error: any) {
    throw new Error(error);
  }
}
