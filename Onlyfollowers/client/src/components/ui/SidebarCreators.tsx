import { useState,useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiHome,
  FiLogOut,
  FiSearch,
  FiMoreVertical,

} from "react-icons/fi"; 
import {
  IoNotificationsOutline,
} from  "react-icons/io5";

import { HiOutlineChatAlt2 } from "react-icons/hi";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { TbLibrary } from "react-icons/tb";
import { IoPeople } from "react-icons/io5";
import { CgInsights } from "react-icons/cg";
import { MdPayment } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { GrAnnounce } from "react-icons/gr";
import { IoCreate } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import { BiSolidBookAdd } from "react-icons/bi";
import { FaTags } from "react-icons/fa";

function SidebarCreators() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation(); 
  const [user, setUser] = useState<any>(null);
  const [isMore, setMore]=useState(false);
  const [isCreate, setCreate]=useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const CreateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
      setMore(false);
    }
  };

  if (isMore) {
    document.addEventListener("mousedown", handleClickOutside);
  }

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [isMore]);

  useEffect(()=> {
    const handleClickOutside = (event: MouseEvent)=> {
      if (CreateRef.current && !CreateRef.current.contains(event.target as Node)){
        setCreate(false);
      }
    };

    if(isCreate){
      document.addEventListener("mousedown",handleClickOutside);
    }
    
    return()=> {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCreate]);

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) return;

  fetch("http://localhost:5000/api/user/profile", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {setUser(data);})
    .catch((err) => {
      console.error("Error fetching user:", err);
    });
}, []);


  const Logout = () => {
    localStorage.removeItem("token")
  }

  const links = [
    { path:  user ? `/${user.username}`: "#", label: "Dashboard", icon: <TbLayoutDashboardFilled /> },
    { path: "/library", label: "Library", icon: <TbLibrary />},
    { path: "/Audience", label: "Audience", icon: <IoPeople/> },
    { path: "/Insights", label: "Insights", icon: <CgInsights /> },
    { path: "/Payouts", label: "Payouts", icon: <MdPayment /> },
    { path: "/Promotions", label: "Promotions", icon: <GrAnnounce /> },
    { path: "/notification", label: "Notification", icon: <IoNotificationsOutline/> },
    { path: "/Community", label: "Community", icon: <HiOutlineChatAlt2 /> },
    { path: "/Settings", label: "Settings", icon: <IoSettings /> },
    
     
  ];

  const more =[
    { path: "/home", label: "Switch to Viewers Mode", icon: <FiHome /> },
    { path: "/explore", label: "Explore", icon: <FiSearch /> },
    { path: "/notification", label: "Notification", icon: <IoNotificationsOutline/> },
    { path: "/login", label: "Logout", icon: <FiLogOut />,onClick:Logout },
  ]

  return (
    <div
      className={`h-screen bg-[#343434] text-white flex flex-col justify-between rounded-r-2xl transition-all duration-300 ${
        isCollapsed ? "w-[4%]" : "w-[17%]"
      } shadow-lg fixed`}>


      <div className="flex justify-between p-2 w-full ">
        {isCollapsed? <></>:<img src="/assets/mango-fruit-icon.svg"  className="w-[30%] p-2" /> }
        <button
          onClick={() => setIsCollapsed(!isCollapsed)} className="rounded-full hover:bg-[#565656]  "> 

          {isCollapsed ? <img src="https://img.icons8.com/matisse/100/FFFFFF/menu.png" className="w-10 p-1"/> :  
          <img className=" w-10 p-1  " src="https://img.icons8.com/glyph-neue/64/FFFFFF/delete-sign.png"/>}
        </button>
      </div>



      {!isCollapsed ?
      <nav className="flex flex-col gap-2 p-4 h-full w-full">
        {links.map((link) => (
            <Link
            key={link.path}
            to={link.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all  hover:bg-[#666666] duration-200
                ${location.pathname===link.path ? "bg-[#666666] text-[#ffffff]": "bg-none text-[#bcbcbc]"}`}>
            <span className="text-lg">{link.icon}</span>
            <span className="text-sm">{link.label}</span>
          </Link>
        ))}
        <div ref={CreateRef} onClick={()=> setCreate(!isCreate)}  className="w-full bg-[#ffffff] cursor-pointer text-[#000000]  justify-center flex items-center p-2 rounded-xl mt-4 font-semibold ">
          <IoCreate className="mx-2" /> Create <FaChevronDown className="mx-2"/>

       
       <div className={`${isCreate? "opacity-100 translate-0":"opacity-0 translate-y-1 pointer-events-none"} flex absolute text-[#ffffff] w-[88%] justify-center bottom-22 duration-300 flex-col bg-[#606060] rounded-xl`}> 
          <Link to="/post" className="hover:bg-[#818181] flex items-center rounded-xl text-md m-2 p-1"><BiSolidBookAdd className="mr-2" /> Post</Link>
          <Link to="/Product" className="hover:bg-[#818181] flex items-center rounded-xl text-md mt-0 m-2 p-1"><FaTags className="mr-2" />Product</Link> </div>
       
       
        </div>
      </nav>
    : <nav className="flex flex-col gap-2 p-4 h-full w-full">
        {links.map((link) => (
            <Link
            key={link.path}
            to={link.path}
            className={`flex items-center justify-center gap-3 px-1 py-2 rounded-lg transition-all  hover:bg-[#666666] duration-200
                ${location.pathname===link.path ? "bg-[#666666] text-[#ffffff]": "bg-none text-[#bcbcbc]"}`}>
            <span className="text-lg">{link.icon}</span>
          </Link>))}
          </nav> 
        }   




      <div className="duration-200 transition-all">

      {isCollapsed ? (<div className="bottom-0 border-amber-50 border-2 m-2 rounded-full items-center flex">
        <img src={`http://localhost:5000/uploads/${user?.profilePhoto.path}`} className="p-1 rounded-full h-10 w-10"/> </div>) 
        
        :

       ( <div ref={moreRef} className="bottom-0  border-amber-50 border-1 m-2 duration-200 transition-all rounded-xl px-1 justify-between items-center flex">
        <div className="flex items-center rounded-xl hover:bg-[#7b7a7a] px-2 ">
        <img src={`http://localhost:5000/uploads/${user?.profilePhoto.path}`} className="m-1 rounded-full h-10 w-10"/>
        <h1 className=""> {user? user.username:"Loading..."} <p className="text-xs text-[#b4b4b4]">Creator</p></h1>
        </div>
        <FiMoreVertical className=" cursor-pointer hover:bg-[#666666] rounded-full text-3xl p-1" onClick={()=> setMore(!isMore)} />
        
          
  <div className={`${isMore? "opacity-100 translate-0":"opacity-0 translate-y-1 pointer-events-none"} absolute z-50 bg-[#343434] duration-300 bottom-20 -right-20 rounded-lg shadow-lg p-2`}>
    {more.map((moree, index) => (
      <div key={moree.path||index}>
        <Link
          key={moree.path||index}
          to={moree.path}
          onClick={moree.onClick}
          className={`flex items-center  gap-3 px-3 py-2 rounded-lg transition-all hover:bg-[#666666] duration-200`}
        >
          <span className="text-lg">{moree.icon}</span>
          <span className="text-sm">{moree.label}</span>
        </Link>
        {(index == more.length-2 || index==0 )&& (
          <div className="w-full border-t border-gray-500 my-2" />
        )}
      </div>
    ))}
  </div>

        </div>
        )
    }
    </div>
    </div>
  );
}

export default SidebarCreators;
