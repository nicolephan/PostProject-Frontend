import "./Navbar.css";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

/* CUSTOMER NAV BAR */
export default function Navbar() {
  return (
    <div className="page-container">
      <nav className="nav">
        <Link to="/customer" className="home-title">
          HOME
        </Link>
        <ul>
          <CustomLink to="/customer/ship">Tracking</CustomLink>
          <CustomLink to="/customer/neworder">New Order</CustomLink>
          {/* CUSTOMER */}
          <CustomLink to="/customer/logout">Logout</CustomLink>
        </ul>
      </nav>
    </div>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
