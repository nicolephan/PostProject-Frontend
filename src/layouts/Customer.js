import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/CustomerNavbar";

// Customer page layout with components:
// Navbar

export default function Public() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </>
  );
}