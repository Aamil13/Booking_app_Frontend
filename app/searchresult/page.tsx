
import React from 'react'
import SideBar from '../components/SearchResult/SideBar'
import SearchpageHeader from '../components/SearchResult/SearchpageHeader'
import SearchResults from '../components/SearchResult/SearchResults'
import Copyright from '../components/shared/Copyright'
import PaginationCom from '../components/Paginationn/PaginationCom'




type Props = {}

const page = (props: Props) => {

  return (
    <>
    <div className='w-full flex justify-center p-10'>
     <div className='flex gap-5 justify-between w-full'>
     <SideBar/>
      <div className='w-full h-full flex flex-col justify-center'>
      <SearchpageHeader/>
      <SearchResults/>
      <PaginationCom/>
      </div>
     </div>
    </div>

         <Copyright/>
         </>
  )
}

export default page