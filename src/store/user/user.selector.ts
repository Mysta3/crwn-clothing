import { createSelector } from "reselect";
import { UserState } from "./user.reducer";
import { RootState } from "../store";

export const selecUserReducer = (state: RootState): UserState => state.user;

export const selectCurrentUser = createSelector(
  selecUserReducer,
    (user) => user.currentUser
);