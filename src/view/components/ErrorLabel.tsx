import { CrossCircledIcon } from "@radix-ui/react-icons";

type ErrorLabelProps = {
	error: string;
};

export const ErrorLabel = ({ error }: ErrorLabelProps) => {
	return (
		<div className="flex gap-2 items-center mt-2 text-red-900">
			<CrossCircledIcon />
			<span className="text-xs">{error}</span>
		</div>
	);
};
