
import { IoMdMailOpen } from "react-icons/io";
import Link from "next/link";
function Footer() {
  
  return (
    <div>
      <div className="bg-blue-950 text-white justify-between p-2 hidden lg:flex">
        <div className="flex gap-8">
          <Link href="/">Copyright © 2024 by Goutham</Link>
          <Link href="/">All rights reserved</Link>
        </div>
        <div className="flex gap-8">
          <Link href="/">Privacy policy</Link>
          <Link href="/">Website Accessibility</Link>
          <Link href="/">Terms & Conditions</Link>
        </div>
    </div>
  </div>
  )
}

export default Footer