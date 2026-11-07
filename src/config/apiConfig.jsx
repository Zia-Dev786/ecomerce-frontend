import axios from "axios";


const apiConfig=  axios.create({
    baseURL:"http://localhost:3000/api",
    timeout:10000,
     headers: {
    // 'Content-Type': 'application/json',
  },
})


// 2. Request Interceptor: Runs before every request is sent
apiConfig.interceptors.request.use(
  (config) => {
    // Retrieve your token (e.g., from localStorage or a state manager)
    const token = localStorage.getItem('token');
    
    // If the token exists, inject it into the Authorization header
    if (token) {
      config.headers.Authorization = `${token}`;
    }

  
    return config;
  },
  (error) => {
    // Handle request errors globally here
    return Promise.reject(error);
  }
);

export default apiConfig