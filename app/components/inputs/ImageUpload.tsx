"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

const uploadPreset = "cwsxvgiy";

interface ImageUploadProps {
  onChange: (value: string | string[]) => void;
  value: string | string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const handleUpload = useCallback(
    (result: any) => {
      // If value is a string, convert it to an array
      const newValue = Array.isArray(value)
        ? [...value, result.info.secure_url]
        : [result.info.secure_url];
      onChange(newValue);
    },
    [onChange, value]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset={uploadPreset}
      options={{
        maxFiles: 10,
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="
              relative
              cursor-pointer
              hover:border-neutral-800
              transition
              border-dashed 
              border-2 
              p-20 
              border-neutral-300
              flex
              flex-col
              justify-center
              items-center
              gap-4
              text-neutral-600
            "
          >
            <TbPhotoPlus size={50} />
            <div className="font-semibold text-lg">Click to upload</div>
            {Array.isArray(value) &&
              value.map((imageUrl, index) => (
                <div
                  key={index}
                  className="
                absolute inset-0 w-full h-full"
                >
                  <Image
                    fill
                    style={{ objectFit: "cover" }}
                    src={imageUrl}
                    alt={`House ${index + 1}`}
                  />
                </div>
              ))}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
