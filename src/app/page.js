"use client"
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  const handleSignIn = async () => {
    await signIn();
  };
  const { data: session } = useSession();

  return (
    <div>
      <div
        className="flex flex-col justify-center items-center h-screen mt-[-20px] bg-cover bg-center border-2 border-neutral-200"
        style={{backgroundImage:"url('https://img.freepik.com/free-vector/abstract-3d-perspective-indoor-wireframe-vector-design_1017-39916.jpg')"}}>
        <p className="home-page-heading text-5xl sm:text-7xl font-bold text-neutral-400 animate-pulse">WIXLAN</p>
        <p className="font-bold text-blue-950 mt-3">Power house for selling and buying</p>
        <div className="mt-6">
          {session ? (
            <Link href="/buy" className="bg-blue-950 font-semibold text-neutral-200 p-3 m-3" style={{ borderRadius: 10 }}>Get Started</Link>
          ) : (
            <button onClick={handleSignIn} className="bg-blue-950 font-semibold text-neutral-200 p-2.5 m-3" style={{ borderRadius: 10 }}>Get Started</button>
          )}  
          <Link href="/about" className="bg-blue-950 font-semibold text-neutral-200 p-3 m-3" style={{ borderRadius: 10 }}>About us</Link>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 m-5">
        <div className="p-4" style={{boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",borderRadius:10}}>
          <img src="https://i.postimg.cc/yxDyHnkf/undraw-logistics-x4dc.png" alt="" className="block m-auto w-96 h-60"/>
          <div>
            <p className="font-bold text-blue-950 text-center m-auto">Sell Your Items Hassle-Free</p>
            <p className="font-semibold text-neutral-400 text-center">List your items for sale effortlessly and reach potential buyers across the globe. </p>
          </div>
        </div>
        <div className="p-4" style={{boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",borderRadius:10}}>
          <img src="https://i.postimg.cc/qMXxdtRH/undraw-Business-deal-re-up4u.png" alt="" className="block m-auto w-96 h-60"/>
          <p className="font-bold text-blue-950 text-center">Efficient Transport Solutions</p>
          <p className="font-semibold text-neutral-400 text-center">Our reliable transportation services ensure safe and timely delivery. </p>
        </div>
        <div className="p-4" style={{boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",borderRadius:10}}>
          <img src="https://i.postimg.cc/6qh2FvhH/undraw-web-shopping-re-owap.png" alt="" className="block m-auto w-96 h-60"/>
          <p className="font-bold text-blue-950 text-center">Track Your Shipment in Real-Time</p>
          <p className="font-semibold text-neutral-400 text-center">Stay informed every step of the way with our interactive map feature. </p>
        </div>
      </div>
      {/* <Footer/>  */}
    </div>
  );
}
