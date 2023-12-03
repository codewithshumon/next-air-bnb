import prisma from "@/app/libs/prismadb";

export interface GetListingParamsProps {
  userId?: string;
}

export default async function getListings(params: GetListingParamsProps) {
  try {
    const { userId } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    return listings;
  } catch (error: any) {
    throw new Error(error);
  }
}
