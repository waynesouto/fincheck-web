import { ComponentProps } from "react";
import { cn } from "../../app/utils/cn";
import { Spinner } from "./Spinner";

type ButtonProps = {
  isPending?: boolean;
} & ComponentProps<"button">

export const Button = ({
  isPending,
  children,
  disabled,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      disabled={disabled || isPending}
      className={cn(
        "bg-teal-900 text-white hover:bg-teal-800 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed px-6 h-12 rounded-2xl font-medium transition-all flex items-center justify-center",
        className
      )}
    >
      {!isPending && children}
      {isPending && <Spinner className="w-6 h-6" />}
    </button>
  );
}
