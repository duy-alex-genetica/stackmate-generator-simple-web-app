import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { FormikErrors } from "formik";
import React from "react";
import { BsExclamationCircle } from "react-icons/bs";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type?: string;
  label?: string | React.ReactNode;
  error?: string | React.ReactNode | FormikErrors<any> | any;
  required?: boolean;
  labelClassName?: string;
  errorClassName?: string;
  className?: string;
  containerClassName?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

function FormInput(
  {
    name,
    type = "text",
    label,
    error,
    required = false,
    labelClassName = "",
    containerClassName = "",
    errorClassName = "",
    className = "",
    icon: Icon,
    ...inputProps
  }: FormInputProps): React.ReactElement {
  const isError = Boolean(error);

  return (
    <div className={cn("form-field-2", containerClassName, Icon && "has-icon")}>
      {label && (
        <Label
          htmlFor={name}
          className={cn("flex items-center gap-1", labelClassName)}
        >
          {label}
          {required && <span className="text-red-500">*</span>}
        </Label>
      )}

      <div className="relative z-0">
        {Icon && <Icon className="absolute square-4 left-3 top-1/2 transform -translate-y-1/2 text-dim-10" />}
        <Popover open={isError}>
          <PopoverTrigger asChild>
            <Input
              id={name}
              name={name}
              type={type}
              className={cn(
                "w-full rounded-[6px] text-sm text-dim-10 placeholder:text-dim-1 bg-zinc-50 border border-zinc-200 focus:border-primary-4 focus:ring-1 focus:ring-primary-4 focus-visible:ring-primary-4 focus-visible:border-primary-4 duration-200",
                Icon && "pl-9",
                className,
              )}
              {...inputProps}
            />
          </PopoverTrigger>

          {isError && (
            <PopoverContent
              side="bottom"
              align="start"
              onOpenAutoFocus={(e) => e.preventDefault()}
              className={cn(
                "flex items-center gap-1 py-1 px-2 text-xs text-red-500 bg-white border border-red-300 rounded-md shadow-md w-max max-w-[200px]",
                errorClassName,
              )}
            >
              <BsExclamationCircle className="square-3" />
              <span>{error}</span>
            </PopoverContent>
          )}
        </Popover>
      </div>
    </div>
  );
}

export default FormInput;
