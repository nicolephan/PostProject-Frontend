import { Outlet, Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoutes = () => {
  const token = localStorage.getItem('access_token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  //TODO FIX PREFLIGHT REQUEST ON BACKEND SIDE
  const fetchData = async () => {
    const options = {
      method: 'POST',
      url: 'http://localhost:5000/admin', // Use the /api prefix
      headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}`,}
    };

    try {
      const response = await axios.request(options);
      console.log(response.data); // print the response data
    } catch (error) {
      console.log(error); // handle the error
    }
  };

  fetchData();

  return token ? <Outlet /> : <Navigate to="/" />; //TODO: navigate to a 403 page with a back button
};


export default ProtectedRoutes;