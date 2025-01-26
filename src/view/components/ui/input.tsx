import * as React from "react";

import { cn } from "@/app/utils/cn";
import { ErrorLabel } from "../ErrorLabel";
import { Label } from "./label";

interface InputProps extends React.ComponentProps<"input"> {
	name: string;
	label?: string;
	error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, label, error, type, id, name, ...props }, ref) => {
		const inputId = id ?? name;

		return (
			<div>
				{label && <Label htmlFor={inputId}>{label}</Label>}

				<input
					{...props}
					ref={ref}
					name={name}
					type={type}
					id={inputId}
					className={cn(
						"flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
						error && "!border-red-900 focus-visible:ring-0",
						className
					)}
				/>

				{error && <ErrorLabel error={error} />}
			</div>
		);
	}
);
Input.displayName = "Input";

export { Input };
