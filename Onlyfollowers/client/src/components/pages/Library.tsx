import SidebarCreators from "../ui/SidebarCreators"
import { useState,useEffect } from "react"
import { formatDistanceToNow } from 'date-fns';
import { IoMdMore } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";


interface PostType {
  _id: string;
  title: string;
  content: string;
  files: 
  {
    filename: string,
    path: string,
    mimetype: string,
    size: number
  }[];
    createdAt:Date
}



function Library(){

  const [posts, setPosts] = useState<PostType[]>([]);
  const [OpenDelete, setOpenDelete]=useState<string | null>(null);

  useEffect(() => {
  const handleMouseDown = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest(".dropdown") && !target.closest(".dropdown-toggle")) {
      setOpenDelete(null);
    }
  };

  document.addEventListener("mousedown", handleMouseDown);
  return () => {
    document.removeEventListener("mousedown", handleMouseDown);
  };
}, []);




    useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch("https://onlyfollowers.onrender.com/api/post/my-posts",{

        headers: {
        Authorization: `Bearer ${token}`,
      },
      });
      
    const data = await res.json();
    if (!Array.isArray(data)) {
  console.error("Expected array for posts, got:", data);
  return;
}
    setPosts(data);
    };
    fetchPosts();
    }, []);

    const handleDelete = async (postId: string) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`https://onlyfollowers.onrender.com/api/post/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to delete post");
    }

    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    setOpenDelete(null);
  } catch (error) {
    console.error("Error deleting post:", error);
  }
};




    return(
        <div className="bg-black w-full min-h-screen flex ">
            <div className="z-50 h-full relative flex">
                <SidebarCreators/>
            </div>

        <div className="ml-[17%] w-full ">
          {posts.length===0 ? <div className="text-[#a5a5a5] justify-center items-center flex w-full h-full">You haven't posted anything yet...</div>:<></>}

      <div className="text-white flex gap-10 flex-wrap p-10">
  {posts?.map((post) => (
    <div
      key={post._id}
      className="bg-[#272103] w-90 h-70 rounded-md flex flex-col "
    >

 
      <div className="flex-1 overflow-hidden rounded-md flex items-center justify-center">
        <div className="w-full flex flex-wrap gap-5 justify-center items-center">
          {post.files.map((file, idx) => {
            const ext = file.filename.split(".").pop()?.toLowerCase();
            const fileUrl = `https://onlyfollowers.onrender.com/${file.path}`;

            if (["png", "jpg", "jpeg", "webp"].includes(ext!)) {
              return (
                <img
                  key={idx}
                  src={fileUrl}
                  className=" w-full rounded-md "
                  alt={`img-${idx}`}
                  />
                );
              } else if (["mp4", "mov"].includes(ext!)) {
                return (
                <video
                  key={idx}
                  loop
                  muted
                  autoPlay
                  className="w-full rounded-md  object-cover">
                  <source src={fileUrl} type={`video/${ext}`} />
                </video>
              );
            } else if (["mp3", "wav"].includes(ext!)) {
              return (
                <audio
                key={idx}
                controls
                className="w-full"
                src={fileUrl}
                />
              );
            } else {
              return (
                <a
                key={idx}
                href={fileUrl}
                download
                className="text-blue-400 underline text-sm"
                >
                  Download File
                </a>
              );
            }
          })}
        </div>
      </div>
      <div className="w-full h-[35%] bottom-0 relative ">
        
        <IoMdMore  className="absolute right-0 top-1 duration-200 cursor-pointer hover:bg-[#666666] rounded-full dropdown-toggle text-2xl" onClick={(e)=>  {e.stopPropagation();setOpenDelete(OpenDelete === post._id ? null : post._id)}}/> 
          <div onClick={(e) => { e.stopPropagation();if (confirm("Are you sure you want to delete this post?")) {handleDelete(post._id);}}} 
          className={`${OpenDelete === post._id ? "opacity-100 translate-0":"opacity-0 translate-y-1 pointer-events-none"} 
          absolute z-50 gap-1 dropdown bg-[#343434] flex justify-center items-center duration-300 hover:bg-[#585858] cursor-pointer bottom-23 right-0 rounded-lg shadow-lg p-2`}>
            <RiDeleteBin6Line className="text-[#f00]" /> <h1 className="">Delete Post</h1>
  
  </div>
      <h1  
      className="text-xl font-bold p-2 pr-5 text-nowrap text-ellipsis overflow-hidden">
        {post.title}</h1>
      <p 
      className="text-sm pr-5  overflow-hidden text-nowrap text-ellipsis px-2 pb-2">
      {post.content}</p>
      
      <p className="px-2 mb-2 text-sm text-[#949494]">
         {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}

      </p>
          </div>
    </div>
  ))}
</div>


      </div>
        </div>
    )
  }
  export default Library
