/* eslint-disable @typescript-eslint/no-unused-vars */
import { cn } from "@/lib/utils";
import { FC } from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";

const SelectField: FC<TSelectField> = ({
  inputStyles,
  options,
}) => {
  return (
    <Select
      className={cn("py-2", inputStyles)}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          padding: ".35rem 0",
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
        option: (styles, { isSelected, isFocused }) => {
          return {
            ...styles,
            backgroundColor: isSelected || isFocused ? "pink" : "",
          };
        },
      }}
      onChange={(val) =>val.value}
      options={options}
      isMulti={false}
    />
  );
};

export default SelectField;
