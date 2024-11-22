"use client";
import { getCookie } from "@/app/hooks/useCookie";
import { getHotelRoom } from "@/redux/Slice/hotelSlice";
import { useAppDispatch, useAppSelector } from "@/redux/Slice/useTypedSelector";
import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { IoIosCloseCircle } from "react-icons/io";
import {
  BeatLoader,
  FadeLoader,
  MoonLoader,
  PacmanLoader,
} from "react-spinners";

type Props = {
  hotelid: string;
  setShowReserve: React.Dispatch<React.SetStateAction<boolean>>;
  StartDate: string | null;
  EndDate: string | null;
  totalPrice: Number;
};

type roomnumberstate = {
  number: number;
  unavailableDates: Array<string>;
  _id: string;
};

type roomState = {
  title: string;
  desc: string;
  maxPeople: number;
  price: number;
  roomNumbers: Array<roomnumberstate>;
};

const ReserveModal = ({
  hotelid,
  setShowReserve,
  StartDate,
  EndDate,
  totalPrice,
}: Props) => {
  const dispatch = useAppDispatch();
  const [roomData, setRoomData] = useState<roomState[]>([]);
  const [roomLoading, serRoomLoading] = useState(false);
  const [ReserveLoading, setReserveLoading] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState<Array<string>>([]);
  const user = useAppSelector((state) => state.auth.AuthUser);
  const cookie = getCookie("access_token")

  useEffect(() => {
    const hotelcall = async () => {
      serRoomLoading(true);
      const res = await dispatch(getHotelRoom(hotelid));
      setRoomData(res.payload);
      serRoomLoading(false);
    };

    hotelcall();
  }, [hotelid]);
  // console.log("room",roomData);

  const handleshow = () => {
    setShowReserve(false);
  };

  const handleroomSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = (e.target as HTMLInputElement).checked;
    const value = (e.target as HTMLInputElement).value;
    // console.log("val",value);

    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value),
    );
  };
  // console.log("selecrooms",selectedRooms[0].split("/")[0]);

  const getDatesInRange = (startDate: any, endDate: any) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());
    // console.log("date",date);
    // console.log("end",end);

    let Dateslist = [];

    while (date <= end) {
      Dateslist.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return Dateslist;
  };

  const alldates = getDatesInRange(StartDate, EndDate);

  const isAvailable = (roomNumber: any) => {
    const isFound = roomNumber.unavailableDates.some((date: number) =>
      alldates.includes(new Date(date).getTime()),
    );

    return !isFound;
  };

  const handleClick = async () => {
    if (!selectedRooms.length) {
      return toast.error("Please Select a Room to book!");
    }

    try {
      // await Promise.all(
      //   selectedRooms.map(async(roomId) => {

      //     const res = await  axios.put(`/api/rooms/availability/${roomId.split("/")[0]}`, {
      //       dates: alldates,
      //       hotelid,
      //      user: user?._id,
      //      name:user?.username,
      //      roomno:roomId.split("/")[1]
      //     });
      //     console.log("res",res);

      //     return  res;
      //   })
      // );

      setReserveLoading(true);
      const updateRoomsAvailability = async () => {
        const responses = [];

        for (const roomId of selectedRooms) {
          const res = await axios.put(
            `/api/rooms/availability/${roomId.split("/")[0]}`,
            {
              dates: alldates,
              hotelid,
              user: user?._id,
              name: user?.username,
              totalPrice: totalPrice,
              roomno: roomId.split("/")[1],
            },{
              headers: {
                Authorization: `Bearer ${cookie}`
              }
            }
          );

          if (res.status == 200) {
            toast.success(`${roomId.split("/")[1]} Booked`);
          }

          responses.push(res);

          // Introduce a 2-second delay between consecutive iterations
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }
        setReserveLoading(false);
        setShowReserve(false);
        return responses;
      };

      updateRoomsAvailability();
    } catch (err) {
      return console.log(err);
    }
  };

  return (
    <div className="fixed top-1/3 bg-white w-1/2 max-sm:w-4/5 p-4 shadow-lg rounded-lg border-2 border-green-400">
      <div className="flex justify-between">
        <h3>Select your rooms:</h3>
        <div className="w-2/5 relative">
          <h3 className="text-center">Select Room number</h3>
          <p
            onClick={() => handleshow()}
            className="absolute top-0 right-0 max-sm:-right-4"
          >
            <IoIosCloseCircle size={24} />
          </p>
        </div>
      </div>

      {roomLoading ? (
        <div className="min-h-[250px] flex justify-center items-center">
          <MoonLoader color="#36d7b7" />
        </div>
      ) : roomData.length < 1 ? (
        <div className="min-h-[250px] flex justify-center items-center">
          No Rooms Available!
        </div>
      ) : roomData.length ? (
        roomData
          ?.filter((item) => item !== null)
          ?.map((item) => (
            <div className="flex my-4">
              <div className="w-3/5 text-sm">
                <p className="text-md font-medium my-1">{item?.title}</p>
                <p>{item?.desc}</p>
                <p>Max People: {item?.maxPeople}</p>
                <p>Price: {item?.price}</p>
              </div>

              <div className="flex w-2/5 justify-center items-start gap-4">
                {item?.roomNumbers?.map((number) => (
                  <div className="flex justify-center gap-1 items-center">
                    <label
                      className={`${!isAvailable(number) ? "line-through" : ""}  `}
                    >
                      {number?.number}
                    </label>
                    <input
                      type="checkbox"
                      value={number?._id + "/" + number?.number}
                      disabled={!isAvailable(number)}
                      onChange={(e) => handleroomSelect(e)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))
      ) : (
        <p>Something went wrong!</p>
      )}
      {roomData && (
        <div className="flex justify-center">
          <button
            disabled={ReserveLoading}
            onClick={handleClick}
            className=" py-2 px-4 font-bold text-white rounded-xl shadow-lg bg-green-400"
          >
            {ReserveLoading ? <BeatLoader size={6} color="white" /> : "Reserve"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ReserveModal;
