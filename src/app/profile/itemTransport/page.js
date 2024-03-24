"use client"
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

function Transport() {
  const { data: session } = useSession();
  const [transport, setTransport] = useState([]); 


    const fetchItemsToTransport = async () => {
      if (!session) return;
      const response = await fetch("/api/transport");
      const items = await response.json();
      const userTransport = items.filter(item => item.sender_id === session.user.id);
      setTransport(userTransport);
    };
  
  useEffect(() => {
    if (session) {
      fetchItemsToTransport();
    }
  }, [session]);


  return (
      <div className="flex flex-wrap">
      {transport.map((item, index) => (
          <div key={index} className="w-full sm:w-1/2 p-4">
            <div className="rounded-lg p-4"
              style={{
                boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
              }}
            >
              <p className="text-md text-blue-950 font-semibold mb-1">{item.firstname} {item.lastname}</p>
              <p className="text-sm font-semibold text-gray-600 mb-1 overflow-hidden overflow-ellipsis whitespace-nowrap">{item.sender_address}</p>
              <p className="text-sm font-semibold text-gray-600 mb-1">{item.sender_phone}</p>
              <p className="text-sm font-semibold text-gray-600 mb-1">{item.product_name}</p>
              <p className="text-sm font-semibold text-gray-600 mb-1">{item.description}</p>
              <p className="text-sm font-semibold text-gray-600 mb-1">{item.receiver_name}</p>
              <p className="text-sm font-semibold text-gray-600 mb-1 overflow-hidden overflow-ellipsis whitespace-nowrap">{item.receiver_address}</p>
              <p className="text-sm font-semibold text-gray-600 mb-1">{item.receiver_phone}</p>
            </div>
          </div>
        ))}
      </div>
  );
}

export default Transport;

