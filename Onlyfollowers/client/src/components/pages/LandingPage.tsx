import gsap from "gsap";
import { useEffect,useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NavigationBar from "../ui/NavigationBar";
gsap.registerPlugin(ScrollTrigger)
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";


function LandingPage(){

    const img1=useRef<HTMLImageElement>(null);
    const img2=useRef<HTMLImageElement>(null);
    const card=useRef<HTMLImageElement>(null);
    const text1=useRef<HTMLImageElement>(null);
    const text2=useRef<HTMLImageElement>(null);
    const section2=useRef<HTMLDivElement>(null);
    const phone=useRef<HTMLDivElement>(null);

    
    const videos =["assets/LandingPage/1409899-hd_1920_1080_25fps.mp4",
                  "assets/LandingPage/4763824-hd_1920_1080_24fps.mp4",
                  "assets/LandingPage/1731993-hd_1920_1080_24fps.mp4"]


  const [index, setIndex] = useState(0);

  const nextSlide = () => setIndex((prev) => (prev + 1) % videos.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + videos.length) % videos.length)


    
    useEffect(() =>{
     const ctx = gsap.context(() => {
    gsap.fromTo(
        img1.current,
        {opacity:1,
            y:0,},
        { opacity:1,
            y:400,
            duration:1,
            x:100, 
            scrollTrigger : {
            trigger: img1.current,
            start: "top center",  
            scrub:1,         
        },
        }
    );
gsap.fromTo(
        img2.current,
        { opacity: 1, y: 0, z:10 },
        {
          opacity: 1,
          y: 400,
          z:0,
          duration: 1,
          delay: 1,
          x:800,
          scrollTrigger: {
            trigger: img2.current,
             start: "top 60%",
            scrub:1
          },
        }
      );


      gsap.fromTo(
        card.current,{
          y:50
        },{
          y:0,
          duration:0.4,
          scrollTrigger:{
            trigger: card.current,
            start:"top 80%",
            end: "top 30%",
            scrub:1,


          }
        }
      );
      gsap.fromTo(
        text1.current,{
          y:50
        },{
          y:0,
          duration:5,
          delay:100,
          scrollTrigger:{
            trigger: text1.current,
            start:"top 80%",
            end: "top 30%",
            scrub:1,


          }
        }
      );
      gsap.fromTo(
        text2.current,{
          y:-50
        },{
          y:0,
          duration:5,
          scrollTrigger:{
            trigger: text2.current,
            start:"top 80%",
            end: "top 30%",

            scrub:1,


          }
        }
      );
      gsap.fromTo(
        phone.current,{
          y:50
        },{
          y:0,
          duration:5,
          delay:100,
          scrollTrigger:{
            trigger: phone.current,
            start:"top 80%",
            end: "top 10%",

            scrub:1,


          }
        }
      );
    });

      return () => ctx.revert();
  }, []);


    return(
       <div className="w-full scroll-smooh">
        <div className="z-50 fixed w-full">
      <NavigationBar/>
      </div>

        <section className="w-full relative h-screen overflow-hidden">
       <AnimatePresence mode="wait">
  <motion.video
    key={videos[index]} 
    src={videos[index]}
    loop
    muted
    autoPlay
    preload="auto"
    className="absolute inset-0 w-full h-full object-cover"
    initial={{ scale: 1.2,opacity: 0.9 }}
    animate={{ scale: 1, opacity: 1}}
    transition={{ duration: 1, ease: "easeOut" }}
  />
</AnimatePresence>


    <div onClick={prevSlide} className="absolute top-0 left-0 w-1/2 h-full z-10 " style={{cursor: `url("https://img.icons8.com/windows/32/FFFFFF/back.png"),auto`}}/>
      <div onClick={nextSlide} className="absolute top-0 right-0 w-1/2 h-full z-10 " style={{cursor: `url("https://img.icons8.com/windows/32/FFFFFF/forward.png"),auto`}}/>
      
      <AnimatePresence mode="wait">
  <motion.div
    key={index}
    initial={{ opacity: 1, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 50 }}
    transition={{ duration: 0.5, }}
    className="absolute w-full h-full text-[10rem] p-5 flex items-center justify-between  text-white poppins-light "
  >
    {index==0?(<p className="absolute w-full h-full text-[10rem] flex items-center justify-between  text-white poppins-light">
      Creator is now a career
    </p>): index==1?(<p className="absolute w-full h-full text-[10rem] flex items-center justify-between  text-white poppins-light">
      Your wildest <br/> creative reality
    </p>):index==2?(<p className="absolute w-full h-full text-[8rem] flex items-center justify-between  text-white poppins-light">
      Turning passions into  <br/> businesses
    </p>):<></>}
  </motion.div>
</AnimatePresence>



    </section>
      
      
      
    <section ref={section2} className=" bg-[#2e9ad9]  w-full h-[250vh] relative">

            <img ref={img1} className="w-[20%] m-30 absolute" src="assets/pexels-todd-trapani-488382-1535162.jpg"/>
            <img ref={img2} className="w-[20%] m-30 absolute" src="assets/pexels-eberhardgross-1743366.jpg"/>
            <div className="absolute w-full h-screen text-[7rem] flex items-center justify-center   text-black poppins-regular  ">
             <p ref={text1} className="text-center leading-30">Complete<br/>creative<br/>control</p> </div>

            <div className="absolute text-[7rem] flex bottom-100 justify-between ml-[10%] text-black poppins-regular  ">
             <p ref={text2} className="text- leading-30"> Creators. Fans.<br/> Nothing in <br/>between.</p>
              </div>
             <div ref={phone} className="absolute w-[20%] h-[30%] bg-[#daeeea] rounded-3xl flex bottom-60  right-[10%] text-black poppins-regular">
              <video
              
              autoPlay
              loop
              key={1} 
              muted
              preload="auto"
              src="https://c14.patreon.com/1_Chelsea_1161fe215b.mp4" className="w-full h-full z-20"></video>
             </div>
              

    </section>





    <section className=" bg-[#c7790c] w-full h-[150vh] relative">

            <img ref={img1} className="w-[15%] m-30 absolute" src="assets/pexels-todd-trapani-488382-1535162.jpg"/>
            <img ref={img2} className="w-[15%] m-40 absolute" src="assets/pexels-eberhardgross-1743366.jpg"/>

    </section>

    <section className="bg-[url('assets/pexels-steve-1269968.jpg')] bg-cover w-full h-screen flex justify-center items-center " >

    <div ref={card} className="bg-[#ffffff] w-[20%] h-[55%] rounded-2xl flex flex-col justify-cente items-center">
      <Link to="/"> <img className={` w-30 mt-5`}  src="https://img.icons8.com/color-glass/48/mango.png"/></Link>
      <p className="text-2xl font-bold mt-">Your world to create</p>
      <Link
        to="/Signup"
        className={`relative text-[#ffffff] bg-[#000000]   text-sm px-7 py-3 mt-7 font-medium rounded-4xl overflow-hidden group transition-all duration-100 ease-in shadow-inner`}>
      
        <span className={`relative overflow  z-10 `}><Button text="Get Started"/></span>
      </Link>
      <p className="text-[#696969] text-sm mt-4">Already have an account? <Link className="underline" to="/Login">Log in</Link></p>



    </div>


    </section>










        </div>
    )
}

export default LandingPage