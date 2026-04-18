import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet, ScrollRestoration } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <ScrollRestoration />
      <Navbar />
      <Outlet></Outlet>
      <Footer />
    </>
  );
}
