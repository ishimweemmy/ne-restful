import { getAuthorizationHeader } from "@/lib/utils";
import { BookFormSchema } from "@/types/form-schemas";
import axios, { AxiosInstance } from "axios";
import { z } from "zod";

export class BookService {
    protected instance: AxiosInstance;
    public constructor(url: string) {
        this.instance = axios.create({
            baseURL: url,
            timeout: 30000,
            timeoutErrorMessage: "Request timed out!",
        });
    }

    getBooks = async ({ limit = 10, page = 1 }: TParams, options?: Record<string, boolean>) => {
        const params = {
            page,
            limit,
            ...options,
        };

        Object.keys(params).forEach((key) =>
            params[key as keyof TParams] === undefined
                ? delete params[key as keyof TParams]
                : {}
        );

        return await this.instance.get("/", {
            headers: getAuthorizationHeader(),
            params
        });
    };

    createBook = async (data: z.infer<typeof BookFormSchema>) => {
        return await this.instance.post("/create", data, {
            headers: getAuthorizationHeader(),
        });
    };

    updateBook = async (
        data: z.infer<typeof BookFormSchema>,
        id: string,
    ) => {
        return await this.instance.put(`/update/${id}`, data, {
            headers: getAuthorizationHeader(),
        });
    };

    removeBook = async (id: string) => {
        return await this.instance.delete(`/delete/${id}`, {
            headers: getAuthorizationHeader(),
        });
    };
}
