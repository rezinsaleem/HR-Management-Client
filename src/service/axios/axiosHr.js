/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { store } from '../redux/store';
import { hrLogout } from '../redux/slices/hrSlice';


const isTokenExpired = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp !== undefined ? decodedToken.exp < currentTime : true;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true; 
  }
};

export const axiosHr = () => {
  const axiosInstance = axios.create({
    baseURL: `https://hr-management-server-5cqc.onrender.com/api`,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('hrToken');
      if (token) {
        if (isTokenExpired(token)) {
          console.log('Token has expired');
          store.dispatch(hrLogout()); 
        } else {
          console.log('Token is still valid');
        }
      } else {
        console.log('No token found');
      }
      return {
        ...config,
        headers: {
          ...(token !== null && { Authorization: `Bearer ${token}` }),
          ...config.headers,
        },
      };
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};