import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { data } = await axios.post("https://claims-2-weld.vercel.app/login", { username, password });
      console.log(data);
      localStorage.setItem("token", data.access_token);
      navigate("/dashboard");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl mb-4">Login</h2>
        <input type="text" placeholder="Username" className="border p-2 w-full" onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" className="border p-2 w-full mt-2" onChange={(e) => setPassword(e.target.value)} />
        <button className="bg-blue-600 text-white px-4 py-2 mt-4 w-full" onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default Login;
