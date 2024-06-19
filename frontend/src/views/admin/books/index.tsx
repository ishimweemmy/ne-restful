/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useBooks from "@/hooks/useBooks";
import { useAppSelector } from "@/app/hooks";
import { CustomPagination } from "@/components/data-pagination";
import BooksTable from "../tables/components/BooksTable";

const Books = () => {  
  const { books, getBooks } = useBooks();  
  const { limit, currentPage, totalItems, totalPages} = useAppSelector(state =>state.books)

  useEffect(() => {
    getBooks({page: currentPage, limit}, {});
  }, [currentPage, limit]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-8 mt-5">

      <BooksTable tableData={books} />
      <CustomPagination data={books} page="books" selectedPage={currentPage} totalItems={totalItems} totalPages={totalPages} />
    </div>
  );
};

export default Books;

