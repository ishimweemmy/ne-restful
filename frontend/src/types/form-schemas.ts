import { z } from "zod";

const passwordValidationSchema = z
  .string()
  .refine((value) => /(?=.*?[A-Z])/.test(value), {
    message: "password must have atleast one upper case letter",
  })
  .refine((value) => /(?=.*?[a-z])/.test(value), {
    message: "password must have atleast one lower case letter",
  })
  .refine((value) => /(?=.*?[0-9])/.test(value), {
    message: "password must have atleast one digit",
  })
  .refine((value) => /(?=.*?[#?!@$%^&*-])/.test(value), {
    message: "password must have one special character",
  })
  .refine((value) => /.{8,}/.test(value), {
    message: "password should be greater or equal to 8 character",
  });

const RegisterFormSchema = z
  .object({
    firstName: z
      .string()
      .min(3, { message: "first name can't be too short" })
      .max(20, { message: "first name can't be too long" }),
    lastName: z
      .string()
      .min(3, { message: "last name can't be too short" })
      .max(20, { message: "first name can't be too long" }),
    email: z
      .string()
      .email({ message: "Invalid email, please input valid email" }),
    password: passwordValidationSchema,
    confirmPassword: passwordValidationSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const LoginFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email, please input valid email" }),
  password: z.string().min(1, { message: "password can't be empty" }),
});

const BookFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Book name can't go below 3 characters" })
    .max(100, { message: "Book name can't exceed 100 characters" }),
  author: z
    .string()
    .min(3, "Book Author can't go below 3 characters"),
  publisher: z
    .string()
    .min(3, "Book publisher can't go below 3 characters"),
  publicationYear: z
    .string()
    .min(3, "Book publication year can't go below 3 characters"),
  subject: z
    .string()
    .min(3, "Book subject can't go below 3 characters"),
});

const SelectPageSchema = z.object({
  booksPerPage: z.number(),
})

export {
  RegisterFormSchema,
  LoginFormSchema,
  BookFormSchema,
  SelectPageSchema
};
