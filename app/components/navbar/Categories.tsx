import Container from "../Container";
import CategoryBox from "./CategoryBox";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { MdOutlineVilla } from "react-icons/md";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond, IoChevronForward, IoChevronBack } from "react-icons/io5";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to the beach!",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This property has windmills",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property is modern",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "This property is in the countryside",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This property has a pool",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This property is on a island",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is close to a lake",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This property has skiing activities",
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "This property is in a castle",
  },
  {
    label: "Campaing",
    icon: GiForestCamp,
    description: "This property has campaing activities",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "This property has arctic activities",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This property is in a cave",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This property is in the desert",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This property is in the barn",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This property has windmills",
  },
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to the beach!",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This property has windmills",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property is modern",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "This property is in the countryside",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This property has a pool",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This property is on a island",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is close to a lake",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This property has skiing activities",
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "This property is in a castle",
  },
  {
    label: "Campaing",
    icon: GiForestCamp,
    description: "This property has campaing activities",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "This property has arctic activities",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This property is in a cave",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This property is in the desert",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This property is in the barn",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This property has windmills",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [notLastIndex, setNotLastIndex] = useState(true);
  const carousel = useRef<HTMLDivElement>(null);

  const isMainPage = pathname === "/";

  useEffect(() => {
    if (carousel.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
    }
  }, [carousel, currentIndex]);

  useEffect(() => {
    if (carousel.current !== null) {
      maxScrollWidth.current =
        carousel.current.scrollWidth - carousel.current.offsetWidth;
    }
  }, [carousel, currentIndex]);

  if (!isMainPage) {
    return null;
  }

  // const isEnd =
  //   carousel.current?.scrollLeft! + carousel.current?.offsetWidth! >=
  //   maxScrollWidth.current;

  // Calculate the index range for the current page
  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
      setNotLastIndex(true);
    }
  };

  // const moveNext = () => {
  //   if (!isEnd) {
  //     setCurrentIndex((prevState) => prevState + 1);
  //   }
  // };

  const moveNext = () => {
    setCurrentIndex((prevState) => {
      const newIndex = prevState + 1;

      const isEnd =
        carousel.current?.scrollLeft! + carousel.current?.offsetWidth! >=
        maxScrollWidth.current;
      setNotLastIndex(!isEnd);

      return newIndex;
    });
  };

  return (
    <Container>
      <div className="py-3 px-2 bg-transparent flex h-full w-full flex-row items-center justify-between overflow-x-hidden relative">
        {currentIndex > 0 && (
          <div className="absolute left-0 rounded-full z-10 h-full flex items-center justify-center pr-4 bg-white/60">
            <button
              onClick={movePrev}
              className="p-1 hover:shadow-2xl shadow-white/50  border-black/30 border-2 rounded-full  text-gray-800 hover:border-black "
            >
              <IoChevronBack size={20} />
            </button>
          </div>
        )}

        <div
          className="flex relative gap-1 overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0 transition-transform duration-500 ease-in-out"
          ref={carousel}
        >
          {categories.map((item) => (
            <CategoryBox
              key={item.label}
              label={item.label}
              selected={category === item.label}
              icon={item.icon}
            />
          ))}
        </div>
        {notLastIndex && (
          <div className="absolute right-0 rounded-full z-10 h-full flex items-center justify-center pl-4 bg-white/60">
            <button
              onClick={moveNext}
              className="p-1 hover:shadow-2xl shadow-white/50  border-black/30 border-2 rounded-full  text-gray-800 hover:border-black "
            >
              <IoChevronForward size={20} />
            </button>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Categories;
