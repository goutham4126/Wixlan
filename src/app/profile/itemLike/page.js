"use client"
import { useState, useEffect } from "react";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
function Like() {
  const { data: session } = useSession();
  const [data, setData] = useState([]);

    const likedItems = async () => {
      if (!session) return;
      const response = await fetch("/api/like_item");
      const items = await response.json();
      const userLikedItems = items.filter(item => item.seller_id!== session.user.id);
      setData(userLikedItems);
    };

    const handleDelete = async (itemId) => {
      try {
        await fetch(`/api/LikedDelete/${itemId}`, {
          method: 'DELETE',
        }); 
        setData(prevData => prevData.filter(item => item._id !== itemId));
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    };

  
  useEffect(() => {
    if (session) {
      likedItems();
    }
  }, [session]);

 

  return (
    <div className="flex flex-wrap">
      {data.map((item, index) => (
        <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-5">
          <div className="p-4" style={{boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",borderRadius:10}}>
            <Image src={item.photo} loading="lazy" className="m-auto mb-3" width={200} height={100} style={{borderRadius:5}} alt=""/>
            <p className="text-md text-blue-950 font-semibold mb-1">Category: {item.Category}</p>
            <p className="text-sm font-semibold text-gray-600 mb-1">{item.brand}</p>
            <p className="text-sm font-semibold text-gray-600 mb-1"><FaIndianRupeeSign className="inline"/> {item.price}</p>
            <p className="text-sm font-semibold text-gray-600 mb-1 overflow-hidden overflow-ellipsis whitespace-nowrap">{item.seller_address}</p>
            <div className="flex justify-around items-center mt-3">
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
                <button onClick={()=>handleDelete(item._id)} className="font-semibold bg-red-500 text-white p-2.5" style={{borderRadius:10}}>Delete</button>
              </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Like;
