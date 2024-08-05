import axios from "axios";

const API_URL = "http://localhost:5000/api/articles";

const getConfig = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const createArticle = async (articleData) => {
  const response = await axios.post(API_URL, articleData, getConfig());
  return response.data;
};

export const getArticles = async (user) => {
  const config = {
    ...getConfig(),
    params: user,
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

export const getArticleById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`, getConfig());
  return response.data;
};

export const updateArticle = async (id, articleData) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    articleData,
    getConfig()
  );
  return response.data;
};

export const deleteArticle = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, getConfig());
  return response.data;
};
