import { cn } from "../../app/utils/cn";
import { formatDate } from "../../app/utils/date";
import { ErrorLabel } from "./ErrorLabel";
import { useState } from "react";
import { Popover } from "./Popover";
import { DatePicker } from "./DatePicker";

type DatePickerInputProps = {
	error?: string;
	className?: string;
	value?: Date;
	onChange?(date: Date): void;
};

export const DatePickerInput = ({ className, error, value, onChange }: DatePickerInputProps) => {
	const [selectedDate, setSelectedDate] = useState(value ?? new Date());

	const handleChangeDate = (date: Date) => {
		setSelectedDate(date);
		onChange?.(date);
	};

	return (
		<div>
			<Popover.Root>
				<Popover.Trigger>
					<button
						type="button"
						className={cn(
							"bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px] text-gray-700 transition-all outline-none focus:border-gray-800 text-left relative pt-4",
							error && "!border-red-900",
							className,
						)}
					>
						<span className="absolute text-gray-700 text-xs left-[13px] top-2 pointer-events-none">Data</span>
						<span>{formatDate(selectedDate)}</span>
					</button>
				</Popover.Trigger>

				<Popover.Content>
					<DatePicker value={selectedDate} onChange={handleChangeDate} />
				</Popover.Content>
			</Popover.Root>

			{error && <ErrorLabel error={error} />}
		</div>
	);
};
