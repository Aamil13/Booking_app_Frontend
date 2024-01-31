import { useAppSelector } from '@/redux/Slice/useTypedSelector';
import React from 'react'
import { SyncLoader } from 'react-spinners';


type datatype={
    imglink: string;
    id:number;
    
}



const PropertyCards = ({imglink,id}: datatype) => {
  const hoteltype:any = useAppSelector((state)=>state?.hotel?.HotelTypedata)
  const err = useAppSelector((state)=>state.hotel.HotelTypeerror)
  // console.log("aaa",hoteltype);

  
  return (
    <div className='flex flex-col p-4'>
        <img className='h-60 w-full  rounded-lg object-cover' src={imglink} alt="propertyimg" />
        {
          hoteltype?.[id] ?
          <>
        <p className='text-sm font-bold'>{hoteltype?.[id]?.type}</p>
        <p className='text-xs font-medium'>{hoteltype?.[id]?.count} <span className='lowercase'>{hoteltype?.[id]?.type}</span></p>
        </>
        :
        err? 
        <p className='text-xs text-red-600'>{err}</p>
        :
        <p className='text-xs font-bold'><SyncLoader color="#36d7b7" size={5} /></p>
        }
        
    </div>
  )
}

export default PropertyCards