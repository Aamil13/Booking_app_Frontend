"use client"

import { searchResult } from '@/redux/Slice/hotelSlice'
import { useAppDispatch, useAppSelector } from '@/redux/Slice/useTypedSelector'
import { Pagination } from '@nextui-org/pagination'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

type Props = {}

const PaginationCom = (props: Props) => {
    const total = useAppSelector((state)=>state.hotel.searchTypeData.count)
    const dispatch = useAppDispatch()
    const searchParams = useSearchParams()

    const destination = searchParams.get("destination")
  const startdate = searchParams.get("startdate")
  const enddate = searchParams.get("enddate")
  const adult = searchParams.get("adult")
  const children = searchParams.get("children")
  const room = searchParams.get("room")
  const minprice = searchParams.get("minPrice")
  const maxprice  = searchParams.get("maxPrice")

//   const [page, setPage] = useState(1)


    const count = Number(total)/5 
    // console.log("count",Math.ceil(count));
    const Router = useRouter()

    const handleSearch =async(e:any)=>{
        // console.log("e",e);
        
        // await setPage(e)

        await Router.push(`/searchresult/?destination=${destination?.toLowerCase()}&startdate=${startdate}&enddate=${enddate}&adult=${adult}&children=${children}&room=${room}&page=${e}`)
         
        await dispatch(searchResult({destination:(destination), adult:adult, children:children,room:room,minprice:minprice,maxprice:maxprice,page:e}))
       }
    
  return (
    <div className='flex flex-wrap gap-4 items-center justify-center '>
        <Pagination
        classNames={{
            wrapper: "gap-2 ",
            item: "w-8 h-8 text-small rounded-full shadow-md text-black",
            cursor:
              "text-green-500 w-8 h-8 text-small rounded-none",
          }}
        onChange={(e)=>handleSearch(e)} total={Math.ceil(count)} initialPage={1} color='primary' />
    </div>
  )
}

export default PaginationCom