import InputField from "src/components/fields/InputField";
import Checkbox from "src/components/checkbox";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoginFormSchema } from "src/types/form-schemas";
import useAuth from "src/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SignIn() {
  const { loginUser, loading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
  });

  const onSubmit = async (data: z.infer<typeof LoginFormSchema>) => {
    await loginUser(data);
  };

  return (
    <div className="flex h-[40rem] w-full items-center justify-center lg:items-center lg:justify-start sm-max-2:px-[15%] 2xl:px-[10%] 2xl:max-w-[1600px] lg:px-0 lg:h-full">
      {/* Sign in section */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="w-full flex flex-col items-center md:pl-4"
      >
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Sign In
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Enter your email and password to sign in!
        </p>

        {/* Email */}
        <InputField
          variant="auth"
          extra="mb-3"
          label="Email*"
          placeholder="mail@simmmple.com"
          id="email"
          name="email"
          type="text"
          error={errors.email}
          register={register}
          disabled={loading}
        />

        {/* Password */}
        <InputField
          variant="auth"
          extra="mb-3"
          label="Password*"
          placeholder="Min. 8 characters"
          id="password"
          type="password"
          name="password"
          error={errors.password}
          register={register}
          disabled={loading}
        />
        {/* Checkbox */}
        <div className="w-full mb-4 flex items-center justify-between px-2">
          <div className="flex items-center">
            <Checkbox />
            <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
              Keep me logged In
            </p>
          </div>
          <Link
            to={"/auth/reset-password"}
            className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
          >
            Forgot Password?
          </Link>
        </div>
        <button
          disabled={loading}
          className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200 disabled:bg-brand-200"
        >
          {loading ? "Signing in, please wait..." : "Sign In"}
        </button>
        <div className="mt-4">
          <span className=" text-sm font-medium text-navy-700 dark:text-gray-600">
            Not registered yet?
          </span>
          <Link
            to={"/auth/register"}
            className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
          >
            Create an account
          </Link>
        </div>
      </form>
    </div>
  );
}
