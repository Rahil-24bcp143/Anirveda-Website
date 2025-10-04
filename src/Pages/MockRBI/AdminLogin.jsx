import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const AdminLogin = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token === "anirveda-admin-token") {
      setIsLoggedIn(true);
      navigate("/adminpanel");
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    if (isLoggedIn) {
      toast.error("Another Admin is Already Logged In");
      return;
    }

    if (username === "anirveda-admin" && password === "anirveda-admin-123") {
      localStorage.setItem("adminToken", "anirveda-admin-token");
      setIsLoggedIn(true);
      toast.success("Login Successful");
      navigate("/adminpanel");
    } else {
      toast.error("Invalid Credentials");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsLoggedIn(false);
    toast.success("Logged out successfully!");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-tertiary">
      <Toaster position="top-right" reverseOrder={false} />
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-secondary-15 rounded-lg shadow-lg p-6"
      >
        <h2 className="text-center text-2xl font-bold text-primary mb-6">
          Admin Login
        </h2>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-white">
            Username:
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            required
            className="w-full p-3 border border-secondary rounded-md bg-inputFieldColor focus:outline-none focus:ring-2 focus:ring-primary text-black"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-white">
            Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border border-secondary rounded-md bg-inputFieldColor focus:outline-none focus:ring-2 focus:ring-primary text-black"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-primary text-white font-semibold rounded-md hover:opacity-90 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
