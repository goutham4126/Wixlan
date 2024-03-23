"use client"
import { FaSearch } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import { useState } from "react";

function Search({ setSearch, setBasis }) {
  const [filtertype, setFiltertype] = useState(false);
  const [placeholder, setPlaceholder] = useState("Category");

  const handleFilter = () => {
    setFiltertype(prev => !prev);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleBrand = () => {
    setBasis("brand");
    setPlaceholder("Brand");
    handleFilter();
  };


  const handleCategory = () => {
    setBasis("Category");
    setPlaceholder("Category");
    handleFilter();
  };
  const handleLocation = () => {
    setBasis("seller_address");
    setPlaceholder("Location");
    handleFilter();
  };


  return (
    <div className="m-auto relative ">
        <div className="flex items-center border-2 border-neutral-400 p-2" style={{ borderRadius: 15 }}>
          <FaSearch />
          <input name="search" id="search" placeholder={placeholder} className="border-neutral-400 outline-0 ml-3 text-neutral-400 font-medium" onChange={handleSearchChange} />
          <IoFilter onClick={handleFilter} />
        </div>
      {filtertype && (
        <div className="bg-orange-100 text-blue-900 p-3 w-32 text-center font-semibold absolute right-0 mt-1 leading-loose" style={{ borderRadius: 5 }}>
          <h1 onClick={handleCategory} className="cursor-pointer">Category</h1>
          <h1 onClick={handleBrand} className="cursor-pointer">Brand</h1>
          <h1 onClick={handleLocation} className="cursor-pointer">Location</h1>
        </div>
      )}
    </div>
  );
}

export default Search;
