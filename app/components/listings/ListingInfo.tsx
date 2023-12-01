"use client";

import { User } from "@prisma/client";
import { IconType } from "react-icons";

import useCountries from "@/app/hooks/useCountries";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../Map"), { ssr: false });

interface ListingInfoProps {
  user: User;
  category:
    | {
        label: string;
        icon: IconType;
        description: string;
      }
    | undefined;
  discription: string;
  roomCount: number;
  guestCount: number;
  bathRoomCount: number;
  locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  category,
  discription,
  roomCount,
  guestCount,
  bathRoomCount,
  locationValue,
}) => {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <div>Host by {user.name}</div>
          <Avatar src={user.image} />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathRoomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          label={category.label}
          icon={category.icon}
          description={category.description}
        />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-500">{discription}</div>
      <hr />
      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
