import React, { useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
function SignupPage(){

    const [username, SetUsername]=useState("");
    const [password, SetPassword]=useState("");
    const [redirect, SetRedirect]=useState(false)

    const handleSubmit = async (e: React.FormEvent)=>{

        e.preventDefault();
        try
        {
             const response = await axios.post("https://onlyfollowers.onrender.com/api/auth/register", {
        username, password,});
            SetRedirect(true)

      alert("Login successful! Token: " + response.data.token);
      localStorage.setItem("token", response.data.token);
    } catch (err) {
      alert("User Already Exist");
    }
    console.log("Sending login request with:", { username, password });
        };
    const token = localStorage.getItem("token");
    if (token||redirect){
        return <Navigate to="/home"/>
    }

    

return(

    <div className=" bg-black relative justify-center items-center flex flex-col min-h-screen">

        <div className="w-[25%] h-[70%]">
            <form onSubmit= {handleSubmit} className="bg-[#1d1d1d] flex flex-col justify-center text-white p-5  w-full my-10 rounded-2xl">
                <img className={` mx-auto`}  src="https://img.icons8.com/color-glass/48/mango.png"/>
            <h1 className="text-xl font-roboto text-center">Start creating on <br/></h1> <h1 className="text-4xl text-center font-bold font-roboto"> Onlyfollowers </h1><br/>
            <input type="text"  required value={username} placeholder="Username" onChange={(e) => SetUsername(e.target.value)} className="border-0 font-montserrat text-sm  rounded-xl pl-2 py-2 w-full bg-[#363636] hover:bg-[#676565]"/>
            <input type="password" required value={password} placeholder="Password" onChange={(e) => SetPassword(e.target.value)} className="border-0 w-full font-montserrat text-sm  rounded-xl pl-2 py-2 my-4  bg-[#363636] hover:bg-[#676565]"/>
            <button type="submit" className="border-0 w-full cursor-pointer rounded-xl pl-2 py-2 my-4 bg-[#777575] hover:bg-[#b1aeae]">Continue</button> 
            <h1 className="text-sm text-[#919191] duration-200 cursor-pointer text-center ">Already have an account? <Link className="underline hover:text-[#b3b0b0]" to="/Login">Log in</Link></h1><br/>
           </form>
            </div>
            <div className="text-[#a6a1a1] w-[30%] bottom-10 absolute  text-xs text-center"><span>By signing up, you are creating a Onlyfollowers account and agree to Onlyfollowers's 
                <span className="hover:text-[#e6e2e2]"> Terms</span> and <span className="hover:text-[#e6e2e2]"> Privacy Policy</span></span></div>
    

    </div>
)

}

export default SignupPage
