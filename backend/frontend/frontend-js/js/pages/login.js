// Vanilla JS port of src/pages/Login.jsx
import { login } from "../services/authService.js";

const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("login-btn");

async function handleLogin() {
  const username = usernameInput.value;
  const password = passwordInput.value;

  try {
    const response = await login({ username, password });

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
      window.location.href = "dashboard.html";
    } else if (response.data.role === "CLIENT") {
      window.location.href = "campaigns.html";
    } else if (response.data.role === "AUDIENCE") {
      window.location.href = "audience.html";
    }
  } catch (error) {
    console.log(error);
    alert("Invalid Username or Password");
  }
}

loginBtn.addEventListener("click", handleLogin);
