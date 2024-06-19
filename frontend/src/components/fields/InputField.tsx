import { FC } from "react";
import { cn } from "src/lib/utils";

const InputField: FC<TInputField> = ({
  id,
  label,
  name,
  placeholder,
  register,
  variant,
  disabled,
  error,
  extra,
  inputStyles,
  state,
  type,
  value,
}) => {
  return (
    <div className={`w-full ${extra}`}>
      {label && (
        <label
          htmlFor={id}
          className={cn(
            `text-sm text-navy-700 dark:text-white`,
            variant === "auth" ? "ml-1.5 font-medium" : "ml-3 font-bold",
            error && "text-red-500",
          )}
        >
          {label}
        </label>
      )}
      <input
        disabled={disabled}
        type={type}
        id={id}
        placeholder={placeholder}
        className={`mt-2 flex h-12 w-full items-center justify-center rounded-xl ring-2 bg-white/0 p-3 text-sm outline-none ${
          disabled === true
            ? "!ring-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
            : state === "error"
              ? "ring-red-500 text-red-500 placeholder:text-red-500 dark:!ring-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
              : state === "success"
                ? "ring-green-500 text-green-500 placeholder:text-green-500 dark:!ring-green-400 dark:!text-green-400 dark:placeholder:!text-green-400"
                : "ring-gray-300 dark:!ring-white/30 dark:text-white"
        } ${inputStyles}`}
        value={value}
        {...register(name)}
      />
      {error ? (
        <span className="text-xs text-red-500">{error.message}</span>
      ) : (
        <span className="text-xs text-white">no error</span>
      )}
    </div>
  );
};

export default InputField;
