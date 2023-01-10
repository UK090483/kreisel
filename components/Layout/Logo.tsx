import React from "react";
import Image from "next/image";
export const Logo = () => {
  return (
    <div className="py-2 ">
      <Image
        width={161}
        height={50}
        src="/Kreisel_Logo.png"
        alt=" Kreisel Logo"
      />
    </div>
  );
};
