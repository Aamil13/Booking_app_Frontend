"use client"
import React,{useState,useEffect} from 'react'
import HeroCards from '../cards/HeroCards'
import { useAppDispatch, useAppSelector } from '@/redux/Slice/useTypedSelector';
import { getCityCount } from '@/redux/Slice/hotelSlice';



type featuredType={
    img:string;
    CityName:string;
    properties:number;
}
const featuredData:Array<featuredType> =[
   {img:"https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",CityName:"Delhi",properties:123},
   {img:"https://images.unsplash.com/photo-1601961405399-801fb1f34581?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",CityName:"Mumbai",properties:23},
   {img:"https://plus.unsplash.com/premium_photo-1694475124739-52a401a12ab2?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",CityName:"Hyderabad",properties:193},
   {img:"https://images.unsplash.com/photo-1626602833614-e9c037d11799?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",CityName:"Lucknow",properties:18},
   {img:"https://images.unsplash.com/photo-1566323124805-757e5c41d37c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",CityName:"Kashmir",properties:12},
   {img:"https://images.unsplash.com/photo-1566323124805-757e5c41d37c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",CityName:"Kashmir",properties:12}
]

type Props = {}

const Featured = (props: Props) => {

  const dispatch = useAppDispatch()
  const hotelCount = useAppSelector((state)=>state.hotel.citydata)
// console.log(hotelCount);
const loading = useAppSelector((state)=>state.hotel.cityloading)
const err = useAppSelector((state)=>state.hotel.cityerror)
  
  useEffect(()=>{
    dispatch(getCityCount())
  },[])

  return (
    <div className='mt-28 max-sm:mt-40  flex justify-center w-[85%] max-sm:w-full mx-auto'>

        {/* <p>{featuredData[0].properties}</p> */}
        <section className='grid grid-cols-4 justify-center items-center p-8 gap-8'>
            {
                featuredData?.map((item,idx)=>(
                <HeroCards key={idx} err={err} id={idx} img={item.img} loading={loading} cityName={item.CityName} properties={hotelCount} />

                ))
            }
        </section>
    </div>
  )
}

export default Featured