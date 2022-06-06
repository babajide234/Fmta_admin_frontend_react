import React, { useEffect } from 'react'
import {  Navigate, Route, Routes } from 'react-router-dom'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
import DefaultLayout from './layout/DefaultLayout.jsx';

// Pages
import Login from './views/pages/login/Login.jsx';
import Register from './views/pages/register/Register.jsx';
import Page404 from './views/pages/page404/Page404.jsx';
import Page500 from './views/pages/page500/Page500.jsx';
import ProtectedRoutes from './prtectedoutes';
import { useSelector, useDispatch } from 'react-redux';
import {refresh} from './app/authSlice';
import ls from 'localstorage-slim'

function App(){
  const { isLoggedin } = useSelector((state)=> state.auth)
  ls.config.encrypt = true;
  
  const dispatch = useDispatch();

  useEffect(()=>{
    if(ls.get('token') !== null){

      const data = ls.get('token');
      
      console.log(data.isloggedin);
      
      if(data.isloggedin){
        dispatch(refresh());
      };
    }

    if(isLoggedin){
      console.log(isLoggedin);
      <Navigate to='/dashboard'/>
    }
  },[isLoggedin])
    return (
          <Routes>
            <Route path="/login" name="Login Page" element={<Login />} />
            <Route path="/register" name="Register Page" element={<Register />} />
            <Route path="/404" name="Page 404" element={<Page404 />} />
            <Route path="/500" name="Page 500" element={<Page500 />} />
            <Route element={<ProtectedRoutes/>}>
                <Route path="*" name="Home" element={<DefaultLayout />} />
            </Route>
          </Routes>
    )
}

export default App
