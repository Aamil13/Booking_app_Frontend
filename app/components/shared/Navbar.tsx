"use client"
import React, { useEffect, useState } from 'react'
import Dropdown from '../Dropdown/Dropdown'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/redux/Slice/useTypedSelector'
import { LogOut } from '@/redux/Slice/authSlice'
import {BarLoader} from "react-spinners"




const Navbar = () => {
  const auth = useAppSelector((state)=>state.auth.AuthUser)
  const dispatch = useAppDispatch()
  const [isLogin, setIsLogin] = useState<boolean | undefined>(undefined)
  
  useEffect(()=>{
    
      setIsLogin(!!auth)
    
  },[auth])

  const UserStateComponent = () => {
    switch (isLogin) {
      case false:
        return (
          <>
            <Link href={"/login"}>
              <button className='border-2 bg-gray-800 text-white rounded-full px-6 py-2 text-sm border-[ADB3C9] hover:border-green-400 transition-all duration-300'>
                Login
              </button>
            </Link>
            <Link href={"/register"}>
              <button className='border-2 bg-gray-800 text-white rounded-full px-4 py-2 text-sm border-[ADB3C9] hover:border-green-400 transition-all duration-300'>
                Register
              </button>
            </Link>
          </>
        );
      case true:
        return (
          <>
            <Link href={"/bookings"}>
              <button className='border-2 bg-gray-800 text-white rounded-full px-4 py-2 text-sm border-[ADB3C9] hover:border-green-400 transition-all duration-300'>
                Reservation's
              </button>
            </Link>
            <button onClick={() => dispatch(LogOut())} className='border-2 bg-gray-800 text-white rounded-full px-6 py-2 text-sm border-[ADB3C9] hover:border-green-400 transition-all duration-300'>
              Log Out
            </button>
          </>
        );
      default:
        return <div className='py-4'><BarLoader/></div>;
    }
  };


  return (
    <nav className='p-4  flex justify-center'>
        <div className='w-11/12 flex justify-between'>
          <Link href={"/"}>
            <h3 className='text-2xl font-bold ms-4 drop-shadow-md '>Booking</h3>
            </Link>
            <div className='flex gap-10 max-sm:hidden '>
              <UserStateComponent/>
            </div>
            <Dropdown/>
        </div>
        </nav>
  )
}

export default Navbar