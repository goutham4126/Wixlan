"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { signIn, useSession, getProviders } from "next-auth/react";
import Menubar from "./Menubar";

function Navbar() {

  //Used for setting the providers for session handling.
  const [providers, setProviders] = useState(null);
  useEffect(() => {
    const setUpProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    setUpProviders();
  }, []);

  const { data: session } = useSession();

  return (
    <div className="flex justify-between items-center bg-blue-950 text-white p-2 md:p-3">
      <div>
        <Link href="/">
          <b>WIXLAN</b>
        </Link>
      </div>

      <div className="flex gap-5">
        {session?.user ? (
          <>
            <Menubar/>
          </>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="hover:bg-slate-300 hover:rounded-lg hover:text-blue-950 p-1 font-semibold"
                >
                  Signin
                </button>
              ))}
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
