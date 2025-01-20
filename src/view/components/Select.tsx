import * as RdxSelect from "@radix-ui/react-select";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { cn } from "../../app/utils/cn";
import { useState } from "react";
import { ErrorLabel } from "./ErrorLabel";

type SelectProps = {
	className?: string;
	error?: string;
	placeholder?: string;
	options: {
		label: string;
		value: string;
	}[];
	value?: string;
	onChange?(value: string): void;
};

export const Select = ({
	placeholder,
	error,
	className,
	options,
	value,
	onChange,
}: SelectProps) => {
	const [selectedValue, setSelectedValue] = useState(value);

	const handleSelect = (value: string) => {
		setSelectedValue(value);
		onChange?.(value);
	};

	return (
		<div>
			<div className="relative">
				<label
					className={cn(
						"absolute z-10 top-1/2 -translate-y-1/2 left-3 pointer-events-none",
						selectedValue &&
							"text-xs left-[13px] top-2 transition-all translate-y-0"
					)}
				>
					{placeholder}
				</label>

				<RdxSelect.Root value={value} onValueChange={handleSelect}>
					<RdxSelect.Trigger
						className={cn(
							"bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px] text-gray-800 transition-all outline-none focus:border-gray-800 text-left relative pt-4",
							error && "!border-red-900",
							className
						)}
					>
						<RdxSelect.Value />
						<RdxSelect.Icon className="absolute right-3 top-1/2 -translate-y-1/2">
							<ChevronDownIcon className="h-6 w-6 text-gray-800" />
						</RdxSelect.Icon>
					</RdxSelect.Trigger>
					<RdxSelect.Portal>
						<RdxSelect.Content className="z-[99] overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]">
							<RdxSelect.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-gray-800">
								<ChevronUpIcon />
							</RdxSelect.ScrollUpButton>

							<RdxSelect.Viewport className="p-2">
								{options.map((option) => (
									<RdxSelect.Item
										key={option.value}
										value={option.value}
										className="p-2 text-gray-800 text-sm data-[state=checked]:font-bold outline-none data-[highlighted]:bg-gray-50 rounded-lg transition-colors"
									>
										<RdxSelect.ItemText>{option.label}</RdxSelect.ItemText>
									</RdxSelect.Item>
								))}
							</RdxSelect.Viewport>

							<RdxSelect.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-gray-800">
								<ChevronDownIcon />
							</RdxSelect.ScrollDownButton>
						</RdxSelect.Content>
					</RdxSelect.Portal>
				</RdxSelect.Root>
			</div>

			{error && <ErrorLabel error={error} />}
		</div>
	);
};
