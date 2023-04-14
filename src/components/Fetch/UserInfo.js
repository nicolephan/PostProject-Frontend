import React, {useState, useEffect} from 'react';
import axios from 'axios'

export default function UserInfo(current_user){
    const [customerInfo, setCustomerInfo] = useState([]);

    useEffect(() => {
        const optionUser = {
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            // url: '/api/userinfo',
            url: 'https://postoffice-api.herokuapp.com/api/userinfo',
            data: {'email': current_user}
        };

        const getCustomerInfo = async () => {
            try{
                const response = await axios.request(optionUser);
                const data = response.data;
                setCustomerInfo(data);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
        getCustomerInfo();
    }, [current_user]); 

    return customerInfo;
}