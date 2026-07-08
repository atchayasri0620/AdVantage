import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="navbar">
     <h2
  onClick={() => {
    if (role === "CLIENT") {
      navigate("/campaigns");
    } else if (role === "ADMANAGER") {
      navigate("/dashboard");
    } else if (role === "AUDIENCE") {
      navigate("/audience");
    }
  }}
>
  AdVantage
</h2>

      <div className="nav-links">

        {role === "CLIENT" && (
          <>
            <Link to="/campaigns">Campaigns</Link>
            <Link to="/create-campaign">Create Campaign</Link>
          </>
        )}

        {role === "ADMANAGER" && (
         <>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/manager-campaigns">Campaigns</Link>
        <Link to="/roi">ROI</Link>
        </>
     )}
        {role === "AUDIENCE" && (
          <>
            <Link to="/audience">Audience</Link>
          </>
        )}

      </div>

      <div className="user-info">
        <span>{role}</span>

        <button onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;