// import { Axios } from "axios";
import axios from "axios";
import { useSelector } from "react-redux";
import ls from 'localstorage-slim';

const BASEURL = 'http://127.0.0.1:8000/api/';
const csrf = document.querySelector('meta[name="csrf-token"]').content;

console.log(csrf);
// instance.defaults.headers.common['X-CSRF-TOKEN'] = window.csrf_token
export const instance = axios.create({
    baseURL: BASEURL,
    timeout: 10000,
    headers: {
        'Accept':'application/json',
        'Content-Type':'application/json',
        // 'X-CSRF-TOKEN': window.csrf_token
    }
    // withCredentials:true
});

export const axiosPrivate = axios.create({
    baseURL: BASEURL,
    timeout: 10000,
    headers: {
        'Accept':'application/json',
        'Content-Type':'application/json',
    }
    // withCredentials:true
})


axiosPrivate.interceptors.request.use(function (config) {
    // Do something before request is sent
      const auth = ls.get('token')

      console.log(auth.isloggedin);
      // Do something before request is sent
      //check if 
      if(auth.isloggedin){
        config.headers.Authorization =  'Bearer '+auth.token;
      }
      return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });