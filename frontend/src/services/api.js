import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Helper function for file uploads
api.upload = async (url, formData, onUploadProgress) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return axios({
    method: "post",
    url: `${
      import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"
    }${url}`,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${user?.token}`,
    },
    onUploadProgress,
  });
};

export default api;
