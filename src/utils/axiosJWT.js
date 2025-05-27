  import axios from 'axios';
  import jwtDecode from 'jwt-decode';

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(async (config) => {
    const currentDate = new Date();
    if (expire * 1000 < currentDate.getTime()) {
      const response = await axios.get('http://localhost:5000/auth/refresh');
      config.headers.Authorization = `Bearer ${response.data.accessToken}`;
      const accessToken = response.data.accessToken;
      const decoded = jwtDecode(accessToken);
      setToken(accessToken);
      setExpire(decoded.exp);
      setName(decoded.name);
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  export default axiosJWT;