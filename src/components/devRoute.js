import React from "react";
import { Outlet } from "react-router-dom";

// Dev route (to be deleted)

export default function Public() {
  return (
    <>
      <div className="container">
        <Outlet />
      </div>
    </>
  );
}
