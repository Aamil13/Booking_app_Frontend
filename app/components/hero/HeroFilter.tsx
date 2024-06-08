"use client"
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import React,{Suspense, useEffect, useRef, useState} from 'react'
import { FaHotel } from "react-icons/fa6";
import { CiCalendarDate } from "react-icons/ci";
import { FaPerson } from "react-icons/fa6";
import { FaSearchLocation } from "react-icons/fa";
import { DateRange } from 'react-date-range';
import {format} from "date-fns"
import { motion,AnimatePresence } from "framer-motion"
import { useRouter } from 'next/navigation';
import {HashLoader} from "react-spinners"
import toast from 'react-hot-toast';


type Props = {}

const HeroFilter = (props: Props) => {
    const router = useRouter()
    const [destination, setDestination] = useState("")
    
    const [herodate, setHeroState] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      ]);
    //   console.log("hero",herodate);
    const HeroRef = useRef<HTMLDivElement>(null);
    const OptionRef = useRef<HTMLDivElement>(null);
      const [showHeroDate,setShowHeroDate] = useState(false)

      const [openOption,setOpenOption] = useState(false)
      const [option, setOption] = useState({
        adult:1,
        children:0,
        room:1,
      })
      
      const handleOption = (name:string,operation:string)=>{
            setOption((prev)=>{
                return{
                    ...prev,
                    [name]: operation === "i" ? option[name as keyof typeof option] + 1 : option[name as keyof typeof option] -1
                }
            })
      }

      const changePage = async()=>{
        if(!destination.length || destination.trim() == ""){
            return toast('Enter Valid Destination!', {
                icon: '👏',
              });
        }
        await router.push(`/searchresult/?destination=${destination.toLowerCase()}&startdate=${herodate[0].startDate}&enddate=${herodate[0].endDate}&adult=${option.adult}&children=${option.children}&room=${option.room}`)
      }

      useEffect(() => {
        const handleClickOutside = (event:any) => {
            if (HeroRef.current && !HeroRef.current.contains(event.target as Node)) {
                setShowHeroDate(false);
            }
           if(OptionRef.current && !OptionRef.current.contains(event.target as Node)) {
            setOpenOption(false);
            }
        };

        if (showHeroDate || openOption) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showHeroDate, openOption]);



  return (
    <div className='z-10 absolute bottom-[-70px] max-md:bottom-[-120px] h-32 max-md:h-56 max-sm:h-72 max-sm:bottom-[-150px] bg-white shadow-2xl w-2/3 max-sm:w-4/5 rounded-xl border-2 border-blue-300 p-4'>
        
        <div className='h-full flex max-md:flex-col  justify-between max-md:items-center  bg-white '>
            <section className='bg-white flex gap-2   items-center h-full p-2'>
            <FaHotel size={24} />
            <input onChange={(e)=>setDestination(e.target.value)} className='outline-none py-2 bg-white max-lg:w-36 max-lg:text-sm' type="text" placeholder='where are you going?' />
            </section>

            {/* date  */}
            <section className='bg-white flex gap-2 items-center h-full p-2 relative'>
            <CiCalendarDate className='bg-white' size={32} />
                <span onClick={()=>setShowHeroDate(!showHeroDate)} className='bg-white py-2'>{`${format(herodate[0].startDate,"dd/MM/yyyy")} to ${format(herodate[0].endDate,"dd/MM/yyyy")}`}</span>   
                <AnimatePresence>
                {
                    showHeroDate &&
                
                <motion.div className='shadow-lg absolute top-20 -left-10 max-md:z-10 max-md:top-10'
                ref={HeroRef}
                initial={{opacity:0,y:"-10%"}}
         animate={{opacity:1,y:"5%"}}
         exit={{opacity:0,y:"-10%",transition:{duration:"0.35"}}}
         transition={{type:"spring",stiffness:"100", duration:"0.75"}} 
         >
                <DateRange
                    editableDateInputs={true}
                    onChange={item => setHeroState([item.selection as any])}
                     moveRangeOnFirstSelection={false}
                    ranges={herodate}
                    minDate={new Date()}       
                />
                </motion.div>
                }
                </AnimatePresence>
            </section>

            {/* no. of individuals */}
            <section  className='bg-white flex gap-2 items-center h-full p-2 relative'>
            <FaPerson className='bg-white' size={24} />
                <span onClick={()=>setOpenOption(!openOption)} className='bg-white py-2 tabular-nums'>{`${option.adult} adult · ${option.children} children · ${option.room} room`}</span>   

                <AnimatePresence>
            {
                openOption &&
                    <motion.div className='absolute w-52 bg-white top-20 left-12 max-md:left-5 max-md:top-10 max-lg:-left-4 shadow-lg border-2'
                    ref={OptionRef}
                    initial={{opacity:0,y:"-10%"}}
                    animate={{opacity:1,y:"5%"}}
                    exit={{opacity:0,y:"-10%",transition:{duration:"0.35"}}}
                    transition={{type:"spring",stiffness:"100", duration:"0.75"}}
                    >
                    <div className='flex justify-between p-2 items-center'>
                    <span className='w-20'>Adult</span>
                    <div className=' w-1/2 flex justify-between items-center gap-2 '>
                        <button onClick={()=>handleOption("adult","i")} className='w-6 text-xl border-2 border-green-300 rounded-md'>+</button>
                        <span className='text-sm tabular-nums '>{option.adult}</span>
                        <button disabled={option.adult <= 1} onClick={()=>handleOption("adult","d")} className='w-6 text-xl border-2 border-green-300 rounded-md'>-</button>
                    </div>
                    </div>

                    <div className=' flex justify-between p-2 items-center '>
                    <span className='w-20'>Children</span>
                    <div className='w-1/2  flex justify-between  items-center gap-2'>
                        <button onClick={()=>handleOption("children","i")} className='w-6 text-xl border-2 border-green-300 rounded-md'>+</button>
                        <span className='text-sm '>{option.children}</span>
                        <button disabled={option.children <= 0} onClick={()=>handleOption("children","d")} className='w-6 text-xl border-2 border-green-300 rounded-md'>-</button>
                    </div>
                    </div>

                    <div className=' flex justify-between p-2 items-center'>
                    <span className='w-20'>Room</span>
                    <div className='w-1/2 flex justify-between items-center gap-2'>
                        <button onClick={()=>handleOption("room","i")} className='w-6 text-xl border-2 border-green-300 rounded-md'>+</button>
                        <span className='text-sm'>{option.room}</span>
                        <button disabled={option.room <= 1} onClick={()=>handleOption("room","d")} className='w-6 text-xl border-2 border-green-300 rounded-md'>-</button>
                    </div>
                    </div>

                </motion.div>
            }
                </AnimatePresence>
            </section>

            <section onClick={()=>changePage()} className='bg-white flex gap-2 items-center h-full p-2'>
            <Suspense fallback={<p>Loading feed...</p>}>
          
                <FaSearchLocation  className='bg-white' size={24} />
                </Suspense>
           
            </section>
        </div>
        

        </div>
  )
}

export default HeroFilter