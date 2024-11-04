import Link from "next/link";

import React from "react";
import { IoIosArrowForward } from "react-icons/io";

type Props = {
  id: string;
  name: string;
  // type: string;
  // city:string;
  // address: string;
  distance: string;
  // photos: Array<string> | [];
  title: string;
  desc: string;
  // rooms:Array<number> | [];
  price: number;
  // featured: boolean;
  // __v: number
  startdate: string | null;
  enddate: string | null;
  room: string | null;
  image: string;
};

const SearchPageCards = ({
  name,
  id,
  price,
  desc,
  distance,
  title,
  startdate,
  enddate,
  room,
  image,
}: Props) => {
  return (
    <div className="border-2 bg-white h-72 max-md:h-auto   max-lg:w-full xl:w-10/12 max-md:w-80 rounded-2xl flex max-md:flex-col justify-between  items-center p-2 gap-1">
      <img className="w-72 h-60 rounded-2xl ps-2" src={image} alt="" />
      <div className="w-96 max-md:w-auto ms-1  flex flex-col items-start max-md:items-center max-lg:gap-4 justify-between h-full py-6">
        <div className="">
          <h2 className="text-2xl font-bold">{name}</h2>
          <p className="text-xs ps-1">
            {distance} from center{" "}
            <span className="lg:hidden text-[11px] text-white font-bold ms-1 bg-green-400 p-1 rounded-full ">
              Free BreakFast
            </span>
          </p>
          <span className="max-lg:hidden text-[11px] text-white font-bold ms-1 bg-green-400 p-1 rounded-full ">
            Free BreakFast
          </span>
        </div>

        <div className="">
          <p className="text-sm font-bold">{title}</p>
          <p className="text-sm  max-md:text-center">1 Full Bed · 1 Bathroom</p>
        </div>

        <div className="max-md:hidden">
          <p className="text-sm font-bold text-green-500">Free cancelation</p>
          <p className="text-xs">
            You can cancel later, so lock in this great price today!
          </p>
        </div>
      </div>

      {/* right side start  */}
      <div className="w-40 h-full py-4 flex flex-col justify-between">
        <div className="text-lg font-bold text-end me-2 max-md:hidden">
          Excellent{" "}
          <span className="ms-1 bg-blue-500 text-white text-sm p-1 rounded-lg rounded-bl-none">
            9.3
          </span>
        </div>
        <div className="flex flex-col items-end max-lg:items-center pe-3 gap-1">
          <p className="font-bold ">₹{price}</p>
          <p className="text-xs text-center">Including taxes and fees</p>
          <Link
            prefetch={false}
            href={{
              pathname: `/searchresult/${id}`,
              query: { startdate: startdate, enddate: enddate, room: room },
            }}
          >
            <button className="bg-green-500 text-white text-xs p-2 flex items-center gap-2 ">
              See Availability <IoIosArrowForward />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchPageCards;
