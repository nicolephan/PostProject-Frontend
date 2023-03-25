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

import React from "react";
import { Route, Routes, Link, Navigate } from "react-router-dom";

import Navbar from "./components/NavbarPublic/Navbar";
import Home from "./pages/Home/Home";
import Ship from "./pages/Ship";
import About from "./pages/About/About";
import Login from "./pages/Login/Login";

import AdminLayout from "./layouts/Admin.js";
import routes from "./routes.js";

// Function to return all route from routes.js
const getRoutes = (routes, layout) => {
  return routes.map((prop, key) => {
    if (prop.layout === layout) {
      return (
        <Route
          path={prop.layout + prop.path}
          element={<prop.component />}
          key={key}
        />
      );
    } else {
      return null;
    }
  });
};

export default function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/ship" element={<Ship />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/admin"
            element={<Navigate replace to="/admin/neworder" />}
          />
          <Route path="/admin" element={<AdminLayout />}>
            <Route>{getRoutes(routes, "/admin")}</Route>
          </Route>
        </Routes>
      </div>
    </>
  );
}
