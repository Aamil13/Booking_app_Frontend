"use client";
import Suscribe from "@/app/components/Suscribe/Suscribe";
import ReserveModal from "@/app/components/reserve/ReserveModal";
import Copyright from "@/app/components/shared/Copyright";
import Footer from "@/app/components/shared/Footer";
import { GetsingleHotel } from "@/redux/Slice/hotelSlice";
import { useAppDispatch, useAppSelector } from "@/redux/Slice/useTypedSelector";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { HashLoader } from "react-spinners";

type Props = {};

const imgdata = [
  {
    imglink:
      "https://plus.unsplash.com/premium_photo-1661964225206-fd5d445a6edd?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    imglink:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    imglink:
      "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    imglink:
      "https://plus.unsplash.com/premium_photo-1661964225206-fd5d445a6edd?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    imglink:
      "https://plus.unsplash.com/premium_photo-1661964225206-fd5d445a6edd?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    imglink:
      "https://plus.unsplash.com/premium_photo-1661964225206-fd5d445a6edd?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

type typeData = {
  _id: string;
  name: string;
  type: string;
  city: string;
  address: string;
  distance: string;
  photos: Array<string> | [];
  title: string;
  desc: string;
  rooms: Array<number> | [];
  cheapestPrice: number;
  featured: boolean;
  __v: number;
};

const page = (props: Props) => {
  const dispatch = useAppDispatch();
  const param = useParams();
  const searchParams = useSearchParams();
  const startdate = searchParams.get("startdate");
  const enddate = searchParams.get("enddate");
  const room = searchParams.get("room");
  // console.log(startdate);
  const auth = useAppSelector((state) => state.auth.AuthUser);
  const [data, setData] = useState<typeData>();
  const [loading, setLoading] = useState(true);
  // console.log("data",data);

  const [showCarousel, setShowCarousel] = useState(false);
  const [activeCarousel, setActiveCarousel] = useState(0);
  // console.log(activeCarousel);

  const [showReserve, setShowReserve] = useState(false);

  const handleClick = (current: number) => {
    setActiveCarousel(current);
    setShowCarousel(true);
  };

  const handleDirection = (direction: string) => {
    let newActiveCarousel;

    if (direction === "l") {
      newActiveCarousel = activeCarousel === 0 ? 5 : activeCarousel - 1;
    } else {
      newActiveCarousel = activeCarousel === 5 ? 0 : activeCarousel + 1;
    }

    setActiveCarousel(newActiveCarousel);
  };

  // date difference
  const MilisecPerDay = 1000 * 60 * 60 * 24;

  function dayDiffence(date1: string, date2: string) {
    const timeDiff = Math.abs(
      new Date(date2).getTime() - new Date(date1).getTime(),
    );
    const diffDays = Math.ceil(timeDiff / MilisecPerDay);
    return diffDays;
  }

  const days = startdate && enddate && dayDiffence(startdate, enddate);

  useEffect(() => {
    const getsingle = async () => {
      setLoading(true);
      const res = await dispatch(GetsingleHotel(param.id.toString()));
      setData(res.payload);
      setLoading(false);
    };

    getsingle();
  }, []);

  const handleReserveModal = () => {
    if (days == 0) {
      return toast.error("Minimum 1 Night Stay!");
    }
    auth?.username
      ? setShowReserve(true)
      : toast.error("Please Login to Reserve!");
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center min-h-[500px]">
          <HashLoader color="green" />
        </div>
      ) : (
        <div className="flex justify-center items-center">
          {/* image carousel  */}
          {showCarousel && (
            <div className="fixed top-1/3 flex justify-center items-center gap-4 ">
              <div
                className="right-4 -top-8 absolute"
                onClick={() => setShowCarousel(false)}
              >
                <IoMdCloseCircle size={40} color="black" />
              </div>

              <FaArrowAltCircleLeft
                onClick={() => handleDirection("l")}
                size={40}
                color="black"
              />
              <img
                className="w-[700px] max-sm:w-[300px] h-[400px] max-sm:h-[300px] rounded-lg object-cover border-4 border-white"
                src={imgdata[activeCarousel].imglink}
                alt="aa"
              />
              <FaArrowAltCircleRight
                onClick={() => handleDirection("r")}
                size={40}
                color="black"
              />
            </div>
          )}

          <div className="border-2 w-3/4 max-sm:w-11/12 bg-white shadow-md">
            {/* header  */}
            <div className="flex justify-between max-md:flex-col max-md:gap-2 p-4">
              <div className="flex flex-col justify-center gap-1">
                <h1 className="text-xl font-bold">{data?.name}</h1>
                <p className="text-sm">
                  {data?.address} {data?.city}
                </p>
                <p className="text-xs text-green-400">
                  Book a stay over {data?.distance} at this property and get a
                  free airport taxi
                </p>
              </div>
              <button
                className="bg-green-400 p-2 h-10 rounded-2xl shadow-md text-white text-sm hover:bg-green-600 transition-all duration-200"
                onClick={() => handleReserveModal()}
              >
                Reserve or Book Now!
              </button>
            </div>
            {/* images  */}
            <div className="flex flex-wrap justify-center gap-2">
              {data?.photos?.map((item, idx) => (
                <img
                  onClick={() => handleClick(idx)}
                  key={idx}
                  className="w-[360px] max-sm:w-80 h-72  "
                  src={item}
                  alt="a"
                />
              ))}
            </div>

            <div className="p-2 flex gap-2 justify-between max-sm:flex-col max-sm:justify-center max-sm:items-center">
              <div className="">
                <p className="text-lg font-bold">
                  Stay in the heart of the city
                </p>
                <p className="text-xs max-w-3xl">{data?.desc}</p>
              </div>
              <div className="w-72 flex flex-col justify-center px-4 py-5 gap-3 border-2 shadow-lg">
                <p className="text-lg font-bold">
                  Perfect for a {days}-night stay
                </p>
                <p className="text-xs max-w-[200px]">
                  Located in the real heart of Delhi, this property has an
                  excellent location score of 9.8!
                </p>
                <p className="font-bold">
                  ₹
                  {(days as number) *
                    (data?.cheapestPrice as number) *
                    (room as any)}{" "}
                  <span className="font-normal">({days} nights)</span>
                </p>
                <button
                  className="bg-green-400 p-2 rounded-lg font-bold text-white"
                  onClick={() => handleReserveModal()}
                >
                  Reserve or Book-Now!
                </button>
              </div>
            </div>
          </div>

          {/* ///rESERVE Modal  */}
          {showReserve && (
            <ReserveModal
              hotelid={param.id.toString()}
              setShowReserve={setShowReserve}
              StartDate={startdate}
              EndDate={enddate}
              totalPrice={Number(data?.cheapestPrice)}
            />
          )}
        </div>
      )}
      <Suscribe />
      <Footer />
      <Copyright />
    </>
  );
};

export default page;
