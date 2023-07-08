import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode : true,
  navOpen : false,
}

export const appSlice = createSlice({
  name : "app",
  initialState,
  reducers : {
    toggleMode : (state) => {
      state.darkMode = !state.darkMode
    },
    mode : (state, action) => {
      state.darkMode = action.payload
    },
    openNav : (state) => {
      state.navOpen = true
    },
    closeNav : (state) => {
      state.navOpen = false;
    }
  }
})

export const {toggleMode, mode, openNav, closeNav} = appSlice.actions

export default appSlice.reducer
