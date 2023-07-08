import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  video : null,
}

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setVideoData : (state, action) => {
      state.video = action.payload
    },
    likeVideo : (state, action) => {
      const {dislikes, likes} = state.video;
      // check if the user has already liked
      if (likes.includes(action.payload)) return;
      likes.push(action.payload);

      // remove user from dislikes if he already disliked
      if (dislikes.includes(action.payload)) {
        dislikes.splice(dislikes.findIndex(userId => userId === action.payload), 1);
      }
    },
    dislikeVideo : (state, action) => {
      const {dislikes, likes} = state.video;
      // check if the user has already disliked
      if (dislikes.includes(action.payload)) return;
      dislikes.push(action.payload)

      // remove user from likes if he already liked
      if (likes.includes(action.payload)) {
        likes.splice(likes.findIndex(userId => userId === action.payload), 1);
      }
    },
   
  }
})

export const {setVideoData, likeVideo, dislikeVideo} = videoSlice.actions;

export default videoSlice.reducer