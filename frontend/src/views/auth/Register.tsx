import InputField from "src/components/fields/InputField";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RegisterFormSchema } from "src/types/form-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuth from "src/hooks/useAuth";

const Register = () => {
  const { registerUser, loading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
  });

  const onSubmit = async (data: z.infer<typeof RegisterFormSchema>) => {
    await registerUser(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col items-center justify-center sm-max-2:px-[15%] lg:px-5 2xl:px-[10%] 2xl:max-w-[1600px]"
    >
      <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
        Register
      </h4>
      <p className="mb-9 ml-1 text-base text-gray-600">
        Enter your credentials to register!
      </p>
      {/* Email */}
      <InputField
        variant="auth"
        extra="mb-3"
        label="Email*"
        placeholder="emmy@book-haven.com"
        id="email"
        name="email"
        type="text"
        error={errors.email}
        register={register}
        disabled={loading}
      />

      {/* full name */}
        <InputField
          variant="auth"
          extra="mb-3"
          label="First name*"
          placeholder="ishimwe"
          id="firstName"
          name="firstName"
          type="text"
          error={errors.firstName}
          register={register}
          disabled={loading}
        />

        <InputField
          variant="auth"
          extra="mb-3"
          label="Last name*"
          placeholder="emmy"
          id="lastName"
          name="lastName"
          type="text"
          error={errors.lastName}
          register={register}
          disabled={loading}
        />

        {/* Password */}
        <InputField
          variant="auth"
          extra="w-full"
          label="Password*"
          placeholder="Min. 8 characters"
          id="password"
          name="password"
          type="password"
          error={errors.password}
          register={register}
          disabled={loading}
        />

        {/* Confirm Password */}
        <InputField
          variant="auth"
          extra="w-full"
          label="Re-enter Password*"
          placeholder="Min. 8 characters"
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          error={errors.confirmPassword}
          register={register}
          disabled={loading}
        />

      <button
        disabled={loading}
        className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200 disabled:bg-brand-200 disabled:text-gray-500"
      >
        {loading ? "Registering, please wait..." : "Register"}
      </button>
      <div className="w-full flex justify-between mt-4">
        <span className=" text-sm font-medium text-navy-700 dark:text-gray-600">
          Already have an account?
        </span>
        <Link
          to={"/auth/sign-in"}
          className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
        >
          Sign in to your account
        </Link>
      </div>
    </form>
  );
};

export default Register;
