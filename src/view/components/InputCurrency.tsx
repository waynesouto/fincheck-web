import { NumericFormat } from "react-number-format";
import { ErrorLabel } from "./error-label";

type InputCurrencyProps = {
	error?: string;
	value?: number;
	onChange?(value: number): void;
};

export const InputCurrency = ({ error, value, onChange }: InputCurrencyProps) => {
	return (
		<div>
			<NumericFormat
				thousandSeparator="."
				decimalSeparator=","
				decimalScale={2}
				value={value}
				onValueChange={({ floatValue }) => {
					onChange?.(floatValue ?? 0.0);
				}}
				onBlur={(event) => {
					if (!event.target.value) {
						event.target.value = "0";
					}
				}}
				className="text-3xl font-bold w-full bg-transparent outline-none transition-colors placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
			/>

			{error && <ErrorLabel error={error} />}
		</div>
	);
};
