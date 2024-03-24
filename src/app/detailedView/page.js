"use client"
import React, { useEffect, useState } from 'react';
import { FaShoppingCart } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
export const dynamic = "force-dynamic"
const Page = ({ searchParams }) => {
    const [userLocation, setUserLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const router=useRouter();
    const sellerAddress = searchParams.Seller_address;
    
    const Liked=async()=>{
        try{
            const response = await fetch("/api/like_item/new", {
                method: "POST",
                body: JSON.stringify(searchParams),
              });
        
              if (response.ok) {
                router.push("/profile");
              }
            }
            catch (error) {
                console.log("Error fetching data", error);
              }
        }
    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ latitude, longitude });
                    setLoading(false);
                },
                (error) => {
                    console.error('Error getting location:', error);
                    setLoading(false);
                }
            );
        } else {
            console.error('Geolocation is not supported by your browser.');
            setLoading(false);
        }
    }, []);

    return (
        <div className="bg-orange-100 mt-[-11px]">
            <div className="m-auto items-center p-3">
                <Image src={searchParams.Photo} alt="Product Image" className="block border-2 border-slate-400" width={200} height={200} />
                <div className="p-3">
                    <div className="font-semibold text-gray-800">{searchParams.Category}</div>
                    <div className="font-semibold text-gray-600 text-sm">{searchParams.Brand}</div>
                    <div className="font-semibold text-sm mt-2 text-gray-900">Rs: {searchParams.Price}/-</div>
                    <div className="text-gray-600 text-sm mt-2 font-semibold">{searchParams.Description}</div>
                    <div className="mt-4">
                        <div className="font-semibold text-gray-800">{searchParams.Seller_name}</div>
                        <div className="font-semibold text-neutral-400 text-sm">{searchParams.Seller_address}</div>
                        <div className="text-gray-600 text-sm mt-2 font-semibold">{searchParams.Seller_phone}</div>
                    </div>
                    <div>
                        <button onClick={()=>Liked()} className="mt-4 p-2 bg-cyan-500 text-white font-semibold" style={{borderRadius:5}}><FaShoppingCart className="inline mr-2 mb-0.5"/>Add to cart</button>
                    </div>
                </div>
            </div>
            <div>
                    {loading ? (
                        <p>Loading...</p>
                    ) : userLocation ? (
                        <>
                            <iframe
                                width="100%"
                                height="100%"
                                className="h-96"
                                loading="lazy"
                                allowFullScreen
                                referrerPolicy="no-referrer-when-downgrade"
                                src={
                                    userLocation && sellerAddress
                                        ? `https://www.google.com/maps/embed/v1/directions?key=AIzaSyCAYhOv9bpaK9lPFyTNxDoaeUbDXOUDvec&origin=${userLocation.latitude},${userLocation.longitude}&destination=${sellerAddress}`
                                        : `https://www.google.com/maps/embed/v1/place?key=AIzaSyCAYhOv9bpaK9lPFyTNxDoaeUbDXOUDvec&q=${userLocation.latitude},${userLocation.longitude}`
                                }
                            ></iframe>
                        </>
                    ) : (
                        <p>Error getting user location.</p>
                    )}
            </div>
        </div>
    );
}

export default Page;
