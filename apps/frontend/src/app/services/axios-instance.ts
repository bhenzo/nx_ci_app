import axios from 'axios';
import { NavigateFunction, Navigation } from 'react-router-dom';

let navigate: NavigateFunction;
let token: string | null = window.localStorage.getItem('token');
const instance = axios.create({
  baseURL: '/api/',
  headers: {
    //  Authorization: `<Your Auth Token>`,
    'Content-Type': 'application/json',
    timeout: 3000,
  },
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log('ERROR!', error);
    if (error?.response?.status === 401) {
      window.localStorage.removeItem('token');
      token = null;
      navigate?.('/login');
    }
    return Promise.reject(error);
  }
);
instance.interceptors.request.use(
  function (response) {
    if (token) {
      response.headers['Authorization'] = `Bearer ${token}`;
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
const setNavigation = (nav: NavigateFunction) => (navigate = nav);
const setToken = (t: string) => {
  window.localStorage.setItem('token', t);
  token = t;
};
const refreshToken = async () => {
  if (token) {
    try {
      const resp = await instance.get<void, { data: { access_token: string } }>(
        '/auth/refresh'
      );
      token = resp.data.access_token;
      window.localStorage.setItem('token', token);
    } catch (err) {
      window.localStorage.removeItem('token');
      token = null;
      navigate?.('/login');
    }
  }
};
setInterval(() => {
  refreshToken();
}, 8000);
refreshToken();
//axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
export { instance, setNavigation, setToken };
