import { BankAccountType } from "../../../../app/utils/models";
import { iconsMap } from "./iconsMap";

type BankAccountTypeIconProps = {
	type: BankAccountType;
};

export const BankAccountTypeIcon = ({ type }: BankAccountTypeIconProps) => {
	const Icon = iconsMap[type];

	return <Icon />;
};
