import React from 'react'
import { Outlet } from 'react-router-dom';
import Login from './views/pages/login/Login';
import { useSelector } from 'react-redux';
import ls from 'localstorage-slim';

const useAuth = () => {
    const {isLoggedin} = useSelector((state)=> state.auth)
    console.log(isLoggedin)
    const user = {
        isLoggedin
    }
    return user && user.isLoggedin;
}
const ProtectedRoutes = () => {
    const isAuth = useAuth();
    return  isAuth ? <Outlet/> : <Login/>
}

export default ProtectedRoutes