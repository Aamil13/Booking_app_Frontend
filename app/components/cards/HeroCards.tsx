import React from 'react'
import SyncLoader from "react-spinners/SyncLoader";
import { IoIosWarning } from "react-icons/io";
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
type Props = {
    img:string;
    cityName:string;
    properties:Array<number> | any;
    id:number;
    loading: boolean;
    err: string | null
}



const HeroCards = ({img,cityName,properties,id,loading,err}:Props) => {
  // console.log("err",(err as any).message);

  const router = useRouter()

  const handleClick=()=>{
    if(!properties?.[id]){
     return toast.error("Currently No Property available!")
    }

    router.push(`/searchresult/?destination=${ cityName.toLowerCase()}&startdate=${new Date()}&enddate=${new Date(Date.now() + (60 * 60 * 24 * 1000))}&adult=1&children=0&room=1&page=1`)
  }
  
  return (
    <div onClick={()=>handleClick()} className={`${id >= 2 ? "max-md:col-span-2" : "col-span-2 max-md:col-span-4"} `}>
        <section className={`w-full ${id >= 2 ? "" : "" }  overflow-hidden relative` }>
            <img className={`object-cover rounded-lg ${id >= 2 ? "h-60 w-72" : "" } `} src={img} alt="city" />
            <div className='absolute bottom-4 left-3 text-white'>
            <h1 className={`${id >= 2 ? "text-xl" : "text-4xl"} font-bold `}>{cityName}</h1>
            {
              loading ?
            <SyncLoader color="#36d7b7" size={5} />
              :
              err ?
              <p className='flex items-center text-xs '><IoIosWarning />{(err as any)?.message}</p>
              :
              properties?.[id]  ?
              <h3>{properties?.[id]} Properties</h3>
              : <p>0 Properties</p>
              
            }
            </div>
        </section>
    </div>
  )
}

export default HeroCards