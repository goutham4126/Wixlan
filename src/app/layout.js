"use client"
import { useState } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Provider from "@/components/Provider/Provider";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "WIXLAN",
//   description: "buy-transport-sell-rewind",
// };

export default function RootLayout({ children }) {
  const [layoutFontSize, setLayoutFontSize] = useState(16); // Initial font size

  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100 }}>
            <Navbar setLayoutFontSize={setLayoutFontSize} />
          </div>
          <div className="mt-14 lg:mt-16" style={{ fontSize: layoutFontSize }}>
            {children}
          </div>
        </Provider>
      </body>
    </html>
  );
}