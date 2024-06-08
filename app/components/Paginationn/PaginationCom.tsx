"use client"
import { searchResult, searchTypeResult } from '@/redux/Slice/hotelSlice'
import { useAppDispatch, useAppSelector } from '@/redux/Slice/useTypedSelector'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { pagination } from '../shared/pagination'





const PaginationCom = () => {
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
  const paramspage  = searchParams.get("page")
  const type = searchParams.get("type")

    const count = Number(total)/5 
    let totalPages = Math.ceil(count)

    const paginated =  pagination(totalPages)
    const [currentPage, setCurrentPage] = useState(paramspage)

    const Router = useRouter()

    useEffect(()=>{
        setCurrentPage(paramspage)
    },[paramspage])

    const handleSearch =async(e:any)=>{
        // console.log("e",e.target.innerText);
        if(type != null){
            await Router.push(`/searchresult/?type=${type}&startdate=${startdate}&enddate=${enddate}&adult=${adult}&children=${children}&room=${room}&page=${e.target.innerText}`)   
            await dispatch(searchTypeResult({type:(type), adult:adult, children:children,room:room,minprice:minprice,maxprice:maxprice,page:e.target.innerText}))
           
            
          }else{
            await Router.push(`/searchresult/?destination=${destination?.toLowerCase()}&startdate=${startdate}&enddate=${enddate}&adult=${adult}&children=${children}&room=${room}&page=${e.target.innerText}`)   
            await dispatch(searchResult({destination:(destination), adult:adult, children:children,room:room,minprice:minprice,maxprice:maxprice,page:e.target.innerText}))
           
          }
      }
    
       const handlePrevNext = async(Number:number)=>{
        if(type != null){
            await Router.push(`/searchresult/?type=${type}&startdate=${startdate}&enddate=${enddate}&adult=${adult}&children=${children}&room=${room}&page=${Number}`)   
            await dispatch(searchTypeResult({type:(type), adult:adult, children:children,room:room,minprice:minprice,maxprice:maxprice,page:Number}))
           
            
          }else{
        await Router.push(`/searchresult/?destination=${destination?.toLowerCase()}&startdate=${startdate}&enddate=${enddate}&adult=${adult}&children=${children}&room=${room}&page=${Number}`)   
        await dispatch(searchResult({destination:(destination), adult:adult, children:children,room:room,minprice:minprice,maxprice:maxprice,page:Number}))
          }
       }

  return (
    <>
      {
        paginated.length <= 1 

        ?
         <div></div>
         
         :
    
   
    <div className="max-w-full mx-auto mt-12  text-gray-600 md:px-8">
       
   
    <div  className="hidden items-center justify-between sm:flex" aria-label="Pagination">
        <button disabled={Number(paginated[0]) == Number(currentPage)} onClick={()=>handlePrevNext((Number(currentPage) - 1))} className="hover:text-indigo-600 flex items-center gap-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M18 10a.75.75 0 01-.75.75H4.66l2.1 1.95a.75.75 0 11-1.02 1.1l-3.5-3.25a.75.75 0 010-1.1l3.5-3.25a.75.75 0 111.02 1.1l-2.1 1.95h12.59A.75.75 0 0118 10z" clipRule="evenodd" />
            </svg>
            Previous
        </button>
        <ul className="flex items-center gap-1">
            {
                paginated.map((item, idx) => (
                    <li key={item} className="text-sm">
                        {
                            item == "..." ? (
                                <div >
                                    {item}
                                </div>
                            ) : (

                                <p onClick={(e)=>handleSearch(e)} aria-current={currentPage == item ? "page" : false} className={`px-3 py-2 rounded-lg duration-150 hover:text-indigo-600 hover:bg-indigo-50 ${currentPage == item ? "bg-indigo-50 text-indigo-600 font-medium" : ""}`}>
                                    {item}
                                </p>
                            )
                        }
                    </li>
                ))
            }
        </ul>
        <button disabled={paginated.length == Number(currentPage)} onClick={()=>handlePrevNext((Number(currentPage) + 1))} className="hover:text-indigo-600 flex items-center gap-x-2">
            Next
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z" clipRule="evenodd" />
            </svg>
        </button>
    </div>
    {/* On mobile version */}
    <div className="flex items-center justify-between text-sm text-gray-600 font-medium sm:hidden">
        <button disabled={Number(paginated[0]) == Number(currentPage)} onClick={()=>handlePrevNext((Number(currentPage) - 1))} className="px-4 py-2 border rounded-lg duration-150 hover:bg-gray-50">Previous</button>
        <div className="font-medium">
            Page {currentPage} of {paginated.length}
        </div>
        <button disabled={paginated.length == Number(currentPage)} onClick={()=>handlePrevNext((Number(currentPage) + 1))} className="px-4 py-2 border rounded-lg duration-150 hover:bg-gray-50">Next</button>
    </div>
</div>
     }

</>
  )
}

export default PaginationCom