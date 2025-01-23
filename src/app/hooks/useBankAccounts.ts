import { useQuery } from "@tanstack/react-query";
import { bankAccountsService } from "../services/bankAccounts";

export const useBankAccounts = () => {
	const { data, isFetching } = useQuery({
		queryKey: ["bankAccounts"],
		queryFn: bankAccountsService.list,
	});

	return {
		accounts: data === undefined ? [] : data.bankAccounts,
		isFetching
	}
}