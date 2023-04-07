import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";

// Dev route (to be deleted)

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
