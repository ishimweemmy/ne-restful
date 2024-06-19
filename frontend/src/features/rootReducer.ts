import { combineReducers } from "redux";
import userReducer from "./user/userSlice";
import booksReducer from "./books/bookSlice";

export const rootReducer = combineReducers({
  user: userReducer,
  books: booksReducer,
});
