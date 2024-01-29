"use client"
import { login } from '@/redux/Slice/authSlice'
import { useAppDispatch } from '@/redux/Slice/useTypedSelector'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

type Props = {}

const page = (props: Props) => {
    const [credentials, setCredentials]= useState({
        username:undefined,
        password:undefined
    })
    const router = useRouter()
    const dispatch = useAppDispatch()

    const handlechange =(e:any)=>{
        setCredentials((prev)=>({...prev,[e.target.name]:e.target.value}) )
    }
    // console.log("credentials",credentials);

    const handleSubmit=async()=>{
        
        if(!credentials?.username ||  (credentials["username"] as any).trim()=== "" || !credentials?.password ||  (credentials["password"] as any).trim()=== ""){
            return toast.error("All Fields Required!")
            
        }
        
        const req = await dispatch(login(credentials))
        console.log("user",req); 
        if(req.type === "LoginUser/fulfilled"){
            router.push("/")
        }
        

        
    }
    
  return (
    <div className='h-[90vh] relative max-md:h-[87vh] flex justify-center max-sm:items-start items-center max-sm:mt-5'>
        <img className='absolute -z-10 w-full h-[101.2vh] -top-20 object-cover' src="https://cdn.pixabay.com/photo/2018/04/05/13/08/water-3292794_1280.jpg" alt="" />
    <div className='flex flex-col justify-start items-center  max-md:gap-8 gap-16 bg-white w-1/2 max-xl:w-2/3 max-lg:w-4/5 max-sm:w-[98%]  h-4/5 max-sm:h-5/6 shadow-xl'>
        <div className='mt-4 max-sm:mt-3'>
            <p className='text-5xl max-sm:text-4xl  max-w-xs text-center leading-relaxed font-medium'>Login To Your Account</p>
            <p className='text-sm text-gray-600'>Your stop to perfect hotels tailored to your search.</p>
        </div>
        <div className='flex justify-center max-md:flex-col items-center max-md:gap-2 gap-20'>
            <div className='flex flex-col gap-2'>
                <input onChange={handlechange} className='shadow-md border-2 py-3 px-8 outline-none rounded-full' type="text" placeholder='User Name' name='username' />
                <input onChange={handlechange} className='shadow-md border-2 py-3 px-8 outline-none rounded-full' type="password" placeholder='password' name='password' />
                <button onClick={handleSubmit} className='bg-gray-900 text-white shadow-md border-2 py-3 px-8 outline-none rounded-full'>Login to Your Account</button>
            </div>
            <p className='font-bold'>/</p>
            <div className='flex justify-center items-center'>
                <button  className='shadow-md border-2 py-3 px-8 outline-none rounded-full'>Login with Google</button>
            </div>
        </div>
        <p>Forgot Password?</p>
    </div>
    </div>
  )
}

export default page