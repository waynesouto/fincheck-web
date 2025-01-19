import { ComponentProps, forwardRef } from "react";
import { cn } from "../../app/utils/cn";
import { ErrorLabel } from "./ErrorLabel";

type InputProps = {
	name: string;
	error?: string;
} & ComponentProps<"input">;

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, error, placeholder, name, id, ...props }, ref) => {
		const inputId = id ?? name;

		return (
			<div className="relative">
				<input
					{...props}
					ref={ref}
					name={name}
					id={inputId}
					className={cn(
						"bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px] text-gray-800 pt-4 transition-all outline-none peer placeholder-shown:pt-0 focus:border-gray-800",
						error && "!border-red-900",
						className
					)}
					placeholder=" "
				/>

				<label
					htmlFor={inputId}
					className="absolute text-xs left-[13px] top-2 pointer-events-none text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 transition-all"
				>
					{placeholder}
				</label>

				{error && <ErrorLabel error={error} />}
			</div>
		);
	}
);
Input.displayName = "Input";
