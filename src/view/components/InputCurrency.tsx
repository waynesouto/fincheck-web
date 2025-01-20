import { NumericFormat } from "react-number-format";
import { ErrorLabel } from "./ErrorLabel";

type InputCurrencyProps = {
	error?: string;
	value?: number;
	onChange?(value: number): void;
};

export const InputCurrency = ({
	error,
	value,
	onChange,
}: InputCurrencyProps) => {
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
				className="text-gray-800 text-[32px] font-bold tracking-[-1px] outline-none w-full"
			/>

			{error && <ErrorLabel error={error} />}
		</div>
	);
};
