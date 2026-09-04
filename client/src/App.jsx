import React, { useState } from "react";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import "./style.css";

// ================= REGISTER =================

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setMessage("Please fill all fields");
      return;
    }

    try {
      const response = await fetch(
        "https://password-reset-zo74.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setMessage(data.message || "Registration failed");
      }
    } catch (error) {
      setMessage("Server connection error");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Register</h2>

        {message && <div className="alert alert-info py-2">{message}</div>}

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          Already have an account?{" "}
          <button
            type="button"
            className="btn btn-link p-0"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

// ================= FORGOT PASSWORD =================

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter your email");
      return;
    }

    try {
      const response = await fetch(
        "https://password-reset-zo74.onrender.com/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);

        // For testing only
        if (data.resetLink) {
          console.log("Reset Link:", data.resetLink);
        }
      } else {
        setMessage(data.message || "Password reset request failed");
      }
    } catch (error) {
      setMessage("Server connection error");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Forgot Password</h2>

        {message && <div className="alert alert-info py-2">{message}</div>}

        <form onSubmit={handleForgotPassword}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Send Reset Link
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          Remember your password?{" "}
          <button
            type="button"
            className="btn btn-link p-0"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
// ================= LOGIN =================

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Please enter email and password");
      return;
    }

    try {
      const response = await fetch(
        "https://password-reset-zo74.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        // Save JWT token
        localStorage.setItem("token", data.token);

        setMessage("Login successful");

        // Go to profile
        navigate("/profile");
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (error) {
      setMessage("Server connection error");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Login</h2>

        {message && <div className="alert alert-info py-2">{message}</div>}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        <div className="text-center mt-3">
          <p className="mb-2">
            Don't have an account?{" "}
            <button
              type="button"
              className="btn btn-link p-0"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </p>

          <button
            type="button"
            className="btn btn-link p-0"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  );
}

// ================= PROFILE =================

function Profile() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const getProfile = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        "https://password-reset-zo74.onrender.com/api/auth/profile",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
      } else {
        setMessage(data.message || "Failed to get profile");
      }
    } catch (error) {
      setMessage("Server connection error");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "450px" }}>
        <h2 className="text-center mb-4">Profile</h2>

        {message && <div className="alert alert-info py-2">{message}</div>}

        <div className="d-grid gap-2 mb-3">
          <button className="btn btn-primary" onClick={getProfile}>
            Get Profile
          </button>

          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {user && (
          <div className="card bg-light border-0 p-3">
            <p className="mb-2">
              <strong>ID:</strong> {user._id}
            </p>

            <p className="mb-2">
              <strong>Username:</strong> {user.username}
            </p>

            <p className="mb-0">
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ================= RESET PASSWORD =================

function ResetPassword() {
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setMessage("Please enter both passwords");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        `https://password-reset-zo74.onrender.com/api/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setMessage(data.message || "Password reset failed");
      }
    } catch (error) {
      setMessage("Server connection error");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Reset Password</h2>

        {message && <div className="alert alert-info py-2">{message}</div>}

        <form onSubmit={handleResetPassword}>
          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

// ================= APP =================

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="/profile" element={<Profile />} />

      <Route path="/reset-password/:token" element={<ResetPassword />} />
    </Routes>
  );
}

export default App;
