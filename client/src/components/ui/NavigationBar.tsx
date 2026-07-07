import { Button } from "./Button"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function NavigationBar() {


     
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [isScrolled, setIsScrolled] = useState(false);

     useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); 
    };

     window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

     const Navcontent= [
      {Heading:"Creators", 
        Subheading:[
          {
          title:"Podcasters",
          content:[
            "Get to know your listeners",
            "Cut through the noise",
            "More ways to get paid",
            "Other podcasters on Onlyfollowers",
          ]
        },

        {
          title:"Video Creators",
          content:[
            "Turn your viewers into your people",
            "Reach every fan, every time",
            "More ways to get paid",
            "Other Video Creators on Onlyfollowers",
          ]
        },

        {
          title:"Musicians",
          content:[
            "From your mind to their ears",
            "Share more than music",
            "More ways to get paid",
            "Other Musicians on Onlyfollowers",
          ]
        },
         {
          title:"Artists",
          content:[
            "Earning made easy",
            "Create what inspires you ",
            "Build community around your art",
            "Other Artists on Onlyfollowers",
          ]
        },
        {
          title:"Game devs",
          content:[
            "A safe way to get paid",
            "Selling made simple",
            "Where real community thrives",
            "Other Game devs on Onlyfollowers",
          ]
        },

        ]


        },

        {Heading:"Features", 
        Subheading:[
          {
          title:"Create on your Terms",
          content:[
            "Getting started on Onlyfollowers",
            "Make it your own",
            "Reach every fan, every time",
            "Showcase your work",
          ]
        },

        {
          title:"Build real community",
          content:[
            "Every post, every time",
            "More ways to stay close",
            "Get to know your fans",
          ]
        },

        {
          title:"Expand your reach",
          content:[
            "Bring in new fans",
            "Unlock growth",
            "App integrations",
          ]
        },
        {
          title:"Get business support",
          content:[
            "Help when you need it",
            "Policies to protect you",
            "Payments powered by Patreon",
          ]
        },
        
        {
         title:"Earning made easy",
         content:[
           "Run a membership",
           "Sell digital products",
         ]
       },
      ]
      
      
        },


        {Heading:"Pricing", 
        Subheading:[
          {
          title:"Create on your Terms",
          content:[
            "Powerful core features",
            "Earning made easy",
            "Paid membership",
            "Payments powered by Onlyfollowers",
          ]
        },
      ]
      
      
        },

        {Heading:"Resources", 
        Subheading:[
          {
          title:"Creator Hub",
          content:[
            "Resources to get started",
            "Grow your membership",
            "Connect with creators",
          ]
        },

        {
          title:"Newsroom",
          content:[
            "Onlyfollowers HQ",
            "Read latest policy updates",
            "Explore product updates",
          ]
        },

        {
          title:"Help Center",
          content:[
            "Getting started",
            "Onlyfollowers payments",
            "Member management",
            "Content & engagement",
          ]
        },
        {
          title:"Partners & integrations",
          content:[
            "Featured integrations",
            "Full app directory",
          ]
        },
        
        {
         title:"Mobile",
         content:[
           "Download the app",
         ]
       },
      ]      
        },        
     ]

    return(


        <nav onMouseLeave={() => setOpenDropdown(null)} className={` ${isScrolled ? "bg-[#ffffff90]" : "bg-transparent"} duration-500 relative items-center h-30 w-full flex font-montserrat`}>
           <div className="pl-10 w-full flex" >
          {Navcontent.map((section) => (
            <div  key={section.Heading} className="  " 
            onMouseEnter={() => setOpenDropdown(section.Heading)}
           >
              <div className={` ${openDropdown || isScrolled ? "text-[#000000]" : "text-[#ffffff]"}  hover:bg-[#223657] hover:text-[#ffffff] z-10 relative transition-all text-sm px-2 py-2 flex rounded-4xl   `}>
                <Button text={section.Heading}/>
                </div>   
                <AnimatePresence mode="sync">
                {openDropdown === section.Heading && (
              <motion.div 
              key={"navbar"}
              initial={{opacity:1,y:-30}}
                  animate={{opacity:1,y:0}}
                  transition={{duration:0.1,}}
                  exit={{opacity:0}}
              
              className="absolute left-0 mt-2 w-screen space-y-3 bg-[#ffffff] -top-5 pt-30 p-5 grid grid-cols-5 ">
                {section.Subheading.map((item) => (
                  <motion.div key={item.title}
                  initial={{opacity:0,y:-30}}
                  animate={{opacity:1,y:0}}
                  transition={{duration:0.5,ease: "easeOut"}}
                  className="space-y-4 ml-5  ">
                    <div className="text-md text-black mb-10 mt-3 font-semibold group inline-block cursor-pointer">{item.title} <span className="inline-block ml-1 duration-100 transition-all group-hover:translate-x-2">→</span></div>
                      {item.content.map((point, idx) => (
                        <div key={idx} className="text-xs text-[#555] duration-100 cursor-pointer hover:text-[#000]">{point}</div>
                      ))}                   
                  </motion.div>
                ))}
              </motion.div>
            )}
 </AnimatePresence>
                            
    
  </div>
))}




</div>



<a
  href="#"
  className={`absolute ml-115 inline-block text-sm px-1 py-2 font-medium  border-2  ${ openDropdown || isScrolled  ? "text-[#000000] border-black" : "text-[#ffffff] border-white "} 
  rounded-4xl overflow-hidden group transition-all duration-100 ease-in shadow-inner hover:text-black`}>
  <span
    className="absolute w-full h-0 bottom-0 left-0 bg-white transition-all duration-300 ease-in-out group-hover:h-full z-0"
  ></span>

  <span className={`relative overflow py-5  z-10 `}><Button text="Updates"/></span>
</a>

<div className="flex w-full absolute justify-end">

<Link
  to="/Login"
  onMouseEnter={() => setOpenDropdown(null)}
  className={`relative mr-4 flex  text-sm px-1 py-3 font-medium  border-2  ${openDropdown || isScrolled? "text-[#000000] border-black  hover:text-white" : "text-[#ffffff] border-white  hover:text-black"} 
  rounded-4xl overflow-hidden group transition-all duration-100 ease-in shadow-inner`}>
  <span
    className={`absolute w-full h-0 bottom-0 left-0 ${isScrolled ? "bg-black": "bg-white"}  transition-all duration-300 ease-in-out group-hover:h-full z-0`}
    ></span>

  <span className={`relative overflow  z-10 `}><Button text="Log in"/></span>
</Link>

<Link
onMouseEnter={() => setOpenDropdown(null)}
  to="/Signup"
  className={`relative mr-10 ${openDropdown || isScrolled? "text-[#ffffff] bg-[#000000]" : "text-[#000000] bg-[#ffffff] "}   text-sm px-1 py-3 font-medium rounded-4xl overflow-hidden group transition-all duration-100 ease-in shadow-inner`}>

  <span className={`relative overflow  z-10 `}><Button text="Get Started"/></span>
</Link>


    </div>

    <div 
    onMouseEnter={() => setOpenDropdown(null)}
    className={`flex absolute justify-center mx-auto inset-x-0  w-[20%] z-50 font-edu text-4xl duration-300 ${openDropdown || isScrolled? "text-[#000000]" : "text-[#ffffff]"}`}>
        
        onlyfollowers <img className={`${openDropdown  ? "saturate-0" : "saturate-100"}`}  src="https://img.icons8.com/color-glass/48/mango.png"/>
        </div>    
    </nav>
        
    )
}

export default NavigationBar