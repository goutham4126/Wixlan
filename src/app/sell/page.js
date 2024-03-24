"use client";
import { MdCurrencyRupee } from "react-icons/md";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
export const dynamic = "force-dynamic"

function Sell() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const { data: session } = useSession();

  const sellForm = async (data) => {
    try {
      const userId = session?.user.id;
      const DataWithUserId = { ...data, seller_id: userId };
      // Send the modified data to the server
      console.log(DataWithUserId);
      const response = await fetch("/api/sell_items/new", {
        method: "POST",
        body: JSON.stringify(DataWithUserId),
      });

      if (response.ok) {
        router.push("/buy");
      }
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };

  return (
    <div className="bg-white mt-[-10px]">
      <form className="mx-auto bg-orange-100 p-3 md:w-3/4 lg:w-2/3"
        onSubmit={handleSubmit(sellForm)}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label htmlFor="Category" className="block text-md font-bold leading-6 text-gray-900">
              Category
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="Category"
                id="Category"
                className="block w-full border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-md sm:leading-6 focus:outline-none"
                placeholder="Car, Mobile, TV etc"
                {...register("Category", { required: true })}
              />
            </div>
          </div>
          <div>
            <label htmlFor="brand" className="block text-md font-bold leading-6 text-gray-900">
              Brand
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="brand"
                id="brand"
                className="block w-full border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-md sm:leading-6 focus:outline-none"
                {...register("brand", { required: true })}
              />
            </div>
          </div>
          <div>
            <label htmlFor="no_of_owners" className="block text-md font-bold leading-6 text-gray-900">
              No of Owners
            </label>
            <div className="mt-1">
              <input
                type="number"
                name="no_of_owners"
                id="no_of_owners"
                className="block w-full border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-md sm:leading-6 focus:outline-none"
                {...register("no_of_owners", { required: true })}
              />
            </div>
          </div>
          <div>
            <label htmlFor="year_owned" className="block text-md font-bold leading-6 text-gray-900">
              Year Owned
            </label>
            <div className="mt-1">
              <input
                type="month"
                name="year_owned"
                id="year_owned"
                className="block w-full border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-md sm:leading-6 focus:outline-none"
                {...register("year_owned", { required: true })}
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="description" className="block text-md font-semibold leading-6 text-gray-900">
              Description
            </label>
            <div className="mt-1">
              <textarea
                name="description"
                id="description"
                rows="4"
                className="block w-full border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-md sm:leading-6 focus:outline-none"
                {...register("description", { required: true })}
              ></textarea>
            </div>
          </div>
          <div>
            <label htmlFor="price" className="block text-md font-bold leading-6 text-gray-900">
              Price
            </label>
            <div className="mt-1 flex items-center border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset bg-white ring-gray-300 placeholder:text-gray-400 sm:text-md sm:leading-6 focus:outline-none">
              <div>
                <MdCurrencyRupee />
              </div>
              <input
                type="text"
                name="price"
                id="price"
                className="w-full pl-5 outline-none ring-gray-300 placeholder:text-gray-400 sm:text-md sm:leading-6"
                placeholder="Enter price"
                {...register("price", { required: true })}
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="photo" className="block text-md font-bold leading-6 text-gray-900">
              Upload{" "}
              <a href="https://postimages.org/" className="text-blue-500">
                URL
              </a>
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="photo"
                id="photo"
                className="mt-1 flex w-full items-center border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset bg-white ring-gray-300 placeholder:text-gray-400 sm:text-md sm:leading-6 focus:outline-none"
                {...register("photo", { required: true })}
              />
            </div>
          </div>
        </div>

        <hr className="mt-10 mb-6 border-1 border-slate-300" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <label htmlFor="seller_name" className="block text-md font-semibold leading-6 text-gray-900">
              Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="seller_name"
                id="seller_name"
                className="block w-full border-0 px-3.5 py-2 shadow-sm
                ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-md sm:leading-6 focus:outline-none"
                {...register("seller_name", { required: true })}
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="seller_address" className="block text-md font-semibold leading-6 text-gray-900">
              Complete Address
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="seller_address"
                id="seller_address"
                className="block w-full border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-md sm:leading-6 focus:outline-none"
                {...register("seller_address", { required: true })}
              />
            </div>
          </div>
          <div className="lg:col-span-1">
            <label htmlFor="seller_phone" className="block text-md font-semibold leading-6 text-gray-900">
              Phone Number
            </label>
            <div className="mt-1">
              <input
                type="tel"
                name="seller_phone"
                id="seller_phone"
                className="block w-full border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-md sm:leading-6 focus:outline-none"
                {...register("seller_phone", { required: true })}
              />
            </div>
          </div>
        </div>

        <div className="mt-10">
          <button
            type="submit"
            className="block m-auto rounded-md bg-blue-900 px-3.5 py-2.5 text-center text-md font-semibold text-white shadow-sm hover:bg-blue-800"
          >
            Post Now
          </button>
        </div>
      </form>
    </div>
  );
}

export default Sell;

