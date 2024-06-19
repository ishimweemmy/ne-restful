import React from "react";
import CardMenu from "src/components/card/CardMenu";
import Card from "src/components/card";
import { CgUnavailable } from "react-icons/cg";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import axios from "axios";
import { getAuthorizationHeader } from "@/lib/utils";
import { useAppSelector } from "@/app/hooks";
import useLoading from "@/hooks/useLoading";
import { toast } from "react-toastify";

const columnHelper = createColumnHelper<TBook>();

export default function BooksTable(props: { tableData: any }) {
  const { tableData } = props;
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const student = useAppSelector(state => state.user)
  const {loading, withLoading}= useLoading()
  const columns = [
    columnHelper.accessor("id", {
      id: "id",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">ID</p>
      ),
      cell: (info) => {
        return (
          <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
        )
    }}),
    columnHelper.accessor("name", {
      id: "name",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          BOOK NAME
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("author", {
      id: "author",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          AUTHOR NAME
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("publisher", {
      id: "publisher",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">PUBLISHER</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("publicationYear", {
      id: "publicationYear",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          PUBLICATION YEAR
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("subject", {
      id: "SUBJECT",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          SUBJECT
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("id", {
      id: "Action",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          ACTIONS
        </p>
      ),
      cell: (info) => (
        <button className="flex items-center justify-center w-2/3 p-2 text-center text-white rounded-md bg-brand-500"
        disabled={loading}
        onClick={() => {
          withLoading(async () => {
            const response = await axios.post(`${import.meta.env.VITE_DYNA_BASE_URL}/borrow`, {
              "studentId": student.id,
              "bookId": info.getValue()
            }, {headers: getAuthorizationHeader()})
            
            if(response.status === 201) {
              toast.success("Borrowed book successfully")
            }
          })
          
        }}
        >Borrow</button>
      ),
    }),
  ]; // eslint-disable-next-line
  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });
  return (
    <Card extra={"w-full h-full px-6 pb-6 sm:overflow-x-auto"}>
      <div className="relative flex items-center justify-between pt-4">
        <div className="flex flex-col text-xl font-bold text-navy-700 dark:text-white">
          <span className="text-sm font-normal text-gray-700">
            View all the books
          </span>
        </div>
        <CardMenu />
      </div>

      <div className="mt-4 overflow-x-scroll xl:overflow-x-hidden">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="!border-px !border-gray-400">
                {headerGroup.headers
                  .filter((header) => header.id != "currency")
                  .map((header) => {
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        onClick={header.column.getToggleSortingHandler()}
                        className="cursor-pointer border-b-[1px] border-gray-200 pt-4 pb-2 pr-4 text-start"
                      >
                        <div className="items-center justify-between text-xs text-gray-200">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {{
                            asc: "",
                            desc: "",
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      </th>
                    );
                  })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id}>
                  {row
                    .getVisibleCells()
                    .filter((cell) => cell.column.id != "currency")
                    .map((cell) => {
                      return (
                        <td
                          key={cell.id}
                          className="min-w-[150px] border-white/0 py-3  pr-4"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </td>
                      );
                    })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {
        tableData.length === 0 && (
          <div className="flex items-center justify-center h-full my-8 text-slate-700">
            <CgUnavailable />
            <p className="text-sm font-bold dark:text-white">
              No books found
            </p>
          </div>
        )
      }
    </Card>
  );
}
