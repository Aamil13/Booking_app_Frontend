"use client"

import React, { useEffect, useState } from 'react'
import { Carousel } from '@trendyol-js/react-carousel';
import CarouselButtons from '../buttons/CarouselButtons';
import HomeGuestCard from '../cards/HomeGuestCard';
import { useAppDispatch, useAppSelector } from '@/redux/Slice/useTypedSelector';
import { HomeGuest } from '@/redux/Slice/hotelSlice';
import { SyncLoader } from 'react-spinners';

type propertytype={
  imglink: string;
  name: string;
  location:string,
  Rating:number;
  StartPrice:number;
}
const dummypropertydata:Array<propertytype>=[
    {imglink:"https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name:"Leggo", location:"Red Gate, Delhi, India",Rating:8.9,StartPrice:500},
      {imglink:"https://plus.unsplash.com/premium_photo-1661963239507-7bdf41a5e66b?q=80&w=2023&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name:"Ventura", location:" Powai, Mumbai, India",Rating:9.9,StartPrice:50000},
      {imglink:"https://images.unsplash.com/photo-1581859814481-bfd944e3122f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name:"Nawab", location:"Charminaar, Hyderabad, India",Rating:9,StartPrice:4500},
      {imglink:"https://images.unsplash.com/photo-1561026554-29d9815d4f3d?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name:"New House", location:"xx, Lucknow India",Rating:8,StartPrice:1500},
      {imglink:"https://images.unsplash.com/photo-1571863782775-24585ca3f599?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name:"Leggo", location:"Red Gate, Delhi, India",Rating:7,StartPrice:1100},
      {imglink:"https://images.unsplash.com/photo-1595877244574-e90ce41ce089?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name:"Leggo", location:"Red Gate, Delhi, India",Rating:8.3,StartPrice:1300},
      {imglink:"https://plus.unsplash.com/premium_photo-1679088034974-2c9c01d59992?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name:"Leggo", location:"Red Gate, Delhi, India",Rating:7.9,StartPrice:900},
  ]
type Props = {}

const HomeGuestCarousel = (props: Props) => {
  const homeGuestdata:any = useAppSelector((state)=> state?.hotel.guestTypeData.hotels)
  const err:any  =useAppSelector((state)=>state?.hotel.guestTypeErr)
 
  const dispatch = useAppDispatch()


  
  useEffect(()=>{
      dispatch(HomeGuest())
  },[])
  
  return (
    <div className='w-10/12 mx-auto h-[450px] flex flex-col  relative '>
      <h2 className='text-lg font-bold px-4'>Home Guest Love</h2>
     
    {
      homeGuestdata.length ?
      <Carousel leftArrow={<CarouselButtons direction={"left"} />} rightArrow={<CarouselButtons direction={"right"} />} show={3.5} slide={1} swiping={true}>
   
      {
        
        homeGuestdata?.map((item:any,idx:number)=>(
          <HomeGuestCard key={idx} id={item._id}  img={dummypropertydata[idx].imglink} location={item.address} city={item.city} name={item.name} price={item.cheapestPrice} rating={dummypropertydata[idx].Rating}  />
          
        ))
      }
    
  
</Carousel>

      :
      err ?
      <p className='text-center text-xl text-red-600'>{err}</p>
      :
      <p className='text-xs font-bold'><SyncLoader color="#36d7b7" size={5} /></p>
    }
</div>
  )
}

export default HomeGuestCarousel