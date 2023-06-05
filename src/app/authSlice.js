import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from './../util/request';
import ls from 'localstorage-slim';

const initialState = {
    token:'',
    isLoggedin:false,
    isLoading:false
}
export const login = createAsyncThunk('login',async (payload)=>{
    try {
       const request = await instance.post('/login',payload)
       return request;
    } catch (error) {
        return console.log(error);
    }
})

export const authSlice = createSlice({
    name:'Auth',
    initialState,
    reducers:{
        refresh:(state)=>{
            if(ls.get('token').isloggedin){
                state.token = ls.get('token').token
                state.isLoggedin = true
            }
        },
        logout:(state)=>{
            ls.clear();
            state.token ='';
            state.isLoggedin = false
        }
    },
    extraReducers:{
        [login.pending]:(state)=>{
            state.isLoading = true;
        },
        [login.fulfilled]:(state,action)=>{
            console.log('from authslice: ',action.payload.data.token)
            state.token = action.payload.data.token
            state.isLoggedin = true
            ls.set('token',{
                isloggedin:state.isLoggedin,
                token:action.payload.data.token
            })
        },
        [login.rejected]:(state,action)=>{
            state.isLoading = false;
        },
    }
})

export const {refresh, logout} = authSlice.actions

export default authSlice.reducer