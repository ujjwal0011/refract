import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState([]);
  const [groupedCharacters, setGroupedCharacters] = useState({});

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/me`, {
        withCredentials: true,
      });
      setUser(response.data);
      await fetchCharacters();
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchCharacters = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/review/characters`, {
        withCredentials: true,
      });
      setCharacters(response.data.characters);
      setGroupedCharacters(response.data.grouped);
    } catch (error) {
      console.error("Failed to fetch characters:", error);
    }
  };

  const login = () => {
    document.location.href = `${API_URL}/auth/google?prompt=select_account`;
  };

  const logout = async () => {
    try {
      await axios.get(`${API_URL}/auth/logout`, {
        withCredentials: true,
      });
      setUser(null);
      setCharacters([]);
      setGroupedCharacters({});
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const value = {
    user,
    loading,
    characters,
    groupedCharacters,
    login,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
