import { useState,useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiHome,
  FiLogOut,
  FiSearch,
  FiMoreVertical,

} from "react-icons/fi"; 
import {
  IoNotificationsOutline, IoSettings
} from  "react-icons/io5";

import { HiOutlineChatAlt2 } from "react-icons/hi";


function Sidebar({}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation(); 
  const [user, setUser] = useState<any>(null);
  const [isMore, setMore]=useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

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


  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) return;

  fetch("https://onlyfollowers.onrender.com/api/user/profile", {
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
    { path: "/home", label: "Home", icon: <FiHome /> },
    { path: "/explore", label: "Explore", icon: <FiSearch /> },
    { path: "/notification", label: "Notification", icon: <IoNotificationsOutline/> },
    { path: "/Community", label: "Community", icon: <HiOutlineChatAlt2 /> },
    { path: "/Settings", label: "Settings", icon: <IoSettings /> },
  ];

  const more =[
    { path: user ? `/${user.username}`: "#", label: "Switch to Creators Mode", icon: <FiHome /> },
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
      <nav className="flex flex-col gap-2 p-4 h-full">
        {links.map((link) => (
            <Link
            key={link.path}
            to={link.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all hover:bg-[#666666] duration-200
                ${location.pathname===link.path ?"bg-[#666666] text-[#ffffff]": "bg-none text-[#bcbcbc]"   }
            
                
                `}
                >
            <span className="text-lg">{link.icon}</span>
            <span className="text-sm">{link.label}</span>
          </Link>
        ))}
      </nav>
    :<nav className="flex flex-col gap-2 p-4 h-full w-full">
        {links.map((link) => (
            <Link
            key={link.path}
            to={link.path}
            className={`flex items-center justify-center gap-3 px-1 py-2 rounded-lg transition-all  hover:bg-[#666666] duration-200
                ${location.pathname===link.path ? "bg-[#666666] text-[#ffffff]": "bg-none text-[#bcbcbc]"}`}>
            <span className="text-lg">{link.icon}</span>
          </Link>))}
          </nav> }      
      <div className="duration-200 transition-all">

      {isCollapsed ? (<div className="bottom-0 border-amber-50 border-2 m-2 rounded-full items-center flex">
        <img src={`https://onlyfollowers.onrender.com/uploads/${user?.profilePhoto.path}`} className="p-1 rounded-full h-10 w-10"/> </div>):

       ( <div ref={moreRef} className="bottom-0  border-amber-50 border-2 m-2 duration-200 transition-all rounded-xl px-1 justify-between items-center flex">
        <div className="flex items-center">
        <img src={user?.profilePhoto?.path ? `https://onlyfollowers.onrender.com/uploads/${user?.profilePhoto.path}`:``} className="m-1 rounded-full h-10 w-10"/>
        <h1 className=""> {user? user.username:"Loading... "}<h1 className="text-xs text-[#b4b4b4]">Member</h1> </h1>
        </div>
        <FiMoreVertical className=" cursor-pointer hover:bg-[#666666] rounded-full text-3xl p-1" onClick={()=> setMore(!isMore)} />
        
          {isMore ? (
  <div  className="absolute z-50 bg-[#343434] bottom-20 -right-20 rounded-lg shadow-lg p-2">
    {more.map((moree, index) => (
      <>
        <Link
          key={moree.path}
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
      </>
    ))}
  </div>
) : null}

        </div>
        )
    }
    </div>
    </div>
  );
}

export default Sidebar;
