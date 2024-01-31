
import React from 'react'
// import hotelbg from "../../assests/best-san-diego-luxury-hotels.jpg"
import hotelbg from "../../assests/bannerimage.jpeg"


import HeroFilter from './HeroFilter'

type Props = {}

const Hero = (props: Props) => {

  return (
    <div className='flex h-[500px] max-sm:h-96 justify-center relative'>
        <div  className='w-11/12 relative flex justify-start '>
            <img className=' object-cover  rounded-3xl absolute  h-[500px] max-sm:h-96 w-full' src={hotelbg.src} alt="aa" />
            <div className='z-10 bg-transparent h-96 p-20 max-sm:p-4 flex flex-col justify-center'>
            <p className=' bg-transparent text-white text-6xl max-sm:text-3xl max-w-md max-sm:max-w-none leading-[80px]'>Enjoy Your Dream Vacation</p>
            <p className='bg-transparent text-white max-w-xs max-sm:text-sm max-sm:mb-20'>Where your journey to find the best hotel ends. And your exciting adventure of exploring new land begins.</p>
            </div>
        </div>
        <HeroFilter/>
    </div>
  )
}

export default Hero