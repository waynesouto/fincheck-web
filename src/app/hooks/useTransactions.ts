import { useQuery } from "@tanstack/react-query";
import { transactionsService } from "../services/transactions";
import { ListTransactionsRequest } from "../services/transactions/list";

export const useTransactions = (params: ListTransactionsRequest) => {
	const { data, isFetching, isLoading, refetch } = useQuery({
		queryKey: ["transactions"],
		queryFn: () => transactionsService.list(params),
	});

	return {
		transactions: data === undefined ? [] : data.transactions,
		isFetching,
		isInitialLoading: isLoading,
		refetch,
	};
};
