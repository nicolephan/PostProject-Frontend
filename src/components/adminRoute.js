import { Outlet, Navigate } from 'react-router-dom';

const AdminRoute = () => {
  
  const role = localStorage.getItem('role');
  //console.log(role);

  //TODO: route to other roles employee and customer.

  if (role === 'admin')
  {
    return <Outlet />; //returns to child property page
  } else {
    return <Navigate to="/" />; //TODO: navigate to a 403 page with a back button
  }
};


export default AdminRoute;