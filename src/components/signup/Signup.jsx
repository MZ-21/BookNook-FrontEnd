import { useState } from "react";
import { signup } from "../../api/authApi";
import { useNavigate } from "react-router-dom";

// Signup component for user registration
export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    profileImg: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(form); // Call signup API
    alert("Account created! Please log in.");
    navigate("/login"); // Redirect to login page after successful signup
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>

      <input
        placeholder="Username"
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />

      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button type="submit">Create Account</button>
    </form>
  );
}
