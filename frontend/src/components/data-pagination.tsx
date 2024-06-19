/* eslint-disable @typescript-eslint/no-unused-vars */
import Pagination from "@mui/material/Pagination";
import { PaginationItem } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setBooks } from "@/features/books/bookSlice";
import Select, { SingleValue } from 'react-select'
import { cn } from "@/lib/utils";

interface CustomPaginationProps<TData> {
    data: TData[];
    page: string;
    selectedPage: number;
    totalPages: number;
    totalItems: number;
}

export function CustomPagination<TData>({
    data,
    page,
    selectedPage,
    totalPages,
    totalItems,
}: CustomPaginationProps<TData>) {
    const [goTo, setGoTo] = useState(1);
    const dispatch = useAppDispatch();
    const books = useAppSelector(state => state.books)

    const customStyles = {
        control: (baseStyles: any, state: any) => ({
            ...baseStyles,
            padding: "0rem 1rem",
            borderRadius: ".75rem",
            border: "2px solid #cbd5e0",
            ":hover": {
                border: "2px solid #cbd5e0 !important",
                boxShadow: "none",
            },
            ":focus": {
                border: "2px solid #cbd5e0 !important",
                boxShadow: "none",
            },
            ":focus-within": {
                border: "2px solid #cbd5e0 !important",
                boxShadow: "none",
            },
            ":focus-visible": {
                border: "2px solid #cbd5e0 !important",
                boxShadow: "none",
            },
        }),
        option: (styles: any, { isSelected, isFocused }: any) => ({
            ...styles,
            backgroundColor: isSelected || isFocused ? "pink" : "",
        }),
    };

    const options = [
        { value: 2, label: "2" },
        { value: 4, label: "4" },
        { value: 6, label: "6" },
        { value: 8, label: "8" },
        { value: 10, label: "10" }
    ];

    const handleChange = (selectedOption: SingleValue<{ value: number; label: string; }>) => {
        console.log(selectedOption)
        dispatch(setBooks({ ...books, limit: selectedOption!.value }))
    };

    return (
        <div className="flex items-center justify-between w-full px-2">
            <span className="whitespace-nowrap">
                {data.length} of {totalItems} {page}
            </span>
            <Pagination
                count={totalPages}
                defaultPage={selectedPage}
                siblingCount={0}
                boundaryCount={2}
                sx={{
                    "& .Mui-selected, .MuiPaginationItem-root .MuiPaginationItem-text": {
                        background:
                            "#ff0080",
                        color: "white",
                    },
                    "& .MuiPaginationItem-root svg": {
                        color: "#ff0080",
                    },
                }}
                renderItem={(item) => {
                    return (
                        <button
                            className={`${item.disabled && "pointer-events-none"}`}
                            aria-disabled={item.disabled}
                            tabIndex={item.disabled ? -1 : undefined}
                            onClick={() => {
                                dispatch(setBooks({ ...books, currentPage: item.page as number }))
                            }}
                        >
                            <PaginationItem {...item} />
                        </button>
                    );
                }}
            />
            <div className="flex items-center justify-center gap-4">
                <span className="whitespace-nowrap">
                    books per page
                </span>
                <Select
                    styles={customStyles}
                    onChange={handleChange}
                    options={options}
                    isMulti={false}
                    name="app-select"
                    aria-label="Number Selector"
                    defaultValue={options[0]}
                />
            </div>
            <div className="flex items-center justify-center gap-4">
                <span className="whitespace-nowrap">Go to</span>
                <input type="text" typeof="number" name="page" id="page" value={goTo} onChange={e => setGoTo(Number(e.target.value))} className="h-8 text-center border border-brandLinear w-14 ring-0 outline-0 focus-visible:ring-0 focus-visible:ring-offset-0" />
                <button
                    className={`bg-brand-500 rounded-full w-20 h-10 text-white`}
                    onClick={() => {
                        // dispatch(setBooks({ ...books, currentPage: goTo }))
                        dispatch(setBooks({...books, currentPage: goTo }))
                    }}
                    disabled={!goTo}
                >
                    Go
                </button>
            </div>
        </div>
    );
}