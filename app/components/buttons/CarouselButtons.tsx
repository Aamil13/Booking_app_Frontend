import React from 'react'
import { IoIosArrowBack,IoIosArrowForward } from "react-icons/io";

type props ={
    direction: string;
}
const CarouselButtons = ({direction}: props) => {
  return (
    <div className={`bg-white rounded-full shadow-lg w-8 h-8 flex items-center justify-center hover:bg-slate-300 transition-all duration-200 absolute z-10 top-[40%] ${direction === "left" ? "-left-1" : "-right-3"}`}>
        {
            direction === "left" ?
            <IoIosArrowBack className='  ' size={20}/>
            :
            <IoIosArrowForward size={20}/>
        }
       
    </div>
  )
}

export default CarouselButtons