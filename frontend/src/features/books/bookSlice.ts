import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  data: TBook[],
  totalPages: number,
  currentPage: number,
  totalItems: number,
  limit: number,
}

const initialState: InitialState = {
  data: [],
  totalPages: 0,
  currentPage: 1,
  totalItems: 0,
  limit: 3,
}

export const BookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBooks: (state, action: PayloadAction<InitialState>) => {
      return {...state, ...action.payload};
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    addBook: (state, action: PayloadAction<TBook>) => {
      return state;
    },
    removeBook: (state, action: PayloadAction<string>) => {
      return { ...state, ...[...state.data].filter((Book) => Book.id !== action.payload) };
    },
  },
});

export const { addBook, removeBook, setBooks } =
  BookSlice.actions;
export default BookSlice.reducer;
