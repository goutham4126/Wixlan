"use client"

import { useState } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { MdEmojiTransportation, MdOutlineSell } from "react-icons/md";
import { BsCart3 } from "react-icons/bs";
import { IoHomeOutline } from "react-icons/io5";
import { FaRegUser, FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import {signOut,useSession} from "next-auth/react";

function Menubar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleDropdown = () => {
      setIsDropdownOpen((prev) => !prev);
    };
  
    const links = [
      {
        path: "/",
        title: "Home",
        logo: IoHomeOutline,
      },
      {
        path: "/tran_details",
        title: "Transport",
        logo: MdEmojiTransportation,
      },
      {
        path: "/buy",
        title: "Buy",
        logo: BsCart3,
      },
      {
        path: "/sell",
        title: "Sell",
        logo: MdOutlineSell,
      },
      {
        path: "/map",
        title: "Map",
        logo: FaMapMarkerAlt,
      },
      {
        path: "/profile",
        title: "Profile",
        logo: FaRegUser,
      },
    ];
  
    const [active,setActive]=useState("/");
    const activelink=(link)=>{
      setActive(link);
      toggleDropdown();
    }
    const { data: session } = useSession();
  
  return (
    <div>
        <div className="flex">
              <div>
                <Image src={session?.user.image} alt="#" className="rounded-full mr-2" width={30} height={30}/>
              </div>
              <div onClick={toggleDropdown}>
                {isDropdownOpen ? (<RxCross2 className="size-7" />) : (<HiOutlineMenu className="size-7" />)}
              </div>
            </div>

            {isDropdownOpen && (
              <div className="flex flex-col w-[180px] p-2 gap-2 font-bold absolute top-14 right-1 rounded-md bg-slate-300 text-blue-950 shadow-xl">
                {links.map((item, index) => (
                  <Link key={index} href={item.path} className={`${active === item.path ? "bg-white text-blue-950":""} p-2`}>
                    <div className="flex items-center" onClick={()=>activelink(item.path)}><item.logo className="size-7 inline mr-2" /><p className="mt-1">{item.title}</p></div>
                  </Link>
                ))}
                <Link href="#" onClick={signOut} className="bg-white w-full p-2 rounded-lg">
                  <div className="flex items-center">
                    <p className="m-auto">Logout</p>
                  </div>
                </Link>
              </div>
            )}
    </div>
  )
}

export default Menubar