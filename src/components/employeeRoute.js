import { Outlet, Navigate } from 'react-router-dom';

const EmployeeRoute = () => {
  
  const role = localStorage.getItem('role');
  //console.log(role);

  if (role === 'employee')
  {
    return <Outlet />; //returns to child property page
  } else {
    return <Navigate to="/" />; //TODO: navigate to a 403 page with a back button
  }
};


export default EmployeeRoute;