import React from 'react';
import {useAuthContext} from "./AuthProvider";
import {useLocation, Navigate} from "react-router-dom";

export default function RequireAuth( {children} ){
    const location = useLocation();
    const {auth, roles} = useAuthContext();
    const pathName = location.pathname.split("/")[1];
    const pathCode = {
        customers: 111,
        admins: 222
    };

    if(auth === null){
        return <Navigate to="/login" state={{path: location.pathname}} replace />;
    }
    if(auth && roles.includes(pathCode[pathname])){
        return children;
    } else {
        return <Navigation to="/login" replace />
    }
}