import React, {useState} from 'react';
import { Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import * as Pages from './pages';
import './App.css';
import ProtectedRoutes from './components/protectedRoutes';


export default function App(){

  return(
    <>
      <Navbar />
      <div className="container">
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route exact path="/" element={<Pages.Home />}></Route>
          <Route exact path="/ship" element={<Pages.Ship />}></Route>
          <Route exact path="/about" element={<Pages.About />}></Route>
          <Route exact path="/login" element={<Pages.Login />}></Route>

          <Route element={<ProtectedRoutes />}>
              <Route element={<Pages.Home/>} path="/" exact/>
              <Route element={<Pages.Admin/>} path="/admin"/>
          </Route>
          

          {/* CUSTOMER ROUTE */}
          <Route exact path="/customer" element={<Pages.Customer />}></Route>
          <Route exact path="/track" element={<Pages.Track />}></Route>
        </Routes>
        {/* ADMIN ROUTES */}
        
      </div>
    </>
  );
}
