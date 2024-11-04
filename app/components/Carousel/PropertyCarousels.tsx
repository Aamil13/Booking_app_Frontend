"use client";

import React, { useEffect, useState } from "react";
import { Carousel } from "@trendyol-js/react-carousel";
import CarouselButtons from "../buttons/CarouselButtons";
import PropertyCards from "../cards/PropertyCards";
import { useAppDispatch, useAppSelector } from "@/redux/Slice/useTypedSelector";
import { getHotelType } from "@/redux/Slice/hotelSlice";

type propertytype = {
  imglink: string;
  name: string;
  qty: string;
};

const dummypropertydata: Array<propertytype> = [
  {
    imglink:
      "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Hotels",
    qty: "233",
  },
  {
    imglink:
      "https://plus.unsplash.com/premium_photo-1661963239507-7bdf41a5e66b?q=80&w=2023&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Apartments",
    qty: "1339",
  },
  {
    imglink:
      "https://images.unsplash.com/photo-1581859814481-bfd944e3122f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Resorts",
    qty: "33",
  },
  {
    imglink:
      "https://images.unsplash.com/photo-1561026554-29d9815d4f3d?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Villas",
    qty: "199",
  },
  {
    imglink:
      "https://images.unsplash.com/photo-1571863782775-24585ca3f599?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Cabins",
    qty: "13",
  },
  {
    imglink:
      "https://images.unsplash.com/photo-1595877244574-e90ce41ce089?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Cottages",
    qty: "3",
  },
  {
    imglink:
      "https://plus.unsplash.com/premium_photo-1679088034974-2c9c01d59992?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Hostels",
    qty: "300",
  },
];

const PropertyCarousels = () => {
  const dispatch = useAppDispatch();

  const [scrensize, setScreenSize] = useState(0);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setScreenSize(window.innerWidth);
    });
    return () => {
      window.removeEventListener("resize", () => {
        setScreenSize(window.innerWidth);
      });
    };
  }, [scrensize]);

  // console.log("screen",scrensize);

  useEffect(() => {
    dispatch(getHotelType());
    setScreenSize(window.innerWidth);
  }, []);
  return (
    <div className="w-[80%] mx-auto h-96 flex flex-col justify-center relative ">
      <h2 className="text-lg font-bold px-4">Browse by Property type</h2>
      <Carousel
        leftArrow={<CarouselButtons direction={"left"} />}
        rightArrow={<CarouselButtons direction={"right"} />}
        show={scrensize < 440 ? 1 : 3.5}
        slide={1}
        swiping={true}
      >
        {dummypropertydata?.map((item, idx) => (
          <PropertyCards key={idx} imglink={item.imglink} id={Number(idx)} />
        ))}
      </Carousel>
    </div>
  );
};

export default PropertyCarousels;
