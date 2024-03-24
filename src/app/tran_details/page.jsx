"use client"
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
export const dynamic = "force-dynamic"

function Transport() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const { data: session } = useSession();

  const trans = async (details) => {
    try {
      const userId = session?.user.id;
      const dataWithUserId = { ...details, sender_id: userId };
      const response = await fetch("/api/transport/new", {
        method: "POST",
        body: JSON.stringify(dataWithUserId),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = () => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setTimeout(() => {
        navigator.serviceWorker.ready.then(function(registration) {
          registration.showNotification('WIXLAN', {
            body: 'You have a scheduled transport !!',
            icon: 'https://ssl.gstatic.com/onebox/media/sports/logos/f958HPOsI1ugsHmwc4piCw_96x96.png',
          });
        });
      },2000);
    }
  };

  return (
    <div className="bg-white mt-10 mb-1.5">
      <form
        className="mx-auto bg-orange-100 rounded-md p-4 md:w-3/4 lg:w-2/3"
        onSubmit={handleSubmit(trans)}>
        <h1 className="text-xl mb-4 font-bold text-blue-900">Sender&apos;s Information:</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="firstname" className="block text-md font-semibold leading-6 text-gray-900">First name</label>
          <div className="mt-1">
            <input type="text" name="firstname" id="firstname"  
            className="block w-full rounded-md border-0 px-3.5 py-2  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-md sm:leading-6 focus:outline-1 focus:outline-slate-400"
            {...register('firstname', { required: true })}/>
          </div>
        </div>
        <div>
          <label htmlFor="lastname" className="block text-md font-semibold leading-6 text-gray-900">Last name</label>
          <div className="mt-1">
            <input type="text" name="lastname" id="lastname"  
            className="block w-full rounded-md border-0 px-3.5 py-2  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-md sm:leading-6 focus:outline-1 focus:outline-slate-400"
            {...register('lastname', { required: true })}/>
          </div>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="sender_address" className="block text-md font-semibold leading-6 text-gray-900">Complete Address</label>
          <div className="mt-1">
            <input type="text" name="sender_address" id="sender_address"  
            className="block w-full rounded-md border-0 px-3.5 py-2  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-md sm:leading-6 focus:outline-1 focus:outline-slate-400"
            {...register('sender_address', { required: true })}/>
          </div>
        </div>
        <div className="lg:col-span-1">
          <label htmlFor="sender_phone" className="block text-md font-semibold leading-6 text-gray-900">Phone Number</label>
          <div className="mt-1">
            <input type="tel" name="sender_phone" id="sender_phone" 
            className="block w-full rounded-md border-0 px-3.5 py-2  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-md sm:leading-6 focus:outline-1 focus:outline-slate-400"
            {...register('sender_phone', { required: true })}/>
          </div>
        </div>
            <div className="lg:col-span-1">
              <label htmlFor="product_name" className="block text-md font-semibold leading-6 text-gray-900">Product name</label>
              <div className="mt-1">
                <input type="text" name="product_name" id="product_name"  
                className="block w-full rounded-md border-0 px-3.5 py-2  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-md sm:leading-6 focus:outline-1 focus:outline-slate-400"
                {...register('product_name', { required: true })}/>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="description" className="block text-md font-semibold leading-6 text-gray-900">Description about Object</label>
              <div className="mt-1">
                <textarea name="description" id="description" rows="4" 
                className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-md sm:leading-6 focus:outline-1 focus:outline-slate-400"
                {...register('description', { required: true })}></textarea>
              </div>
            </div>
        </div>

        <hr className="mt-10 mb-6 border-1 border-slate-300"/>

        <h1 className="text-xl mb-4 font-bold text-blue-900">Receiver&apos;s Information :</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="receiver_name" className="block text-md font-semibold leading-6 text-gray-900">Full name</label>
              <div className="mt-1">
                <input type="text" name="receiver_name" id="receiver_name"  
                className="block w-full rounded-md border-0 px-3.5 py-2  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-md sm:leading-6 focus:outline-1 focus:outline-slate-400"
                {...register('receiver_name', { required: true })}/>
              </div>
            </div>
            <div>
              <label htmlFor="receiver_phone" className="block text-md font-semibold leading-6 text-gray-900">Phone Number</label>
              <div className="mt-1">
                <input type="tel" name="receiver_phone" id="receiver_phone" 
                className="block w-full rounded-md border-0 px-3.5 py-2  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-md sm:leading-6 focus:outline-1 focus:outline-slate-400"
                {...register('receiver_phone', { required: true })}/>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="receiver_address" className="block text-md font-semibold leading-6 text-gray-900">Complete Address</label>
              <div className="mt-1">
                <input type="text" name="receiver_address" id="receiver_address"  
                className="block w-full rounded-md border-0 px-3.5 py-2  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-md sm:leading-6 focus:outline-1 focus:outline-slate-400"
                {...register('receiver_address', { required: true })}/>
              </div>
            </div>

        </div>
        <div className="mt-10">
          <button type="submit" onClick={handleClick} className="block m-auto rounded-md bg-blue-900 px-3.5 py-2.5 text-center text-md font-semibold text-white shadow-sm hover:bg-blue-800 ">Avail Transport</button>
        </div>
      </form>
    </div>
  );
}

export default Transport;
