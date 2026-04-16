import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/payment_logo.png";
import logo2 from "../../assets/images/Google_play_logo.png";

export default function Footer() {
  return (
    <footer className="bg-[#eee] mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-1">
          Get The FreshCart App
        </h2>
        <p className="text-sm text-gray-500 mb-5">
          We will send you a link, open it on your phone to download the app.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <input
            type="email"
            placeholder="Email .."
            className="flex-1 w-full border border-gray-300 rounded-md px-4 py-3 text-sm outline-none focus:border-main bg-white transition-all duration-200"
          />
          <button className="w-full sm:w-auto bg-main hover:bg-main text-white text-sm font-medium px-6 py-3 rounded-md transition-all duration-300 cursor-pointer whitespace-nowrap">
            Share App Link
          </button>
        </div>
      </div>

      <hr className="border-gray-300" />

      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-semibold text-gray-800 mt-4">
            Payment Partners
          </span>
          <img src={logo} alt="Payment Logo" />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm mt-4 font-semibold text-gray-800">
            Get deliveries with FreshCart
          </span>
          <span>
            <img className="w-80 h-15 mt-2 object-contain" src={logo2} alt="" />
          </span>
        </div>
      </div>

      <hr className="border-gray-300" />

      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
        <div>
          <p className="text-xs text-gray-500">
            © 2022 - 2024 FreshCart e-Commerce HTML Template. All rights
            reserved.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">Follow us on</span>
          <Link
            to="#"
            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:border-[#0AAD0A] hover:text-[#0AAD0A] transition-all duration-200 text-gray-600"
          >
            <i className="fab fa-facebook text-sm"></i>
          </Link>
          <Link
            to="#"
            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:border-[#0AAD0A] hover:text-[#0AAD0A] transition-all duration-200 text-gray-600"
          >
            <i className="fab fa-twitter text-sm"></i>
          </Link>
          <Link
            to="#"
            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:border-[#0AAD0A] hover:text-[#0AAD0A] transition-all duration-200 text-gray-600"
          >
            <i className="fab fa-instagram text-sm"></i>
          </Link>
        </div>
      </div>
    </footer>
  );
}
