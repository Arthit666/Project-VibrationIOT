import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name:"user",
  initialState:{
    id:"",
    token:"",
    username:"",
    company:"",
    role:"",
    pic:""
  },
  reducers: { 
    login: (state,action)=>{
      state.id = action.payload.id;
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.company = action.payload.company;
      state.role = action.payload.role;
      state.pic = action.payload.pic;
    },
    logout: (state)=>{
      state.id = "";
      state.token = "";
      state.username = "";
      state.company = "";
      state.role = "";
      state.pic = "";
    },
    update: (state,action)=>{
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.company = action.payload.company;
      state.role = action.payload.role;
      state.pic = action.payload.pic;
    },
  }
});

export const { login ,logout, update } = userSlice.actions;
export default userSlice.reducer;