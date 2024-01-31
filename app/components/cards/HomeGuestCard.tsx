import { useAppSelector } from '@/redux/Slice/useTypedSelector';
import { useRouter } from 'next/navigation';
import React from 'react'

type datatype={
    img: string;
  rating:number;
  name:string;
  location:string;
  city:string;
  price:number;
id:string;

}

const HomeGuestCard = ({img,name,location,city,price,rating,id}: datatype) => {

  const router = useRouter()

    const handleClick=()=>{
      router.push(`/searchresult/${id}?startdate=${new Date()}&enddate=${new Date(Date.now() + (60 * 60 * 24 * 1000))}&room=1`)
    }
  return (
   
    <div onClick={()=>handleClick()} className=' flex flex-col justify-between  bg-white rounded-lg shadow-md mx-2 h-[410px]  '>
    <img className='h-60 w-70  rounded-lg rounded-b-none object-cover' src={img} alt="propertyimg" />
    <section className='flex flex-col gap-1 px-5'>
    <p className='text-sm font-bold'>{name}</p>
    <p className='text-xs font-medium'>{location}, <span className='lowercase'>{city}</span></p>
    <p className='text-sm '><span className='bg-blue-600 px-2 py-1 rounded-lg rounded-bl-none text-xs text-white'>{rating}</span> {rating >= 9 ? "Wonderful" : rating >=8 ? "Excellent" : "Good" } </p>
    </section>
    <p className='text-end px-5 py-4 '>Starting from <span className='font-bold'>₹{price}</span></p>
</div>
  )
}

export default HomeGuestCard