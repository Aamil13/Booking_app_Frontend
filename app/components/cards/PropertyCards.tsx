import { useAppSelector } from '@/redux/Slice/useTypedSelector';
import { useRouter } from 'next/navigation';
import React from 'react'
import toast from 'react-hot-toast';
import { SyncLoader } from 'react-spinners';


type datatype={
    imglink: string;
    id:number;
    
}



const PropertyCards = ({imglink,id}: datatype) => {
  const hoteltype:any = useAppSelector((state)=>state?.hotel?.HotelTypedata)
  const err = useAppSelector((state)=>state.hotel.HotelTypeerror)
  // console.log("aaa",hoteltype[id].type);
  const router = useRouter()

  const handleClick=()=>{
    if(hoteltype.count < 1){
     return toast.error("Currently No Property available!")
    }

    router.push(`/searchresult/?type=${hoteltype[id].type}&startdate=${new Date()}&enddate=${new Date(Date.now() + (60 * 60 * 24 * 1000))}&page=1`)
  }
  
  return (
    <div onClick={()=>handleClick()} className='flex flex-col p-4'>
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