"use client"
import { useState,useEffect } from "react"
import { FaIndianRupeeSign } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Search from "@/components/Search/Search";
import WhatsAppButton from "@/share/Whatsapp";
import Email from "@/share/Email";
import Image from "next/image";

function Buy(){
  const [data, setData] = useState([]);
  const { data: session } = useSession();
  const [search, setSearch] = useState("");
  const [basis, setBasis] = useState("Category");
  const url="www.google.com"
  const message="Link for the item !!"
  useEffect(()=>{
  const ItemsToBuy = async () => {
    const response = await fetch("/api/sell_items");
    const items = await response.json();  
    const userItems = items.filter(item => item.seller_id !== session.user.id);
    setData(userItems);
  }
    if(session)
    ItemsToBuy();
  },[])

  return (
    <div className="flex flex-col flex-wrap">
      <Search setSearch={setSearch} setBasis={setBasis}/>
      {

        data.filter(item => {
          if (!search || item[basis].toLowerCase().includes(search.toLowerCase())) {
            return true;
          }
          return false;
        }).map((item, index) => (
        <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-5">
          <div className="p-4" style={{boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",borderRadius:10}}>
            <Image src={item.photo} loading="lazy" className="m-auto mb-3" width={200} height={100} style={{borderRadius:5}} alt=""/>
            <p className="text-md text-blue-950 font-semibold mb-1">Category: {item.Category}</p>
            <p className="text-sm font-semibold text-gray-600 mb-1">{item.brand}</p>
            <p className="text-sm font-semibold text-gray-600 mb-1"><FaIndianRupeeSign className="inline"/> {item.price}</p>
            <p className="text-sm font-semibold text-gray-600 mb-1 overflow-hidden overflow-ellipsis whitespace-nowrap">{item.seller_address}</p>
            <div className="flex justify-between items-center mt-3">
                <div className="text-green-500">
                  <WhatsAppButton url={url} message={message}/>
                </div>
                <Link href={{
                  pathname:'/detailedView',
                  query:{
                    Category:item.Category,
                    Brand:item.brand,
                    No_of_owners:item.no_of_owners,
                    Year_owned:item.year_owned,
                    Description:item.description,
                    Price:item.price,
                    Photo:item.photo,
                    Seller_name:item.seller_name,
                    Seller_address:item.seller_address,
                    Seller_phone:item.seller_phone,
                    Seller_id:item.seller_id,
                  }
                }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold p-3 mb-1 text-sm"
                style={{borderRadius:10}}
                >
                  Details
                </Link>
                <div className="text-red-700">
                  <Email url={url} message={message} />
                </div>
              </div>
          </div>
        </div>
      ))}
    </div>


  )
}

export default Buy


