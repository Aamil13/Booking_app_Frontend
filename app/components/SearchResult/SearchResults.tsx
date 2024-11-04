"use client";
import React from "react";
import SearchPageCards from "./SearchPageCards";
import { useAppSelector } from "@/redux/Slice/useTypedSelector";
import { ClockLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";

type Props = {};

const SearchResults = (props: Props) => {
  // const searchData= useAppSelector((state)=>state.hotel.searchTypeData)
  const searchData = useAppSelector((state) => state?.hotel?.searchTypeData);
  const searcherr = useAppSelector((state) => state.hotel.searchTypeErr);
  const searchLoading = useAppSelector(
    (state) => state.hotel.searchTypeLoading,
  );
  const searchParams = useSearchParams();

  // console.log("searchData",searchData);
  const startdate = searchParams.get("startdate");
  const enddate = searchParams.get("enddate");
  const room = searchParams.get("room");
  const dummyImage =
    "https://plus.unsplash.com/premium_photo-1661964225206-fd5d445a6edd?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div className="mt-5  flex flex-wrap max-md:justify-center md:flex-col gap-4 min-h-[400px] ">
      {searchLoading ? (
        <div className="flex items-center justify-center h-full">
          <ClockLoader color="#36d7b7" />
        </div>
      ) : searchData?.hotels.length ? (
        searchData?.hotels.map((item, idx) => (
          <SearchPageCards
            image={item?.photos[0] || dummyImage}
            key={idx}
            room={room}
            startdate={startdate}
            enddate={enddate}
            name={item.name}
            title={item.title}
            desc={item.desc}
            distance={item.distance}
            price={item.cheapestPrice}
            id={item._id}
          />
        ))
      ) : searcherr ? (
        <p>Something went Wrong!</p>
      ) : (
        !searchLoading && <p>No data to show</p>
      )}
    </div>
  );
};

export default SearchResults;
