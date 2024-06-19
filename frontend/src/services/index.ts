import { AuthService } from "./auth.service";
import { BookService } from "./book.service";

export const authService = new AuthService(import.meta.env.VITE_DYNA_BASE_URL);

export const bookService = new BookService(
  import.meta.env.VITE_DYNA_BASE_URL + "/books",
);
