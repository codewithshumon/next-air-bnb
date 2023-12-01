"use client";

import { SafeUser } from "@/app/types";
import useCountries from "@/app/hooks/useCountries";

import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";

interface ListingHeadProps {
  id: string;
  currentUser: SafeUser | null | undefined;
  title: string;
  imageSrc: string;
  locationValue: string;
}
const ListingHead: React.FC<ListingHeadProps> = ({
  id,
  currentUser,
  title,
  imageSrc,
  locationValue,
}) => {
  const { getByValue } = useCountries();

  const locating = getByValue(locationValue);
  return (
    <>
      <Heading
        title={title}
        subtitle={`${locating?.region}, ${locating?.label}`}
      />
      <div className="relative w-full h-[60vh] overflow-hidden rounded-xl">
        <Image
          alt="Image"
          src={imageSrc}
          fill
          className="object-cover w-full"
        />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
