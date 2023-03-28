// import logo from './logo.svg';
// import './App.css';
// import { Link, Navigate, Route, Routes } from "react-router-dom";

// const USER_TYPES = {
//   PUBLIC: 'Public User',
//   NORMAL_USER:"Normal User", 
//   ADMIN_USER:"Admin User"
// }
// const CURRENT_USER_TYPE = USER_TYPES.PUBLIC

// function App(){
//   return(
//     <div>
//       <div style={{ 
//         display: "flex", 
//         gap:12, 
//         padding: 8,
//         backgroundColor: "rgb(110, 110, 210)",
//         borderBottom: "1px solid red", 
//         color: "white:", 
//         maginBottom: 8,
//         }}
//       >
//         <Link style={{color:"white"}} to={"/"}>
//           Home
//         </Link>

//         {CURRENT_USER_TYPE === USER_TYPES.ADMIN_USER || 
//           CURRENT_USER_TYPE === USER_TYPES.NORMAL_USER?(<>
//           <Link style={{color:"white"}} to={"/user"}>
//             User
//           </Link>
//           <Link style={{color:"white"}} to={"/myProfile"}>
//             User Profile
//           </Link>
//         </>
//         ) : null}

//         {CURRENT_USER_TYPE === USER_TYPES.ADMIN_USER?(
//         <>
//           <Link style={{color:"white"}} to={"/admin"}>Admin</Link>
//         </>
//         ) : null}
        
//         <div>You are Logged in as: {CURRENT_USER_TYPE}</div>
//       </div>
//       <AppRoutes />
//     </div>
//   )
// }

// function AppRoutes() {
//   return (
//     <div>
//       <Routes>
//         <Route 
//           path="/" 
//           element={
//             <PublicElement>
//               <Home />
//             </PublicElement>
//           }
//         ></Route>
//         <Route path="/user" element={<UserElement><User /></UserElement>}></Route>
//         <Route path="/myProfile" element={<UserElement><User /></UserElement>}></Route>
//         <Route path="/admin" element={<AdminElement><Admin /></AdminElement>}></Route>
//         <Route path="*" element={<div>Page Not Found</div>}></Route>

//       </Routes>
//     </div>
//   );
// }

// function Home(){
//     return <div>Home</div>
// }
// function User(){
//   return <div>User Page</div>
// }
// function Admin(){
//   return <div>Admin Page</div>
// }

// function PublicElement({children}){
//   return <>{children}</>;
// }

// function UserElement({children}){
//   if(CURRENT_USER_TYPE === USER_TYPES.ADMIN_USER || CURRENT_USER_TYPE === USER_TYPES.NORMAL_USER){
//     return <>{children}</>;
//   }else{
//     return <Navigate to={"/"} />
//     // return <div>You do not have access to this page!</div>
//   }
// }
// function AdminElement({children}){
//   if(CURRENT_USER_TYPE === USER_TYPES.ADMIN_USER){
//     return <>{children}</>;
//   }else{
//     return <div>You do not have access to this page!</div>
//   }
// }

// export default App;

import React, {useState} from 'react';
import { Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import * as Pages from './pages';
import './App.css';

//todo remove this
const USER_TYPES = {
  PUBLIC: 'Public',
  CUSTOMER_USER: 'Customer',
  ADMIN_USER: 'Admin'
}

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

          {/* ADMIN ROUTES */}
          <Route exact path="/admin" element={<Pages.Admin />}></Route>

          {/* CUSTOMER ROUTE */}
          <Route exact path="/customer" element={<Pages.Customer />}></Route>
          <Route exact path="/track" element={<Pages.Track />}></Route>
        </Routes>
      </div>
    </>
  );
}
