import InputField from "src/components/fields/InputField";
import { Link } from "react-router-dom";
import useAuth from "src/hooks/useAuth";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordFormSchema } from "src/types/form-schemas";

export default function ResetPassword() {
  const { resetUserPassword, loading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof ResetPasswordFormSchema>>({
    resolver: zodResolver(ResetPasswordFormSchema),
  });

  const onSubmit = async (data: z.infer<typeof ResetPasswordFormSchema>) => {
    await resetUserPassword(data);
  };

  return (
    <div className="flex h-[40rem] w-full items-center justify-center lg:items-center lg:justify-start sm-max-2:px-[15%] 2xl:px-[10%] 2xl:max-w-[1600px] lg:px-0 lg:h-full">
      {/* Sign in section */}
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="mt-[2vh] w-full flex flex-col items-center justify-center md:pl-4"
      >
        <h4 className="mb-2.5 text-lg font-bold text-navy-700 dark:text-white md:text-2xl lg:text-4xl text-center">
          Reset your password
        </h4>
        <p className="mb-6 ml-1 text-sm text-gray-600 text-center md:text-base">
          Enter your email or phone-number then we will send a confirmation
          message!
        </p>
        {/* Email */}
        <InputField
          variant="auth"
          extra="mb-3"
          label="Email*"
          placeholder="mail@simmmple.com"
          id="email"
          type="text"
          name="email"
          error={errors.password}
          register={register}
          disabled={loading}
        />
        <button className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
          send confirmation code
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
