"use client";

import React, { useEffect, useState } from "react";
import { Carousel } from "@trendyol-js/react-carousel";
import CarouselButtons from "../buttons/CarouselButtons";
import HomeGuestCard from "../cards/HomeGuestCard";
import { useAppDispatch, useAppSelector } from "@/redux/Slice/useTypedSelector";
import { HomeGuest } from "@/redux/Slice/hotelSlice";
import { SyncLoader } from "react-spinners";

type propertytype = {
  imglink: string;
  name: string;
  location: string;
  Rating: number;
  StartPrice: number;
};
const dummypropertydata: Array<propertytype> = [
  {
    imglink:
      "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Leggo",
    location: "Red Gate, Delhi, India",
    Rating: 8.9,
    StartPrice: 500,
  },
];
type Props = {};

const HomeGuestCarousel = (props: Props) => {
  const homeGuestdata: any = useAppSelector(
    (state) => state?.hotel.guestTypeData.hotels,
  );
  const err: any = useAppSelector((state) => state?.hotel.guestTypeErr);
  const [scrensize, setScreenSize] = useState(0);
  const dispatch = useAppDispatch();

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

  useEffect(() => {
    dispatch(HomeGuest());
    setScreenSize(window.innerWidth);
  }, []);

  return (
    <div className="w-10/12 mx-auto h-[450px] flex flex-col  relative ">
      <h2 className="text-lg font-bold px-4">Home Guest Love</h2>

      {homeGuestdata.length ? (
        <Carousel
          leftArrow={<CarouselButtons direction={"left"} />}
          rightArrow={<CarouselButtons direction={"right"} />}
          show={scrensize < 440 ? 1 : 3.5}
          slide={1}
          swiping={true}
        >
          {homeGuestdata?.map((item: any, idx: number) => (
            <HomeGuestCard
              key={idx}
              id={item._id}
              img={item?.photos[0] || dummypropertydata[0].imglink}
              location={item.address}
              city={item.city}
              name={item.name}
              price={item.cheapestPrice}
              rating={item?.rating || 2}
            />
          ))}
        </Carousel>
      ) : err ? (
        <p className="text-center text-xl text-red-600">{err}</p>
      ) : (
        <p className="text-xs font-bold">
          <SyncLoader color="#36d7b7" size={5} />
        </p>
      )}
    </div>
  );
};

export default HomeGuestCarousel;
