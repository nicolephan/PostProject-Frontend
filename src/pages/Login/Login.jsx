import axios from "axios";
import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
// import ReactDOM from "react-dom";
import "./Login.css"

export default function Login(){
    return(
        <div className="container-forms">
            <div className="login">
                <h2>Login</h2>
                <LoginForm />
            </div>
            <div className="register">
                <h2>Register</h2>
                <RegisterForm />
            </div>
        </div>
    );
}


//LOGIN REGISTER FORM 2.0
function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const options = {
          method: "POST",
          url: 'https://postoffice-api.herokuapp.com/api/login',
        //   url: "/api/login", // for dev
          headers: {
            "Content-Type": "application/json",
          },
          data: { email, password },
        };
    
        try {
            const response = await axios.request(options);
            
            const { token, role } = response.data;
            //Save JWT to local storage
            localStorage.setItem('access_token', token);
            localStorage.setItem('role', role);
            localStorage.setItem('email', email);
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;

            //FIXME: remove for prod
            // console.log(token);
            console.log(role);
            if (role === 'admin') 
            {
                navigate('/admin');
            } 
            else if (role === 'customer')
            {
                navigate('/customer');
            }
            else if (role === 'employee')
            {
                navigate('/employee');
            }
            else 
            {
                navigate('/');
            }

          } catch (error) {
            console.error(error);
            console.log("FORBIDDEN");
          }
      };

    return(
        <div className="container-login">
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">
                    Email:
                    <input 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        type="email"
                        required
                    />
                </label>
                <label htmlFor="password">
                    Password:
                    <input 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        type="password"
                        required
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

const RegisterForm = () =>{
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [home_address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(email, password, home_address);

        const options = {
            method: "POST",
            url: 'https://postoffice-api.herokuapp.com/api/register-customer',
          //   url: "/api/login", // for dev
            headers: {
              "Content-Type": "application/json",
            },
            data: { email, password, first_name, last_name, home_address },
          };

        try {
            const response = await axios.request(options);
            console.log(response);
            if (response.status === 201)
            {
                console.log("Customer Created");
                alert(`Customer profile created for: ${first_name} ${last_name}.`);

            }



        } catch (error) {
            console.error(error);
            console.log("Failed to create customer user");
            alert("Failed to register customer user")
        }

    }

    return(
        <div className="container-register">
            <form onSubmit={handleSubmit}>
                <label htmlFor="fName">
                    First Name:
                    <input 
                        value={first_name} 
                        onChange={(e) => setFirstName(e.target.value)} 
                        type="text" id="fname" name="fname" 
                        required
                    />
                </label>
                <label htmlFor="lName">
                    Last Name:
                    <input 
                        value={last_name} 
                        onChange={(e) => setLastName(e.target.value)} 
                        type="text" id="lname" name="lname" 
                        required
                    />
                </label>
                <label htmlFor="email">
                    Email:
                    <input 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        type="email" id="email" name="email" 
                        required
                    />
                </label>
                <label htmlFor="address">
                    Address:
                    <input 
                        value={home_address} 
                        onChange={(e) => setAddress(e.target.value)} 
                        type="text" id="address" name="address" 
                        required
                    />
                </label>
                <label htmlFor="password">
                    Password:
                    <input 
                        value={password} 
                        onChange={(e) => setPass(e.target.value)} 
                        type="password" id="password" name="password" 
                        required
                    />
                </label>
                <button>Submit</button>
            </form>
        </div>
    )
}



//OLD LOGIN/REGISTRATION CODE
// function LoginForm(){
//     return(
//         <form>
//             <label>Email:  
//                 <input 
//                     type="text" 
//                     // value={username} 
//                     // onChange={(e) => setUsername(e.target.value)} 
//                     required
//                 />
//             </label>
//             <label>Password:  
//                 <input 
//                     type="text" 
//                     // value={password}
//                     // onChange={(e) => setPassword(e.target.value)}
//                     required
//                 />
//             </label>
//             {/* <input name="submit" type="submit" value="Submit" /> */}
//              <button>Submit</button>
//         </form> 
//     );
// }
// function RegisterForm(){
//     return(
//         <form> {/*fandl name, address*/}
//             <label>First Name:  
//                 <input type="text" required/>
//             </label>
//             <label>Last Name:  
//                 <input type="text" required/>
//             </label>
//             <label>Address:  
//                 <input type="text" required/>
//             </label>
//             <label>Password:  
//                 <input type="text" required/>
//             </label>
//             <button>Submit</button>
//         </form>
//     );
// }
