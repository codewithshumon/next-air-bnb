import prisma from "@/app/libs/prismadb";

export interface GetListingParamsProps {
  userId?: string;
  guestCount?: string;
  roomCount?: string;
  bathRoomCount?: string;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export default async function getListings(params: GetListingParamsProps) {
  try {
    const {
      userId,
      guestCount,
      roomCount,
      bathRoomCount,
      startDate,
      endDate,
      locationValue,
      category,
    } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }
    if (category) {
      query.category = category;
    }
    if (guestCount) {
      query.guestCount = {
        //here gte mean's greater then or equell
        //+ sign for make string guestCount to number
        gte: +guestCount,
      };
    }
    if (roomCount) {
      query.roomCount = {
        //here gte mean's greater then or equell
        //+ sign for make string roomCount to number
        gte: +roomCount,
      };
    }

    if (bathRoomCount) {
      query.bathRoomCount = {
        //here gte mean's greater then or equell
        //+ sign for make string bathroomCount to number
        gte: +bathRoomCount,
      };
    }
    if (locationValue) {
      query.locationValue = locationValue;
    }

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      };
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
