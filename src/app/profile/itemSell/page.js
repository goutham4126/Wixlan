"use client"
import { useState, useEffect } from "react";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import EditModal from "@/components/EditForm/EditForm";

function Sell() {
  const { data: session } = useSession();

  const [data, setData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedItem, setEditedItem] = useState(null);

  const fetchItemsToSell = async () => {
    if (!session) return;
    const response = await fetch("/api/sell_items");
    const items = await response.json();
    const userItems = items.filter(item => item.seller_id === session.user.id);
    setData(userItems);
  };

  useEffect(() => {
    if (session) {
      fetchItemsToSell();
    }
  }, [session]);

  const handleDelete = async (itemId) => {
    try {
      await fetch(`/api/delete_item/${itemId}`, {
        method: 'DELETE',
      }); 
      setData(prevData => prevData.filter(item => item._id !== itemId));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleEdit = (item) => {
    setEditedItem(item);
    setEditMode(true);
  };

  const handleEditSubmit = async (editedData) => {
    console.log(editedData);
    try {
      const response = await fetch(`/api/edit_item/${editedItem._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedData),
      });
      if (response.ok) {
        const updatedItem = await response.json();
        setData(prevData => prevData.map(item => (item._id === updatedItem._id ? updatedItem : item)));
        setEditMode(false);
        setEditedItem(null);
      } else {
        console.error('Failed to edit item:', response.statusText);
      }
    } catch (error) {
      console.error('Error editing item:', error);
    }
  };

  return (
    <div className="flex flex-wrap">
      {data.map((item, index) => (
        <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-4">
          <div
            className="rounded-lg p-4"
            style={{
              boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
            }}
          >
            <img src={item.photo} loading="lazy" className="m-auto mb-3 h-[150px] rounded-md" alt="" />
            <p className="text-md text-blue-950 font-semibold mb-1">Category: {item.Category}</p>
            <p className="text-sm font-semibold text-gray-600 mb-1">{item.brand}</p>
            <p className="text-sm font-semibold text-gray-600 mb-1">
              <FaIndianRupeeSign className="inline" /> {item.price}
            </p>
            <p className="text-sm font-semibold text-gray-600 mb-1 overflow-hidden overflow-ellipsis whitespace-nowrap">
              {item.seller_address}
            </p>
            <div className="flex justify-between">
              <button className="mt-2" onClick={() => handleDelete(item._id)}><MdDeleteOutline className="size-7 text-red-700"/></button>
              <button className="mt-2" onClick={() => handleEdit(item)}><AiOutlineEdit className="size-7 text-green-700"/></button>
            </div>
          </div>
        </div>
      ))}
      {editMode && editedItem && (
        <EditModal editedItem={editedItem} handleEditSubmit={handleEditSubmit} closeModal={() => setEditMode(false)} />
      )}
    </div>
  );
}

export default Sell;
