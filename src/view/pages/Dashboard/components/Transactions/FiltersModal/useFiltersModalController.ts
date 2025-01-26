import { useBankAccounts } from "../../../../../../app/hooks/useBankAccounts";
import { useState } from "react";

export const useFiltersModalController = () => {
	const [selectBankAccountId, setSelectedBankAccountId] = useState<string | undefined>(undefined);
	const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

	const { accounts } = useBankAccounts();

	const handleSelectBankAccount = (bankAccountId: string) => {
		setSelectedBankAccountId((prevState) => (prevState === bankAccountId ? undefined : bankAccountId));
	};

	const handleChangeYear = (step: number) => {
		setSelectedYear((prevState) => prevState + step);
	};

	return {
		selectBankAccountId,
		accounts,
		selectedYear,
		handleSelectBankAccount,
		handleChangeYear,
	};
};
