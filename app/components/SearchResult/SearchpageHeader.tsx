"use client";
import React, { useState } from "react";
import { TbArrowsSort } from "react-icons/tb";
import { FaSort } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useAppSelector } from "@/redux/Slice/useTypedSelector";

type Props = {};

const SearchpageHeader = (props: Props) => {
  const count = useAppSelector((state) => state.hotel.searchTypeData.count);
  const [isvisible, setIsVisible] = useState(false);
  const params = useSearchParams();
  const city = params.get("destination");
  // console.log("city",city);

  return (
    <div className="flex flex-col gap-5">
      <p className="text-xl font-bold">
        <span className="uppercase">{city}</span>: {count} properties found
      </p>

      <div className="relative">
        <div
          onClick={() => setIsVisible(!isvisible)}
          className="bg-white flex gap-1 items-center justify-center border-2 w-64 text-sm p-2 rounded-full"
        >
          <TbArrowsSort /> Sort by: Price(lowest first) <FaSort />
        </div>
        <AnimatePresence>
          {isvisible && (
            <motion.div
              className="absolute  left-0 bg-white px-6 py-4 shadow-lg "
              initial={{ opacity: 0, y: "-10%" }}
              animate={{ opacity: 1, y: "5%" }}
              exit={{ opacity: 0, y: "-10%", transition: { duration: "0.35" } }}
              transition={{
                type: "spring",
                stiffness: "100",
                duration: "0.75",
              }}
            >
              <p className="mt-4 bg-inherit cursor-pointer hover:text-green-300 transition-all duration-150">
                Our Top Picks
              </p>
              <p className="mt-4 bg-inherit cursor-pointer hover:text-green-300 transition-all duration-150">
                Property Rating (High to Low)
              </p>
              <p className="mt-4 bg-inherit cursor-pointer hover:text-green-300 transition-all duration-150">
                Property Rating (Low to High)
              </p>
              <p className="mt-4 bg-inherit cursor-pointer hover:text-green-300 transition-all duration-150">
                Top Reviewed
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SearchpageHeader;
