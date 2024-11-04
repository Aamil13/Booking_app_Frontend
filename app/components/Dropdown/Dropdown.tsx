"use client";
import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/redux/Slice/useTypedSelector";
import { useRouter } from "next/navigation";
import { LogOut } from "@/redux/Slice/authSlice";
type Props = {};

const Dropdown = (props: Props) => {
  const [show, setShow] = useState(false);
  const auth = useAppSelector((state) => state.auth.AuthUser);
  // console.log("auth",auth);

  const dispatch = useAppDispatch();
  const router = useRouter();
  return (
    <motion.div className="max-sm:block hidden relative z-20 ">
      <div onClick={() => setShow(!show)}>
        <CgProfile size={24} />
      </div>
      <AnimatePresence>
        {show && (
          <motion.div
            className="absolute  -right-6 bg-white p-2 shadow-lg "
            initial={{ opacity: 0, y: "-10%" }}
            animate={{ opacity: 1, y: "5%" }}
            exit={{ opacity: 0, y: "-10%", transition: { duration: "0.35" } }}
            transition={{ type: "spring", stiffness: "100", duration: "0.75" }}
          >
            {auth?.username ? (
              <>
                <p
                  onClick={() => router.push("/bookings")}
                  className="bg-inherit cursor-pointer hover:text-green-300 transition-all duration-150"
                >
                  Bookings
                </p>
                <p
                  onClick={() => dispatch(LogOut())}
                  className="bg-inherit cursor-pointer hover:text-green-300 transition-all duration-150"
                >
                  Log-Out
                </p>
              </>
            ) : (
              <>
                <p
                  onClick={() => router.push("/login")}
                  className="bg-inherit cursor-pointer hover:text-green-300 transition-all duration-150"
                >
                  Login
                </p>
                <p
                  onClick={() => router.push("/register")}
                  className=" bg-inherit cursor-pointer hover:text-green-300 transition-all duration-150"
                >
                  Register
                </p>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Dropdown;
