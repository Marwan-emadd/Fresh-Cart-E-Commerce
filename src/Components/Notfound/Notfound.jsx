import React from "react";
import logo from "../../assets/images/error.svg";

export default function Notfound() {
  return (
    <>
      <div className=" w-full h-screen flex items-center justify-center">
        <img src={logo} alt="Error" className="object-cover" />
      </div>
    </>
  );
}
