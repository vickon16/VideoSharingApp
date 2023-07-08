import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user : null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser : (state, action) => {
      state.user = action.payload
    },
    logoutUser : (state) => {
      state.user = null;
    },
    subscribeToChannel : (state, action) => {
      const {subscribedUsers} = state.user
      // current user subscribersList shouldn't include the current User
      if (subscribedUsers.includes(action.payload)) return;

      subscribedUsers.push(action.payload);
    },
    unSubscribeToChannel : (state, action) => {
      const {subscribedUsers} = state.user
      // current user subscribersList should include the current User
      if (!subscribedUsers.includes(action.payload)) return;

      subscribedUsers.splice(subscribedUsers.findIndex(userId => userId === action.payload), 1);
    },
  },
})

export const {loginUser, logoutUser,subscribeToChannel, unSubscribeToChannel} = userSlice.actions;

export default userSlice.reducer

