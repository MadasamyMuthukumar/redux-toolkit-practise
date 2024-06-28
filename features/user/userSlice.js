const createSlice = require('@reduxjs/toolkit').createSlice
const createAsyncThunk = require('@reduxjs/toolkit').createAsyncThunk
const axios = require('axios')


const initialState={
    loading:false,
    users:[],
    error:''
}
//create asyncThunk outside the createSLice to make async calls
/**
 * first arg is action name
 * second arg is a callback fn which creates a payload
 */
const fetchUsers=createAsyncThunk('user/fetchUsers',()=>{
  return axios.get('https://jsonplaceholder.typicode.com/users').then(res=>res.data.map(user=>user.id)) 
  /**
   * we dont need catch block as errror was handled
   *  thunk will automatically dispatch lifecycle actions(pending,fullfield,rejected) based on retured promise
   *
   * to handle those actions we need to create extra reducer */ 
})

const userSlice=createSlice({
    name:'user',
    initialState,
    extraReducers:(builder)=>{
        //add cases for each of the promise lifecycle method
        builder.addCase(fetchUsers.pending,state=>{
            state.loading=true;
        });
        builder.addCase(fetchUsers.fulfilled, (state,action)=>{
            state.loading=false,
            state.users=action.payload,
            state.error=''
        });

        builder.addCase(fetchUsers.rejected, (state,action)=>{
            state.loading=false,
            state.users=[],
            state.error=action.error.message
        })


    }
})

module.exports = userSlice.reducer
module.exports.fetchUsers = fetchUsers