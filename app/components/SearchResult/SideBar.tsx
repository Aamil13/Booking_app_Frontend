"use client"
import React, { useEffect, useState } from 'react'
import { IoIosArrowForward } from "react-icons/io";
import {format} from "date-fns"
import { DateRange } from 'react-date-range';
import { useRouter, useSearchParams } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useAppDispatch } from '@/redux/Slice/useTypedSelector';
import { searchResult, searchTypeResult } from '@/redux/Slice/hotelSlice';




const SideBar = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [isvisible, setIsVisible] = useState(false)
  const destination = searchParams.get("destination")
  const startdate = searchParams.get("startdate")
  const enddate = searchParams.get("enddate")
  const adult = searchParams.get("adult")
  const children = searchParams.get("children")
  const room = searchParams.get("room")
  const type = searchParams.get("type")
  // console.log(startdate);
  const [sidebarDatebool,setSidebarDateBool] = useState(false)
  const [sidebardate, setSidebarDate] = useState([
    {
      startDate: new Date(startdate as any ),
      endDate: new Date(enddate as any),
      key: 'selection'
    }
  ]);
  const [destinationoption, setDestinationOption] = useState(destination)
  
  const [adultoption, setAdultOption] = useState(adult)
  const [childrenoption, setChildrenOption] = useState(children)
  const [roomoption, setRoomOption] = useState(room)
  const [minprice, setMinPrice] = useState("")
  const [maxprice, setMaxPrice] = useState("")
  const [page,setPage] = useState(1)

  useEffect(()=>{
    if(type != null){
      dispatch(searchTypeResult({type,adult,page}))
      
    }else{
      dispatch(searchResult({destination,adult,page}))

    }
    
  },[])

 

  const handleSearch =async()=>{
   await router.push(`/searchresult/?destination=${destinationoption?.toLowerCase()}&startdate=${sidebardate[0].startDate}&enddate=${sidebardate[0].endDate}&adult=${adultoption}&children=${children}&room=${roomoption}&page=${page}&minPrice=${minprice}&maxPrice=${maxprice}`)
    
   await dispatch(searchResult({destination:(destinationoption), adult:adultoption, children:childrenoption,room:roomoption,minprice:minprice,maxprice:maxprice,page:page}))
  }

  return (
    <>
    <div onClick={()=>setIsVisible(!isvisible)} className={`fixed top-1/3 -left-2 bg-green-400 w-8 h-8 flex items-center justify-center rounded-full lg:hidden `}>
      <p className={`${isvisible ? "rotate-180" : ""} transition-all duration-200`}><IoIosArrowForward  className="text-white" /></p>
      </div>

    <div className={`w-[410px] max-lg:absolute ${isvisible ? "left-6" : "-left-96"} transition-all duration-200 max-lg:z-10 `}>
      <div className='w-72 bg-white border-2 rounded-lg  py-5 fixed p-2 flex flex-col gap-4'>
        <p className='font-bold ms-4'>Search</p>

        <div className='p-2 relative'>
          <p className='text-sm absolute -top-[2px] left-5 bg-white font-bold'>Destination</p>
          <input onChange={(e)=>setDestinationOption(e.target.value)} className='py-2 px-2 border-2 rounded-lg outline-none' type="text"  value={String(destinationoption)} />
        </div>

        <div className='p-2 relative'>
          <p className='text-sm absolute -top-[10px] left-5 bg-white font-bold'>Check-In-Date</p>
          {/* <p>{startdate}</p> */}
          {
            startdate && enddate &&
          <span onClick={()=>setSidebarDateBool(!sidebarDatebool)} className='text-sm ms-1 border-2 p-2 rounded-lg '>{`${format(sidebardate[0].startDate ,"dd/MM/yyyy")} to ${format(sidebardate[0].endDate,"dd/MM/yyyy")}`}</span>

          }
          <AnimatePresence>
                {
                    sidebarDatebool &&
                
                <motion.div className='shadow-lg absolute top-8 -left-10 max-md:z-10 max-md:top-10'
                initial={{opacity:0,y:"-10%"}}
         animate={{opacity:1,y:"5%"}}
         exit={{opacity:0,y:"-10%",transition:{duration:"0.35"}}}
         transition={{type:"spring",stiffness:"100", duration:"0.75"}} 
         >
                <DateRange
                    editableDateInputs={true}
                    onChange={item => setSidebarDate([item.selection as any])}
                     moveRangeOnFirstSelection={false}
                    ranges={sidebardate} 
                    minDate={new Date()}              
                />
                </motion.div>
                }
                </AnimatePresence>
          
        </div>

        <div>
          <p className='ms-4 text-sm font-bold'>Options</p>
          <div className='flex flex-col gap-3'>

            <div className='flex items-center justify-between px-4'>
              <p className='text-sm'>Min price per night</p>
              <input onChange={(e)=>setMinPrice(e.target.value)} className='border-2 w-24 p-1 outline-none' min={0} value={minprice} type="number" />
            </div>

            <div className='flex items-center justify-between px-4'>
              <p className='text-sm'>Max price per night</p>
              <input onChange={(e)=>setMaxPrice(e.target.value)} className='border-2 w-24 p-1 outline-none' min={0} value={maxprice} type="number" />
            </div>

            <div className='flex items-center justify-between px-4'>
              <p className='text-sm'>Adult</p>
              <input onChange={(e)=>setAdultOption(e.target.value)} className='border-2 w-24 p-1 outline-none' min={0} type="number" value={Number(adultoption)}  />
            </div>

            <div className='flex items-center justify-between px-4'>
              <p className='text-sm'>Children</p>
              <input onChange={(e)=>setChildrenOption(e.target.value)} className='border-2 w-24 p-1 outline-none' min={0} type="number" value={Number(childrenoption)} />
            </div>

            <div className='flex items-center justify-between px-4'>
              <p className='text-sm'>Room</p>
              <input onChange={(e)=>setRoomOption(e.target.value)} className='border-2 w-24 p-1 outline-none' min={0} type="number" value={Number(roomoption)} />
            </div>

          </div>
        </div>
        <button onClick={()=>handleSearch()} className='bg-green-400 p-2 rounded-lg text-white font-bold'>Search</button>
      </div>
    </div>
    </>
  )
}

export default SideBar