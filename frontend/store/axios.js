import axios from 'axios';
import Router from 'next/router';
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // Fetch your token from where you store it (e.g., localStorage)
    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
    }
    return config;
  },
  (error) => {    
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  response => {
    return response;
  },
  (error) => {
    // Check if it's a 401 error. You might also want to check or 
    // handle other statuses, like 403, depending on the requirements.
    if (error.response && error.response.status === 401) {
      // Redirect to login
      Router.push('/login');
    }    
    return Promise.reject(error);
  }
);
export default instance;
