import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};

export const updateRole = async (userId, newRole) => {
  const response = await axios.put(`${API_URL}/update-role`, {
    userId,
    newRole,
  });
  return response.data;
};

export const getUser = async (token) => {
  const response = await axios.get(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.user;
};
