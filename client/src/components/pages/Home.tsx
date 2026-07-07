import Sidebar from "../ui/Sidebar"
import { FiSearch } from "react-icons/fi"
import { useRef, useState } from "react"
import { IoIosArrowForward, IoIosArrowBack, IoIosClose } from "react-icons/io";


function Home() {
const scrollRef = useRef<HTMLDivElement | null>(null);

  const [selectedTab, setSelectedTab] = useState("All");

const handleScrollRight = () => {
  if (scrollRef.current) {
    scrollRef.current.scrollBy({
      left: 400,
      behavior: "smooth",
    });
  }
};

const handleScrollLeft = () => {
  if (scrollRef.current) {
    scrollRef.current.scrollBy({
      left: -400,
      behavior: "smooth",
    });
  }
};



  

  const tabs=[
    {label: "All",  },
    {label: "Pop",  },
    {label: "Comedy",  },
    {label: "Educational",  },
    {label: "Podcast & Shows",  },
    {label: "Musicians",  },
    {label: "Musicians",  },
    {label: "Entertainment",  },
    {label: "Visual Arts",  },
    {label: "Illustration",  },
    {label: "Musicians",  },
    {label: "Entertainment",  },
    {label: "Visual Arts",  },
    {label: "Illustration",  },
    
  
  ]
  

  return (
       <div className="bg-black w-screen h-screen flex ">
        <div className="z-50 h-full relative flex">
      <Sidebar/>
      </div>

      <div className="flex flex-col ml-[17%] w-[83%]">

      <div className=" items-center mx-auto  bg-[#343434] hover:bg-[#585858] mt-10 w-[50%] rounded-2xl duration-200 h-10 text-[#cccccc] flex">
      <span className="text-2xl pl-3"><FiSearch/></span>
      <input placeholder="Search creators or topics" className=" p-5 w-full placeholder:text-[#cccccc] focus:outline-none rounded-2xl"/>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide whitespace-nowrap p-7"
        style={{
          scrollBehavior: "smooth",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
        }}
      >
        {tabs.map((tab) => (
          <div
            key={tab.label}
            onClick={() => setSelectedTab(tab.label)}
            className={`flex rounded-md items-center gap-2  py-2 px-4 cursor-pointer  ${selectedTab ===tab.label ? "bg-white text-black hover:bg-[#cecece]":"bg-[#343434] text-white hover:bg-[#585858]"} duration-200 `}
          >
            <span>{tab.label}</span> {selectedTab ===tab.label && selectedTab!=="All" ? <IoIosClose onClick={(e) => {e.stopPropagation();  setSelectedTab("All");}} className="bg-black text-white rounded-full" />:""}
          </div>
        ))}
      </div>
        <div className=" absolute top-[14%] right-0 bg-gradient-to-l from-black via-black/50 to-transparent text-white py-6 px-4 ">
          </div>
          <button onClick={handleScrollRight} className="absolute top-[15%] right-0 hover:bg-[#343434] text-white p-2 rounded-full z-10">
          <IoIosArrowForward className="text-xl" /></button>
          <div className=" absolute top-[14%] left-[17%] bg-gradient-to-r from-black via-black/50 to-transparent text-white py-6 px-4 ">
          </div>
          <button onClick={handleScrollLeft} className="absolute top-[15%] left-[17%] hover:bg-[#343434] text-white p-2 rounded-full z-10">
          <IoIosArrowBack className="text-xl" /></button>






          </div>
        </div>
    )
}

export default Home