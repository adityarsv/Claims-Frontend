import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <div>
        <Link to="/dashboard" className="mr-4">Dashboard</Link>
        <Link to="/policyholders" className="mr-4">Policyholders</Link>
        <Link to="/policies" className="mr-4">Policies</Link>
        <Link to="/claims">Claims</Link>
      </div>
      <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
    </nav>
  );
}

export default Navbar;
