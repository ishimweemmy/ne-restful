import axios, { AxiosInstance } from "axios";
import {
  LoginFormSchema,
  RegisterFormSchema,
} from "src/types/form-schemas";
import { z } from "zod";

export class AuthService {
  protected instance: AxiosInstance;
  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "Request timed out!",
    });
  }

  registerStudent = async (
    data: Omit<z.infer<typeof RegisterFormSchema>, "confirmPassword">,
  ) => {
    const {
      firstName,
      lastName,
      email,
      password,
    } = data;

    return await this.instance.post("/students/register", {
      firstName,
      lastName,
      password,
      email,
    });
  };

  loginStudent = async (data: z.infer<typeof LoginFormSchema>) => {
    return await this.instance.post("/students/login", data);
  };
}
