import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from './../util/request';
import ls from 'localstorage-slim';

const initialState = {
    posts:[],
    singlePost:[],
    addStatus:false,
    isLoading:false
}

export const getBlogPosts = createAsyncThunk('blogPost', async ()=>{
    try {
       const request = await axiosPrivate.get('/blog');
       return request.data;
    } catch (error) {
        return console.log(error);
    }
})
export const getSingleBlogPosts = createAsyncThunk('getsingleblogPost', async (id)=>{
    try {
       const request = await axiosPrivate.get(`/blog/${id}`);
       return request.data;
    } catch (error) {
        return console.log(error);
    }
})
export const addBlogPost = createAsyncThunk('addblogPost', async (payload)=>{
    try {
       const request = await axiosPrivate.post('/blog',payload);
       return request.data;
    } catch (error) {
        return console.log(error);
    }
})
export const editBlogPost = createAsyncThunk('editblogPost', async (payload)=>{
    try {
       const request = await axiosPrivate.put(`/blog/${id}`,payload);
       return request.data;
    } catch (error) {
        return console.log(error);
    }
})

export const blogSlice = createSlice({
    name:'Blog',
    initialState,
    reducers:{},
    extraReducers:{
        [getBlogPosts.pending]:(state)=>{
            state.isLoading = true;
        },
        [getBlogPosts.fulfilled]:(state,action)=>{
            console.log('from blogSlice: ',action.payload)
            state.posts = action.payload
            
        },
        [getBlogPosts.rejected]:(state,action)=>{
            state.isLoading = false;
        },
        [getSingleBlogPosts.pending]:(state)=>{
            state.isLoading = true;
        },
        [getSingleBlogPosts.fulfilled]:(state,action)=>{
            console.log('from blogSlice: ',action.payload)
            state.singlePost = action.payload
            
        },
        [getSingleBlogPosts.rejected]:(state,action)=>{
            state.isLoading = false;
        },
        [addBlogPost.pending]:(state)=>{
            state.isLoading = true;
        },
        [addBlogPost.fulfilled]:(state,action)=>{
            console.log('from blogSlice: ',action.payload)
            if(action.payload.status){
                state.addStatus= action.payload.status
            }else{
                state.addStatus= false
            }
        },
        [addBlogPost.rejected]:(state,action)=>{
            state.isLoading = false;
        },
    }
})

export const blogActions = blogSlice.actions

export default blogSlice.reducer