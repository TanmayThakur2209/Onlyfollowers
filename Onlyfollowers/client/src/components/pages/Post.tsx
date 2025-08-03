import SidebarCreators from "../ui/SidebarCreators";
import { useState } from "react";
import { FaVideo } from "react-icons/fa";
import { FaImage } from "react-icons/fa6";
import { AiFillAudio } from "react-icons/ai";
import { IoIosDocument } from "react-icons/io";
import { FiLink } from "react-icons/fi";
import { LuUpload } from "react-icons/lu";
import { IoIosClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";



function Post(){

    const [isUpload,SetUpload]=useState(false)
    const Formats=[
        {label: "Video", icon:<FaVideo />},
        {label: "Image", icon: <FaImage />},
        {label: "Audio", icon:<AiFillAudio />},
        {label: "Documents", icon:<IoIosDocument />},
        {label: "Links", icon:<FiLink />},

    ]
    const [Filename, setFilename] =useState<string>("");
    const [file, setFiles] = useState<File[]> ([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isDragging, setIsDragging] = useState(false);


    const FileInput= (e: React.ChangeEvent<HTMLInputElement>)=> {
        const files = e.target.files;
        if (files){
            setFilename((Array.from(files)).map((file)=>file.name).join(","));
            setFiles(Array.from(files)) 
        }
    }
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault();
  e.stopPropagation();
  setIsDragging(true);
};

const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault();
  e.stopPropagation();
  setIsDragging(false);
};

const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault();
  e.stopPropagation();
  setIsDragging(false);

  const files = Array.from(e.dataTransfer.files);
  if (files.length > 0) {
    setFilename(files.map((file) => file.name).join(", "));
    setFiles(files);
  }
};


const handleSubmit = async () => {
  if (!title || !content || file.length === 0) {
    alert("Please fill all fields and select a file.");
    return;
  }

  try {
    const uploadedUrls = await Promise.all(
      file.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "onlyfollowers");

        const res = await fetch("https://api.cloudinary.com/v1_1/dmvfseki9/auto/upload", {
          method: "POST",
          body: formData
        });

        const data = await res.json();
       return {
          filename: file.name,
          path: data.secure_url,
          mimetype: file.type,
          size: file.size
        };
      })
    );

    const token = localStorage.getItem("token");
    const res = await fetch("https://onlyfollowers.onrender.com/api/post/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        title,
        content,
        files: uploadedUrls
      })
    });

    const result = await res.json();
    console.log("Uploaded post:", result);
    alert("Uploaded successfully!");
  } catch (err) {
    console.error("Upload failed:", err);
    alert("Upload failed");
  }
};

    


    return(
        <div className="bg-black w-screen min-h-screen flex ">
        <div className="z-50 h-full relative flex">
      <SidebarCreators/>
      </div>
        <div className="flex flex-col ml-[17%] w-[83%] h-screen">
      
            <div className="flex-col items-center mx-auto  mt-10 w-[60%] duration-200  text-[#ffffff] flex">
            
            <AnimatePresence mode="wait">

            {isUpload ? <motion.div 
            key="Upload"
            initial={{opacity:0,height: "0"}}
            animate={{opacity:1,height: "15rem"}}
            transition={{duration:0.3}}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            
            className={`w-full h-50 outline-dashed justify-center  relative items-center flex flex-col outline-[#b7b7b7] rounded-2xl ${isDragging ? "bg-[#2d2d2d]" : ""} `}>
                <IoIosClose onClick={()=> SetUpload(!isUpload)} className="absolute hover:bg-[#4f4f4f] duration-200 rounded-full text-4xl top-2 right-2" />
                <label className="cursor-pointer"><LuUpload  className="text-4xl text-[#b7b7b7] font-bold"/><input multiple className=" hidden" onChange={FileInput} type="file"/></label>
                Drop an image, video or audio file as the main content of your post. {Filename ? <p className="mt-2 text-sm text-[#dfbe5a]"> {Filename}</p>:<></>}
                </motion.div>
            
            
            : 
            <motion.div 
            key="Formats"
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{duration:0.2}}
            
            
            className="flex w-full duration-200  ">{Formats.map((Format,Index)=>
                
                <div key={Index} onClick={()=> SetUpload(!isUpload)} className="flex justify-center items-center gap-2 px-4 py-2 hover:bg-[#292929] rounded-3xl border-1 border-[#6c6c6c] m-1">
                {Format.icon}{Format.label}
            </div>
            
        )}
            </motion.div>
            
        }
</AnimatePresence>

            <textarea onChange={(e)=> setTitle(e.target.value)} placeholder="Title" className=" p-5 w-full mt-5 placeholder:text-[#cccccc] hover:bg-[#343434] focus:outline-none rounded-2xl text-6xl"
            rows={1} onInput={(e)=>{
                e.currentTarget.style.height="auto";
                e.currentTarget.style.height= e.currentTarget.scrollHeight + "px";
            }}
            />
            <textarea onChange={(e)=> setContent(e.target.value)} placeholder="Start writing..." className=" p-5 mt-5 w-full placeholder:text-[#cccccc] hover:bg-[#343434] focus:outline-none rounded-2xl text-xl"
                rows={6} onInput={(e)=>{
                    e.currentTarget.style.height="auto";
                    e.currentTarget.style.height= e.currentTarget.scrollHeight + "px";
                }}
                />


            </div>


            <div className="w-full p-5 bg-[#363636] border-[#858585] items-center justify-end border-t-1 bottom-0 left-0 fixed flex  ">
                <button onClick={handleSubmit} className="text-[#000000] poppins-semibold  text-md px-5 py-1 rounded-md bg-[#ffffff] hover:bg-[#bebebe]  ">Post</button>
</div>
    
      
        </div>
      
      
      </div>
    )
}

export default Post;
