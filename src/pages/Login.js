import React, {useState} from "react";
import ReactDOM from "react-dom";
import "./Styles.css"

export default function Login(){
    return(
        <div className="container-signin">
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

function User(){
    const[selects, setSelects]=useState();
    return(
        <div>
            <select>
                <option></option>
                <option>Customer</option>
                <option>Admin</option>
            </select>
        </div>
    );
}

function LoginForm(){
    // const [errorMessage, setErrorMessage] = useState({});
    // const [isSubmitted, setIsSubmitted] = useState(false);

    // const database_example = [
    //     {
    //         username: "name1",
    //         password: "pass1"
    //     },
    //     {
    //         username: "name2",
    //         password: "pass2"
    //     }
    // ];

    // // const[username, setUsername] = useState('');
    // // const[password, setPassword] = useState('');

    // const error = {
    //     uname: "Invalid Username",
    //     pass: "Invalid Password"
    // };

    // const handleSubmit = (event) => { //prevent page reload
    //     event.preventDefault();
    // }

    // var { uname, pass } = document.forms[0];

    // //find user login info
    // const userData = database_example.find((user) => user.username === uname.value);
    
    // if(userData){
    //     if(userData.password !== pass.value){
    //         setErrorMessage({ name: "pass", message: error.pass });
    //     } 
    //     else { setIsSubmitted(true); }
    // }
    // else{
    //     setErrorMessage({ name: "uname", message: error.uname });
    // }

    // const renderErrorMessage = (name) =>
    //     name === errorMessage.name && (
    //         <div className="error">{errorMessage.message}</div>
    //     )

    // const renderForm = (
    //     <div className="form">
    //         <form onSubmit={handleSubmit}>
    //             <div className="inputs">
    //                 <label>Username: </label>
    //                 <input type="text" name="uname" required />
    //                 {renderErrorMessage("uname")}
    //                 <label>Password: </label>
    //                 <input type="password" name="pass" required />
    //                 {renderErrorMessage("pass")}
    //             </div>
    //             <div className="submit-button">
    //                 <input type="submit" />
    //             </div>
    //         </form>
    //     </div>
    // );

    // return (
    //     <div className="signin">
    //     <div className="login-form">
    //         <div className="title">Login</div>
    //         {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
    //     </div>
    //     </div>
    // )
    return(
    <form>
            <label>Email:  
                <input 
                    type="text" 
                    // value={username} 
                    // onChange={(e) => setUsername(e.target.value)} 
                    required
                />
            </label>
            <label>Password:  
                <input 
                    type="text" 
                    // value={password}
                    // onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            {/* <input name="submit" type="submit" value="Submit" /> */}
             <button>Submit</button>
        </form> 
        );
}

function RegisterForm(){
    return(
        <form> {/*fandl name, address*/}
            <label>Email:  
                <input type="text" required/>
            </label>
            <label>Name:  
                <input type="text" required/>
            </label>
            <label>Password:  
                <input type="text" required/>
            </label>
            {/*<div>todo: need to send back type along w/ user and pass */}
                {/* <label>
                    <select className="userButton">
                        
                        <option>Customer</option>
                        <option>Admin</option>
                    </select>
                </label>
            </div> */}
            <button>Submit</button>
        </form>
    );
}
