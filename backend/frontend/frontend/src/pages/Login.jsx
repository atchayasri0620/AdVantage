import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await login({
        username,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      localStorage.setItem(
        "user",
       JSON.stringify({
         username,
         role: response.data.role,
       })
     );
      alert("Login Successful!");

      if (response.data.role === "ADMANAGER") {
        navigate("/dashboard");
      } else if (response.data.role === "CLIENT") {
        navigate("/campaigns");
      } else if (response.data.role === "AUDIENCE") {
        navigate("/audience");
      }

    } catch (error) {
      console.log(error);
      alert("Invalid Username or Password");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <h1>AdVantage</h1>
        <p>Advertising Campaign Management System</p>

        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>
          Login
        </button>

        <div className="login-footer">
          Secure Login • JWT Authentication
        </div>

      </div>
    </div>
  );
}

export default Login;