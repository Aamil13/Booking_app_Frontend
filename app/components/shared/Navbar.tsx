"use client"
import React from 'react'
import Dropdown from '../Dropdown/Dropdown'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/redux/Slice/useTypedSelector'
import { LogOut } from '@/redux/Slice/authSlice'
import { useRouter } from 'next/navigation'


type Props = {}

const Navbar = (props: Props) => {
  const auth = useAppSelector((state)=>state.auth.AuthUser)
  // console.log("auth",auth);
  
  const dispatch = useAppDispatch()
  const router = useRouter()
  return (
    <nav className='p-4  flex justify-center'>
        <div className='w-11/12 flex justify-between'>
          <Link href={"/"}>
            <h3 className='text-2xl font-bold ms-4 drop-shadow-md '>Booking</h3>
            </Link>
            <div className='flex gap-10 max-sm:hidden '>
               {
                auth?.username ?
                <>
                <button onClick={()=>router.push("/bookings")} className='border-2 bg-gray-800 text-white  rounded-full  px-4 py-2 text-sm border-[ADB3C9] hover:border-green-400 transition-all duration-300' >Reservation's</button>
                <button onClick={()=>dispatch(LogOut())}  className='border-2 bg-gray-800 text-white  rounded-full  px-6 py-2 text-sm border-[ADB3C9] hover:border-green-400 transition-all duration-300'>Log Out</button>
                </>
                :
                <>
                <button onClick={()=>router.push("/login")} className='border-2 bg-gray-800 text-white  rounded-full  px-6 py-2 text-sm border-[ADB3C9] hover:border-green-400 transition-all duration-300' >Login</button>
                <button onClick={()=>router.push("/register")} className='border-2 bg-gray-800 text-white  rounded-full  px-4 py-2 text-sm border-[ADB3C9] hover:border-green-400 transition-all duration-300' >Register</button>
                </>
               }
            </div>
            <Dropdown/>
        </div>
        </nav>
  )
}

export default Navbar