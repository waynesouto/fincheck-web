import { cn } from "../../app/utils/cn";
import { formatDate } from "../../app/utils/date";
import { ErrorLabel } from "./ErrorLabel";
import { useState } from "react";
import { Popover } from "./Popover";
import { DatePicker } from "./DatePicker";

type DatePickerInputProps = {
	error?: string;
	className?: string;
};

export const DatePickerInput = ({ className, error }: DatePickerInputProps) => {
	const [selectedDate, setSelectedDate] = useState(new Date());

	const handleSelectedDate = (date: Date) => {
		setSelectedDate(date);
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
							className
						)}
					>
						<span className="absolute text-gray-700 text-xs left-[13px] top-2 pointer-events-none">
							Data
						</span>
						<span>{formatDate(selectedDate)}</span>
					</button>
				</Popover.Trigger>

				<Popover.Content>
					<DatePicker value={selectedDate} onChange={handleSelectedDate} />
				</Popover.Content>
			</Popover.Root>

			{error && <ErrorLabel error={error} />}
		</div>
	);
};
