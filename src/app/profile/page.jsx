"use client"
import { useSession } from "next-auth/react";

import Sell from "./itemSell/page";
import Like from "./itemLike/page";
import Transport from "./itemTransport/page";
import Image from "next/image";
function Profile() {
  const { data: session } = useSession();
  return (
    <div className="m-3">
      <div className="text-center font-semibold text-neutral-500">
        <Image
          src={session?.user.image}
          loading="lazy"
          alt="#"
          width={100}
          height={100}
          className="rounded-full m-auto border-2 border-neutral-500"
        />
        <p className="mt-2">{session?.user.name}</p>
        <p className="mt-2 mb-3">{session?.user.email}</p>
      </div>
      <hr/>
      <h1 className="font-bold mt-3">Liked items:</h1>
      <Like/>
      <h1 className="font-bold mt-3">My Selling items:</h1>
      <Sell/>
      <h1 className="font-bold mt-3">My Transport items:</h1>
      <Transport/>
      
    </div>
  );
}

export default Profile;

