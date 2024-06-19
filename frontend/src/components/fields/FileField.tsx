import { forwardRef, useState } from "react";
import { Controller, FieldError } from "react-hook-form";

type TInputField = {
  variant: string;
  disabled?: boolean;
  name: string;
  value?: string;
  error?: FieldError | any;
  extra: string;
  control: any;
  accept?: string;
};

const FileField = forwardRef<HTMLInputElement, TInputField>(
  ({ name, error, extra, control, accept }, ref) => {
    const [fieldValue, setFieldValue] = useState("");

    return (
      <div
        className={`w-full flex flex-col items-start justify-center ${extra}`}
      >
        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            return (
              <input
                accept={accept}
                type="file"
                {...field}
                value={fieldValue}
                ref={ref}
                onChange={(e) => {
                  setFieldValue("");
                  field.onChange(e.target.files && e.target.files[0]);
                }}
              />
            );
          }}
        />
        {error ? (
          <span className="text-xs text-red-500">{error.message}</span>
        ) : (
          <span className="text-xs text-white">no error</span>
        )}
      </div>
    );
  },
);

FileField.displayName = "FileField";

export default FileField;
