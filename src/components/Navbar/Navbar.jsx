"use client"
import { useState,useEffect } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { MdEmojiTransportation } from "react-icons/md";
import { MdOutlineSell } from "react-icons/md";
import { BsCart3 } from "react-icons/bs";
import { IoHomeOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { AiOutlineProfile } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import {signIn,signOut,useSession,getProviders} from "next-auth/react"
import { IoSettingsOutline } from "react-icons/io5";

import { AiOutlineFontSize } from "react-icons/ai";

function Navbar({setLayoutFontSize}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(prev=>!prev);
  };

  const [profileOpen,setProfileOpen]=useState(false);
  const profile=()=>{
      setProfileOpen(prev=>!prev);
  }

  const SetSize=(size)=>{
     setLayoutFontSize(size);
  }
  const [open,setOpen]=useState(false);
  const handleOpen=()=>{
    setOpen(prev=>!prev);
 }
  
 
  //Used for setting the providers for session handling.
  const [providers,setProviders]=useState(null);
  useEffect(()=>{
    const setUpProviders=async()=>{
      const res=await getProviders();
      setProviders(res);
    }
    setUpProviders();
  },[])

  const {data:session}=useSession();
  return (

    <div className="flex justify-between items-center bg-blue-950 text-white p-2 md:p-3">
      {/* This is for logo */}
      <div>
        <Link href="/">
          <b>WIXLAN</b>
        </Link>
      </div>

      {/* This if for Large screen view */}
        {/* {
          session?.user?
          <div className="space-x-10 font-semibold mr-2 hidden lg:flex p-1 items-center">
            <Link href="/" className="hover:text-neutral-300">
              Home
            </Link>
            <Link href="/tran_details" className="hover:text-neutral-300">
              Transport
            </Link>
            <Link href="/buy" className="hover:text-neutral-300">
              Buy
            </Link>
            <Link href="/sell" className="hover:text-neutral-300">
              Sell
            </Link>
            <Link href="/map">
              <FaMapMarkerAlt className="size-6"/>
            </Link>
            <div className="relative">
              <Link href="#" className="hover:text-neutral-300" onClick={profile}>
                <Image src={session?.user.image} alt="#" className="rounded-full" width={30} height={30} />
              </Link>
              {profileOpen && (
                <div className="absolute flex flex-col rounded-md top-11 text-blue-950 shadow-xl right-0 p-2 gap-2  bg-slate-300 w-[150px]">
                  <Link href="/profile" onClick={profile} className="hover:bg-white p-2 hover:rounded-lg hover:text-blue-950">
                    <div className="flex items-center"><AiOutlineProfile className="size-7 inline mr-3"/><p>Profile</p></div>
                  </Link>
                  <Link href="#" onClick={signOut} className="bg-white w-full p-2 rounded-lg">
                    <div className="flex items-center"><p className="m-auto">Logout</p></div>
                  </Link> 
                </div>
              )}
            </div>
          </div>
          :
          <div className="hidden lg:flex">
            {
              providers &&
              Object.values(providers).map((provider)=>(
                <button type="button" key={provider.name}
                    onClick={()=>signIn(provider.id)}
                    className="hover:bg-slate-300 hover:rounded-lg hover:text-blue-950 p-2 font-semibold">
                    Signin
                </button>
              ))
            } 
          </div>
        } */}

      
      {/* This is for mobile view */}
      <div className="flex gap-5">
        <div>
        <button onClick={handleOpen}><AiOutlineFontSize className="size-7"/></button>
        {
          open?
          <div className="relative">
            <div className="absolute font-semibold top-0 right-0 bg-neutral-400 text-blue-950 cursor-pointer" style={{borderRadius:5}}>
              <p className="p-2" onClick={()=>SetSize(10)}>10px</p>
              <p className="p-2 bg-neutral-200" onClick={()=>SetSize(16)}>16px</p>
              <p className="p-2" onClick={()=>SetSize(20)}>20px</p>
              <p className="p-2" onClick={()=>SetSize(24)}>24px</p>
              <p className="p-2" onClick={()=>SetSize(28)}>28px</p>
            </div>
          </div>
            :
            <div></div>

        }
        </div>
        {
          session?.user?<>
        <div onClick={toggleDropdown}>
              {isDropdownOpen ? (
                <RxCross2 className="size-7" />
              ) : (
                <HiOutlineMenu className="size-7" />
              )}
        </div>
        {isDropdownOpen && (
          <div className="flex flex-col w-[180px] p-2 gap-2 font-bold absolute top-14 right-1 rounded-md bg-slate-300 text-blue-950 shadow-xl">
            <Link href="/" onClick={toggleDropdown} className="hover:bg-white p-2 hover:rounded-lg hover:text-blue-950">
              <div className="flex items-center"><IoHomeOutline className="size-7 inline mr-2"/><p className="mt-1">Home</p></div>
            </Link> 
            <Link href="/tran_details" onClick={toggleDropdown} className="hover:bg-white p-2 hover:rounded-lg hover:text-blue-950">
              <div className="flex items-center"><MdEmojiTransportation className="size-7 inline mr-2"/><p className="mt-1">Transport</p></div>       
            </Link>
            <Link href="/buy" onClick={toggleDropdown} className="hover:bg-white p-2 hover:rounded-lg hover:text-blue-950">
              <div className="flex items-center"><BsCart3 className="size-7 inline mr-2"/><p className="mt-1">Buy</p></div>
            </Link>
            <Link href="/sell" onClick={toggleDropdown} className="hover:bg-white p-2 hover:rounded-lg hover:text-blue-950">
              <div className="flex items-center"><MdOutlineSell className="size-7 inline mr-2"/><p className="mt-1">Sell</p></div>
            </Link>
            <Link href="/map" onClick={toggleDropdown} className="hover:bg-white p-2 hover:rounded-lg hover:text-blue-950">
              <div className="flex items-center"><FaMapMarkerAlt className="size-7 inline mr-2"/><p className="mt-1">Map</p></div>
            </Link>
            <Link href="/profile" onClick={toggleDropdown} className="hover:bg-white p-2 hover:rounded-lg hover:text-blue-950">
              <div className="flex items-center"><FaRegUser className="size-7 inline mr-2"/><p className="mt-1">Profile</p></div>
            </Link>
            <Link href="#" onClick={signOut} className="bg-white w-full p-2 rounded-lg">
              <div className="flex items-center"><p className="m-auto">Logout</p></div>
            </Link> 
          </div>
        )}
          </>:
          <>
            {
              providers &&
              Object.values(providers).map((provider)=>(
                <button
                    type="button"
                    key={provider.name}
                    onClick={()=>signIn(provider.id)}
                    className="hover:bg-slate-300 hover:rounded-lg hover:text-blue-950 p-1 font-semibold"
                  >
                    Signin
                </button>
              ))
            } 

          </>
        }
      </div>
    </div>
  );
}

export default Navbar;