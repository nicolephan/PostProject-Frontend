import axios from "axios";
import React, {useState, useRef, useEffect} from "react";
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
          url: "/api/login",
          headers: {
            "Content-Type": "application/json",
          },
          data: { email, password },
        };
    
        try {
            const response = await axios.request(options);

            const { token, role } = response.data;
            //Save JWT to local storage
            localStorage.setItem('access_token', token)
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;

            //FIXME: remove for prod
            // console.log(token);
            // console.log(role);

            if (role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/');
            }

          } catch (error) {
            console.error(error);
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
                        type="email" id="email" name="email" 
                        required
                    />
                </label>
                <label htmlFor="password">
                    Password:
                    <input 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        type="password" id="password" name="password" 
                        required
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

const RegisterForm = () =>{
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return(
        <div className="container-register">
            <form onSubmit={handleSubmit}>
                <label htmlFor="fName">
                    First Name:
                    <input 
                        value={firstName} 
                        onChange={(e) => setFirstName(e.target.value)} 
                        type="text" id="fname" name="fname" 
                        required
                    />
                </label>
                <label htmlFor="lName">
                    Last Name:
                    <input 
                        value={lastName} 
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
                        value={address} 
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
