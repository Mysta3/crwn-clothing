import { createSelector } from "reselect";
import { UserState } from "./user.reducer";

export const selecUserReducer = (state): UserState => state.user;

export const selectCurrentUser = createSelector(
  selecUserReducer,
    (user) => user.currentUser
);