/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: TUser = {
  id: undefined,
  email: "",
  firstName: "",
  lastName: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser>) => {
      console.log(action)
      const { payload } = action;
      state.id = payload.id;
      state.email = payload.email;
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
    },
    logoutUser: (state, _action: PayloadAction<TUser>) => {
      state.id = undefined
      state.email = "";
      state.firstName = "";
      state.lastName = "";
    },
  },
});

export const { logoutUser, setUser } = userSlice.actions;
export default userSlice.reducer;
