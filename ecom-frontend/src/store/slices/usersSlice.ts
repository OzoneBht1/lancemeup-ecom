import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IUser } from "../../types/types";

interface UserState {
  user: IUser | null;
}

// const localUser = localStorage.getItem("user");

const initialState: UserState = {
  user: null,
};

export const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, logout } = usersSlice.actions;

export default usersSlice.reducer;
