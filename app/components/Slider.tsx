"use client";

import { useState } from "react";
import Image from "next/image";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";

interface SliderProps {
  src: string[];
  alt: string;
  loopOff?: boolean;
  nextPrevSize?: number;
  pagination?: boolean;
}

const Slider: React.FC<SliderProps> = ({
  src,
  pagination,
  alt,
  loopOff,
  nextPrevSize = 12,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxVisibleDots = 5;

  const prevSlide = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? src.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    const isLastSlide = currentIndex === src.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  const getVisibleDotIndexes = () => {
    let start = Math.max(0, currentIndex - Math.floor(maxVisibleDots / 2));
    let end = Math.min(src.length - 1, start + maxVisibleDots - 1);

    // Check if there are not enough dots in the range, adjust start and end
    if (end - start + 1 < maxVisibleDots) {
      start = Math.max(0, end - maxVisibleDots + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const [clickedDot, setClickedDot] = useState<number | null>(null);

  return (
    <div className="flex overflow-hidden items-center justify-center w-full h-full bg-black group">
      <div className="w-full h-full bg-red-600 relative">
        <Image
          className="object-cover"
          priority
          layout="fill"
          objectFit="cover"
          alt={alt}
          src={src[currentIndex]}
        />
        {/* Left Arrow */}
        {loopOff ? (
          currentIndex > 0 && (
            <div
              onClick={prevSlide}
              className="hidden group-hover:block absolute top-[50%] left-2 p-2 bg-white/60 border-black/30 border-2 text-gray-800 cursor-pointer rounded-full hover:border-2 hover:border-black"
            >
              <IoChevronBack size={nextPrevSize} />
            </div>
          )
        ) : (
          <div
            onClick={prevSlide}
            className="hidden group-hover:block absolute top-[50%] left-2 p-2 bg-white/60 border-black/30 border-2 text-gray-800 cursor-pointer rounded-full hover:border-2 hover:border-black"
          >
            <IoChevronBack size={nextPrevSize} />
          </div>
        )}

        {/* Right Arrow */}
        {loopOff ? (
          currentIndex < src.length - 1 && (
            <div
              onClick={nextSlide}
              className="hidden group-hover:block absolute top-[50%] right-2 p-2  bg-white/60 border-black/30 border-2 text-gray-800 cursor-pointer rounded-full hover:border-2 hover:border-black"
            >
              <IoChevronForward size={nextPrevSize} />
            </div>
          )
        ) : (
          <div
            onClick={nextSlide}
            className="hidden group-hover:block absolute top-[50%] right-2 p-2  bg-white/60 border-black/30 border-2 text-gray-800 cursor-pointer rounded-full hover:border-2 hover:border-black"
          >
            <IoChevronForward size={nextPrevSize} />
          </div>
        )}

        {/* Dots */}
        {pagination && (
          <div className="flex flex-row justify-center">
            <div className="absolute flex flex-row items-center bottom-[5%]">
              {src.map((image, slideIndex: number) => (
                <div
                  key={slideIndex}
                  onClick={() => {
                    goToSlide(slideIndex);
                    setClickedDot(slideIndex);
                  }}
                  className={`dot text-2xl cursor-pointer ${
                    currentIndex === slideIndex ? "active-dot" : ""
                  } ${clickedDot === slideIndex ? "clicked-dot" : ""}`}
                  style={{
                    fontSize:
                      currentIndex === slideIndex
                        ? "32px"
                        : currentIndex + 1 === slideIndex ||
                          currentIndex - 1 === slideIndex
                        ? "22px"
                        : currentIndex + 2 === slideIndex ||
                          currentIndex - 2 === slideIndex
                        ? "16px"
                        : currentIndex + 3 === slideIndex ||
                          currentIndex - 3 === slideIndex
                        ? "12px"
                        : "8px",
                    marginRight: "4px",
                    display: getVisibleDotIndexes().includes(slideIndex)
                      ? "inline-block"
                      : "none",
                  }}
                >
                  <GoDotFill
                    color={currentIndex === slideIndex ? "green" : "gray"}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Slider;
