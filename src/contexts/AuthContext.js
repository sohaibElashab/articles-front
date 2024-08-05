import React, { createContext, useState, useEffect } from "react";
import { getUser, login, register, updateRole } from "../api/auth";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const fetchUser = async () => {
    if (token) {
      try {
        const fetchedUser = await getUser(token);
        setUser(fetchedUser);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
      }
    }
  };

  const handleRegister = async (userData) => {
    const { user, token } = await register(userData);
    setToken(token);
    setUser(user);
    localStorage.setItem("token", token);
  };

  const handleLogin = async (userData) => {
    const { user, token } = await login(userData);
    setToken(token);
    setUser(user);
    localStorage.setItem("token", token);
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  const toggleRole = async (newRole) => {
    try {
      await updateRole(user._id, newRole);
      setUser((prevUser) => ({ ...prevUser, role: newRole }));
    } catch (error) {
      console.error("Failed to update role:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        handleRegister,
        fetchUser,
        handleLogin,
        handleLogout,
        toggleRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
