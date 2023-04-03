import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import * as Pages from "./pages";
import "./App.css";
import AdminRoute from "./components/adminRoute";
import CustomerRoute from "./components/customerRoute";
import EmployeeRoute from "./components/employeeRoute";

export default function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route exact path="/" element={<Pages.Home />}></Route>
          <Route exact path="/ship" element={<Pages.Ship />}></Route>
          <Route exact path="/about" element={<Pages.About />}></Route>
          <Route exact path="/login" element={<Pages.Login />}></Route>

          {/* ADMIN PROTECTED ROUTES */}
          <Route element={<AdminRoute />}>
            <Route element={<Pages.Home />} path="/" exact />
            <Route element={<Pages.Admin />} path="/admin" />
          </Route>

          {/* CUSTOMER ROUTE */}
          <Route element={<CustomerRoute />}>
            <Route element={<Pages.Home />} path="/" exact />
            <Route element={<Pages.Customer />} path="/customer" />
          </Route>

          {/* EMPLOYEE ROUTE */}
          <Route element={<EmployeeRoute />}>
            <Route element={<Pages.Home />} path="/" exact />
            <Route element={<Pages.Employee />} path="/employee" />
          </Route>
        </Routes>
      </div>
    </>
  );
}
