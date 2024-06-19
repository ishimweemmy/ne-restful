import { useAppDispatch, useAppSelector } from "@/app/hooks";
import useLoading from "./useLoading";
import { bookService } from "@/services";
import { setBooks } from "@/features/books/bookSlice";

const useBooks = () => {

  const { loading, withLoading } = useLoading();
  const books = useAppSelector((state) => state.books.data);
  const dispatch = useAppDispatch();

  const getBooks = (options: {limit: number, page: number}, searchOptions: {name?: string, author?: string, publisher?: string, publicationYear?: string, subject?: string}) => {
    const { limit, page} = options
    const { author, name, publicationYear, publisher,subject } = searchOptions as any
    withLoading(async () => {
      const response = await bookService.getBooks({ limit, page }, { name, author, publisher, publicationYear, subject });

      if (response.status == 200) {
        dispatch(setBooks(response.data));
      }
    });
  };

  return {
    books,
    loading,
    getBooks,
  };
};

export default useBooks;
