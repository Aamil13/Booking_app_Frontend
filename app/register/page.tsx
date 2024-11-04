"use client";
import { Register } from "@/redux/Slice/authSlice";
import { useAppDispatch } from "@/redux/Slice/useTypedSelector";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

type Props = {};

const page = (props: Props) => {
  const [userdetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserDetails((state) => {
      return { ...state, [name]: value };
    });
  };

  const handleSubmit = async () => {
    let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

    if (!userdetails.name.length || userdetails.name.trim() == "") {
      return toast.error("User Name Required!");
    }

    if (!userdetails.password.length || userdetails.password.trim() === "") {
      return toast.error("Password Required!");
    }
    if (userdetails.password.length < 6) {
      return toast.error("Password Should be of minimum 6 digits!");
    }

    if (userdetails.password != userdetails.confirmPassword) {
      return toast.error("Password Do not Match!");
    }

    if (!regex.test(userdetails.email)) {
      return toast.error("UnValid Email!");
    }

    const req = await dispatch(Register(userdetails));

    if (req.type === "Register/fulfilled") {
      router.push("/login");
    }
  };
  return (
    <div className="h-[90vh] relative  max-md:h-[87vh] flex justify-center max-sm:items-start items-center max-sm:mt-5">
      <img
        className="absolute -z-10 w-full h-[101.2vh] -top-20 object-cover"
        src="https://cdn.pixabay.com/photo/2015/07/14/07/18/greece-844269_1280.jpg"
        alt=""
      />
      <div className="flex flex-col justify-start items-center max-sm:mt-10  max-md:gap-8 gap-16 bg-white w-1/2 max-xl:w-2/3 max-lg:w-4/5 max-sm:w-[98%]  h-4/5 max-sm:h-5/6 shadow-xl">
        <div className="mt-4 max-sm:mt-3">
          <p className="text-5xl max-sm:text-4xl max-sm:max-w-sm  max-w-xl text-center leading-relaxed font-medium">
            Don't have an Account Yet?
          </p>
          <p className="text-sm text-gray-600 text-center">
            Create An Account Now to Book Your Favarite Hotels.
          </p>
        </div>
        <div className="flex justify-center max-md:flex-col items-center max-md:gap-2 gap-20">
          <div className="flex flex-col gap-2">
            <input
              className="shadow-md border-2 py-3 px-8 outline-none rounded-full"
              type="text"
              onChange={handleChange}
              name="name"
              value={userdetails.name}
              placeholder="User Name"
            />
            <input
              className="shadow-md border-2 py-3 px-8 outline-none rounded-full"
              type="text"
              onChange={handleChange}
              name="email"
              value={userdetails.email}
              placeholder="Email"
            />
          </div>

          <div className="flex flex-col gap-2">
            <input
              className="shadow-md border-2 py-3 px-8 outline-none rounded-full"
              type="password"
              onChange={handleChange}
              name="password"
              value={userdetails.password}
              placeholder="Password"
            />
            <input
              className="shadow-md border-2 py-3 px-8 outline-none rounded-full"
              type="password"
              onChange={handleChange}
              name="confirmPassword"
              value={userdetails.confirmPassword}
              placeholder="Confirm Password"
            />
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="bg-gray-900 text-white shadow-md border-2 py-3 px-16 outline-none rounded-full"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default page;
