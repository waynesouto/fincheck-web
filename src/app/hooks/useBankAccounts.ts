import { useQuery } from "@tanstack/react-query";
import { bankAccountsService } from "../services/bankAccounts";

export const useBankAccounts = () => {
	const { data, isFetching } = useQuery({
		queryKey: ["bankAccounts"],
		queryFn: bankAccountsService.list,
		staleTime: Infinity
	});

	return {
		accounts: data === undefined ? [] : data.bankAccounts,
		isFetching
	}
}