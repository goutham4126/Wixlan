"use client"
import { useState } from "react";
import { FaIndianRupeeSign } from "react-icons/fa6";

function EditModal({ editedItem, handleEditSubmit,closeModal}) {
  const [formData, setFormData] = useState({
    brand: editedItem.brand,
    price: editedItem.price,
    seller_address: editedItem.seller_address,

  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditSubmit(formData);
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center block">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form onSubmit={handleSubmit} className="p-6">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="brand">Brand</label>
              <input type="text" id="brand" name="brand" value={formData.brand} onChange={handleChange} className="border rounded-md py-2 px-3 w-full" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">Price</label>
              <input type="text" id="price" name="price" value={formData.price} onChange={handleChange} className="border rounded-md py-2 px-3 w-full" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="seller_address">Seller Address</label>
              <input type="text" id="seller_address" name="seller_address" value={formData.seller_address} onChange={handleChange} className="border rounded-md py-2 px-3 w-full" />
            </div>
            
            <div className="flex justify-end">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Save</button>
              <button type="button" onClick={closeModal} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
