"use client";

import Image from "next/image";

const Avatar = () => {
  return (
    <Image
      alt="avatar"
      src="/images/placeholder.png"
      height="30"
      width="30"
      className="rounded-full"
    />
  );
};

export default Avatar;
