import { createSlice } from "@reduxjs/toolkit";

import datas from "../data.json";

const finalDatas = localStorage.getItem("profileLists");

const initialList = finalDatas?.length > 0 ? JSON.parse(finalDatas) : datas;

const initialState = {
  profileLists: initialList,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    addProfile: (state, action) => {
      state.profileLists.push(action.payload);
    },
    updateProfile: (state, action) => {
      const { id, name } = action.payload;
      const profileToUpdate = state.profileLists.find((item) => item.id === id);

      if (profileToUpdate) {
        profileToUpdate.name = name;
      }
    },
    removeProfile: (state, action) => {
      state.profileLists = state.profileLists.filter(
        (item) => item.id !== action.payload
      );
    },
    orderProfile: (state, action) => {
      state.profileLists = action.payload;
    },
  },
});

export const { addProfile, updateProfile, removeProfile, orderProfile } =
  profileSlice.actions;
export default profileSlice.reducer;
