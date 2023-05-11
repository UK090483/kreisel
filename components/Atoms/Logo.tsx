import Kreisel from "./Kreisel";
import React from "react";
// import Image from "next/image";

export const Logo = () => {
  return (
    <div className="py-2 ">
      <Build />
      {/* <Image
        width={161}
        height={50}
        src="/Kreisel_Logo.png"
        alt="Kreisel Logo"
      /> */}
    </div>
  );
};

const Build = () => {
  return (
    <span className="flex gap-1">
      <Kreisel className="w-5" />
      <div className=" text-[30px] leading-none tracking-tighter">
        KREISEL <span className=" text-[10px] tracking-normal ">e.V.</span>
      </div>
    </span>
  );
};
