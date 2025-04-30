import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/app/utils/cn";
import { Label } from "./label";

type SwitchProps = {
	label?: string;
	className?: string;
	value: boolean;
	onChange?(): void;
};

const Switch = ({ className, value, label, onChange }: SwitchProps) => (
	<div className="flex justify-between items-center gap-1">
		{label && <Label className="text-sm">{label}</Label>}
		<SwitchPrimitives.Root
			value={String(value)}
			onChange={() => onChange}
			className={cn(
				"peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
				className
			)}
		>
			<SwitchPrimitives.Thumb
				className={cn(
					"pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
				)}
			/>
		</SwitchPrimitives.Root>
	</div>
);
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
