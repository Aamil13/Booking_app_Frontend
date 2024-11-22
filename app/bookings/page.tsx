"use client";
import { useAppSelector } from "@/redux/Slice/useTypedSelector";
import { Pagination } from "@nextui-org/pagination";
import axios from "axios";
import { redirect } from "next/navigation";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import { getCookie } from "../hooks/useCookie";

type Props = {};

const page = (props: Props) => {
  const [data, setData] = useState([]);
  const [totalcount, setTotalCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const id = useAppSelector((state) => state.auth.AuthUser?._id);
  const cookie = getCookie("access_token")

  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // You can customize the formatting as needed
  };

  const bookingscall = async (e: Number) => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/user/usertransaction/${id}?page=${e}`,  {
        headers: {
          Authorization: `Bearer ${cookie}`
        }
      });
      // console.log(res.data);
      setTotalCount(res.data.totalCount);
      setLoading(false);
      return setData(res.data.user.bookings);
    } catch (error) {
      setLoading(false);
      return console.log(error);
    }
  };
  // console.log("data",data);

  const count = Number(totalcount) / 5;

  useEffect(() => {
    bookingscall(1);
  }, []);

  useLayoutEffect(() => {
    if (!id) {
      return redirect("/");
    }
  }, []);

  return (
    <div className="w-full mx-auto p-8 flex flex-col">
      <p className="text-2xl font-bold">Reservations</p>
      <div className="flex flex-wrap gap-4 justify-center ">
        {loading ? (
          <div className="h-96 flex justify-center items-center">
            <SyncLoader size={24} />
          </div>
        ) : data && data.length ? (
          data.map((item: any, key) => (
            <div
              key={key}
              className="w-64 h-96 flex flex-col justify-between shadow-lg p-2 border-2 bg-white"
            >
              <div className="border-b-4 border-dashed py-2">
                Booking_ID <span className="text-sm font-">{item?._id}</span>
              </div>

              <div className="flex flex-col items-center justify-center h-20 border-b-4 border-dashed">
                Location:{" "}
                <span className="text-lg font-bold">
                  {" "}
                  {item?.hotelid?.city},{item?.hotelid?.address}
                </span>
              </div>
              <div className="h-40 flex flex-col justify-center gap-2">
                <p>Name: {item?.name}</p>
                <p className="text-sm">
                  From: {formatDate(item?.BookedDates[0][0])}
                </p>
                <p className="text-sm">
                  To: {formatDate(item?.BookedDates[0][1])}
                </p>
                <p>Hotel: {item?.hotelid?.name}</p>
                <p>Room: {item?.roomno}</p>
              </div>
            </div>
          ))
        ) : (
          <div>No Data To Show!</div>
        )}
      </div>
      {!loading && data?.length > 4 && (
        <div className="flex flex-wrap gap-4 items-center justify-center ">
          <Pagination
            classNames={{
              wrapper: "gap-2 ",
              item: "w-8 h-8 text-small rounded-full shadow-md text-black",
              cursor: " w-8 h-8 text-small rounded-none",
            }}
            onChange={(e) => bookingscall(e)}
            total={Math.ceil(count)}
            initialPage={1}
            color="primary"
          />
        </div>
      )}
    </div>
  );
};

export default page;
