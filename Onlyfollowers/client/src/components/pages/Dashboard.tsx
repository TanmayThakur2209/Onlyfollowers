import SidebarCreators from "../ui/SidebarCreators"
import { FaEye } from "react-icons/fa";
import { useEffect,useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { MdPhotoSizeSelectActual } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";


function Dashboard(){

  
    const [user, setUser] = useState<any>(null);
    const [value, setValue] = useState("");
    

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
      .then((data) => {setUser(data);console.log(data)})
      .catch((err) => {
        console.error("Error  fetching user:", err);
      });
  }, []);

  


  const handleSubmit = async  (file: File, type: "cover" | "profile") => {
    const formData = new FormData();
    formData.append(type === "cover" ? "coverPhoto" : "profilePhoto", file);

    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5000/api/user/upload-photos", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    const data = await res.json();
    console.log("Updated user:", data);
    setUser(data);
  };
  
  const getCoverPhotoType = (path: string) => {
  const ext = path.split(".").pop()?.toLowerCase();
  if (!ext) return "unknown";
  if (["mp4", "mov", "webm"].includes(ext)) return "video";
  if (["jpg", "jpeg", "png", "webp"].includes(ext)) return "image";
  return "unknown";
};

  const handleDelete = async (type: "cover" | "profile") => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:5000/api/user/delete-photo?type=${type}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to delete photo");
    }

    const data = await res.json();
    setUser(data.user); 
  } catch (error) {
    console.error("Error deleting photo:", error);
  }
};



    return(
<div className="bg-black w-full min-h-screen flex ">
        <div className="z-50 h-full relative flex">
      <SidebarCreators/>
      </div>
      <div className="ml-[17%] w-[83%] min-h-screen">
        <div className="w-full h-20 p-5 bg-[#363636] border-[#858585] items-center justify-end top-0 left-0 fixed flex ">
          <button className="text-[#ffffff] chiron-hei-hk text-md px-5 gap-2 py-2 rounded-xl bg-[#525252] hover:bg-[#5e5e5e] duration-200 flex justify-center items-center  "><FaEye />Preview Page</button>
        </div>
        
        <div  className={`h-[50vh] flex items-center justify-center relative group`}> 
  {user?.coverPhoto?.path ? (
    getCoverPhotoType(user.coverPhoto.path) === "video" ? (
      <video
        src={`http://localhost:5000/uploads/${user.coverPhoto.path}`}
        autoPlay
        muted
        loop
        onContextMenu={(e) => e.preventDefault()}
        className="absolute w-full h-full object-cover"
      />
    ) : (
      <img
        src={`http://localhost:5000/uploads/${user.coverPhoto.path}`}
        className="absolute inset-0 w-full h-full object-cover"
        alt="Cover"
      />
    )
  ) : (
    <div className="w-full h-full bg-gradient-to-b from-[#d8ac54] to-[#9a6906]"></div>
  )}


          <div className="absolute flex justify-center items-center duration-200 py-30 px-50 group-hover:opacity-100 opacity-0">
            <label className="bg-[#343434] hover:bg-[#292929] hover:opacity-100 z-10  opacity-80 cursor-pointer duration-200 text-[#ffffff] mt-10 flex items-center justify-center gap-2 px-3 py-2 rounded-3xl">
              <MdPhotoSizeSelectActual />{ user?.coverPhoto?.path ? "Edit Cover":"Set Cover "}
              <input name="coverPhoto" type="file" className="hidden" accept="image/*,video/*" onChange={(e) => {const file = e.target.files?.[0];if (file) handleSubmit(file, "cover");}} />
              </label>
              { user?.coverPhoto?.path ? 
              <div onClick={(e) => { e.stopPropagation();if (confirm("Are you sure you want to delete this cover?")) {handleDelete("cover");}}} 
                        className="absolute gap-1 dropdown bg-[#343434] ml-30 mt-20  hover:opacity-100 opacity-80 duration-300 hover:bg-[#292929] cursor-pointer  rounded-lg shadow-lg p-2">
                          <RiDeleteBin6Line className="text-[#f00]"/>
                
                </div>:<></>}
              </div>
              </div>

        <div style={user?.profilePhoto?.path? {
          backgroundImage: `url("http://localhost:5000/uploads/${user.profilePhoto.path}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }
      : undefined} 
      className="bg-gradient-to-b from-[#c34303] to-[#df5b19]  relative z-100 mx-auto -mt-15 h-30 w-30 rounded-xl flex items-center justify-center text-[#ffffff] text-5xl poppins-regular ">
           {user?.profilePhoto?.path? "":user?.username[0]}  
           <label className="absolute opacity-0 hover:opacity-100 duration-200 z-10 flex justify-center items-center  h-30 w-30  rounded-xl">
           <MdPhotoSizeSelectActual className="absolute mt-27 ml-27 rounded-full text-4xl bg-[#343434] hover:bg-[#484848] duration-200 p-2"/>
           <input name='profilePhoto' type="file" className=" hidden" accept="image/*" onChange={(e) => {const file = e.target.files?.[0];if (file) handleSubmit(file, "profile");}}/>
           { user?.profilePhoto?.path ? 
              <div onClick={(e) => { e.stopPropagation();if (confirm("Are you sure you want to delete this profile photo?")) {handleDelete("profile");}}} 
              className="absolute gap-1 dropdown bg-[#343434] ml-40 mt-40  hover:opacity-100 opacity-50 duration-300 hover:bg-[#292929] cursor-pointer  rounded-lg  p-2">
                          <RiDeleteBin6Line className="text-[#f00] text-lg"/>
                
                </div>:<></>}
                          </label>
                

           </div>
         <div className=" mx-auto rounded-2xl flex items-center justify-center mt-2 text-[#ffffff] text-xl poppins-regular"> 
          {user? user.username:"Loading..."}   
           
          </div>
           <div  className=" mx-auto rounded-2xl flex items-center justify-center mt-2 text-[#ffffff] text-xl poppins-regular">
            <ReactQuill className="w-200 min-h-50 border-0 bg-[#221800] custom-quill " theme="snow" value={value} onChange={setValue} />
            </div>


      </div>
      
      
      
      
      
      
      
      
      
      </div>
    )
}
export default Dashboard