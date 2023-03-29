import "./Navbar.css";
import {Link, useMatch, useResolvedPath} from "react-router-dom";

export default function Navbar(){
    return(
        <div className="page-container">
            <nav className="nav">
                <Link to="/" className="home-title">QuickShip</Link>
                <ul>
                    <CustomLink to="/ship">Ship</CustomLink>
                    <CustomLink to="/about">About</CustomLink>

                    {/* PUBLIC */}
                    <CustomLink to="/login">Sign In</CustomLink>
                    {/* ADMIN */}
                    {/* <CustomLink to="/admin">Admin</CustomLink> */}
                    {/* CUSTOMER */}
                    {/* <CustomLink to="/customer">Customer</CustomLink> */}
                </ul>
            </nav>
        </div>
    )
}

function CustomLink({to, children, ...props}){
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path: resolvedPath.pathname, end: true});
    return(
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>{children}</Link>
        </li>
    )
}