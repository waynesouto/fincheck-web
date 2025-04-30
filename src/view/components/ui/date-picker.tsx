"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/app/utils/cn";
import { Button } from "@/view/components/ui/button";
import { Calendar } from "@/view/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/view/components/ui/popover";
import { ptBR } from "date-fns/locale";

type DatePickerInputProps = {
	error?: string;
	className?: string;
	value?: Date;
	onChange?(date?: Date): void;
};

export const DatePicker = ({ className, error, value, onChange }: DatePickerInputProps) => {
	const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(value ?? undefined);

	const handleChangeDate = (date?: Date) => {
		setSelectedDate(date);
		onChange?.(date);
	};

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					className={cn("justify-start text-left font-normal", !selectedDate && "text-muted-foreground", className)}
				>
					<CalendarIcon />
					{selectedDate ? format(selectedDate, "PPP", { locale: ptBR }) : <span>Selecione uma data</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align="start">
				<Calendar mode="single" selected={selectedDate} onSelect={handleChangeDate} initialFocus />
			</PopoverContent>
		</Popover>
	);
};
