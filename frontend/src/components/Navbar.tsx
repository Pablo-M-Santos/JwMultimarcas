import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const role = localStorage.getItem("role");

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {role === "admin" && (
          <>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/admin/products">Cadastrar Produto</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
