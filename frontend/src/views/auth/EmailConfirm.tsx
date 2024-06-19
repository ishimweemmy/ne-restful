import { Link } from "react-router-dom";

const EmailConfirm = () => {
  return (
    <div className="flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start xl:w-1/2 mt-[12rem]">
      <div className="mt-[2vh] w-full flex flex-col items-center md:pl-4">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          You're almost there...
        </h4>
        <p className="mb-6 ml-1 text-base text-gray-600">
          Enter your email or phone-number then we will send a confirmation
          message!
        </p>
        {/* <InputField
          variant="auth"
          extra="mb-3"
          label="phone number"
          placeholder="+250 789....0"
          id="email"
          type="text"
        />
        <div className="w-[90%] mb-6 flex items-center gap-3">
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
          <p className="text-base text-gray-600 dark:text-white"> or </p>
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
        </div> */}
        {/* Email */}
        {/* <InputField
          variant="auth"
          extra="mb-3"
          label="Email*"
          placeholder="mail@simmmple.com"
          id="email"
          type="text"
        /> */}
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
      </div>
    </div>
  );
};

export default EmailConfirm;
