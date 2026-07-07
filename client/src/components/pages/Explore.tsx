import Sidebar from "../ui/Sidebar"
import { FiSearch } from "react-icons/fi"

function Explore() {
    return (
        <div className="bg-black w-screen h-screen absolute flex ">
        <div className="z-50 h-full flex">
      <Sidebar/>
      </div>
      <div className="justify-center relative items-center mx-auto bg-[#343434] hover:bg-[#585858] mt-10 w-[40%] rounded-2xl h-10 text-[#cccccc] flex">
      <span className="text-2xl pl-3"><FiSearch/></span>
      <input placeholder="Search creators or topics" className=" p-5 w-full placeholder:text-[#cccccc] focus:outline-none rounded-2xl"/>
      </div>
        
        </div>
    )
}

export default Explore