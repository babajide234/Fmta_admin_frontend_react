// import { createStore } from 'redux'

import { configureStore } from '@reduxjs/toolkit'
import sidbarSlice from './app/sidbarSlice';
import authSlice from './app/authSlice';
import blogSlice from './app/blogSlice';

export default configureStore({
    reducer: {
        sidebar:sidbarSlice,
        auth:authSlice,
        blog:blogSlice
    },
});
