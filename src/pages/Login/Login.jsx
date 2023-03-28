import React, {useState, useRef, useEffect} from "react";
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

//LOGIN REGISTER FORM 3.0
// const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
// const PWD_REGEX = />(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8-24}$/;

// const LoginForm = () =>{
//     return(
//         <div>Login</div>
//     );
// }
// const RegisterForm = () => {
//     const userRef = useRef();
//     const errRef = useRef();

//     const [firstName, setFirstName] = useState('');
//     const [validFName, setValidFName] = useState(false);
//     const [fNameFocus, setFNameFocus] = useState(false);
//     const [lastName, setLastName] = useState('');
//     const [validLName, setValidLName] = useState(false);
//     const [lNameFocus, setLNameFocus] = useState(false);
//     const [email, setEmail] = useState('');
//     const [validEmail, setValidEmail] = useState(false);
//     const [emailFocus, setEmailFocus] = useState(false);
//     const [password, setPass] = useState('');
//     const [validpass, setValidPass] = useState(false);
//     const [passFocus, setPassFocus] = useState(false);

//     const [matchPass, setMatchPass] = useState('');
//     const [validMatch, setValidMatch] = useState(false);
//     const [matchFocus, setMatchFocus] = useState(false);

//     const [errMsg, setErrMsg] = useState('');
//     const [success, setSuccess] = useState(false);

//     useEffect(() => {
//         userRef.current.focus();
//     })
//     useEffect(() => {
//         setErrMsg('');
//     }, [firstName, password, matchPass])
//     useEffect(() =>{
//         const result = USER_REGEX.text(firstName);
//         console.log(result);
//         console.log(firstName);
//         setValidFName(result);
//     }, [firstName])
//     useEffect(() =>{
//         const result = PWD_REGEX.text(password);
//         console.log(result);
//         console.log(password);
//         setValidPass(result);
//         const match = password === matchPass;
//         setValidMatch(match);
//     }, [password, matchPass])

//     return(
//         <section>
//             <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}
//                 aria-live="assertive">{errMsg}</p>
//             <h1>Register</h1>
//             <form>
//                 <label htmlFor="firstname">First Name: </label>
//                 <input
//                     type="text"
//                     id="username"
//                     ref={userRef}
//                     autoComplete="off"
//                     onChange={(e) => setFirstName(e.target.value)}
//                     required
//                     aria-invalid={validFName ? "false" : "true"}
//                     aria-describedby="uidnote"
//                     onFocus={() => setFNameFocus(true)}
//                     onBlur={() => setFNameFocus(false)}
//                 />
//                 <p id="uidnote" className={fNameFocus && firstName && !validFName ? "instructions" : "offscreen"}>
//                     4 to 24 characters.
//                 </p>
//             </form>
//         </section>
//     );
// }


//LOGIN REGISTER FORM 2.0
const LoginForm = () =>{
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

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
                        onChange={(e) => setPass(e.target.value)} 
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
