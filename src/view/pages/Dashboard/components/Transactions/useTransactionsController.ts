import { useEffect, useState } from "react";
import { useDashboard } from "../DashboardContext/useDashboard";
import { useTransactions } from "../../../../../app/hooks/useTransactions";
import { ListTransactionsRequest } from "../../../../../app/services/transactions/list";
import { ITransaction } from "../../../../../app/entities";

export type HandleApplyFiltersParams = { bankAccountId?: string; year: number };

export const useTransactionsController = () => {
	const { areValuesVisible } = useDashboard();

	const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [transactionBeingEdited, setTransactionBeingEdited] = useState<ITransaction | null>(null);
	const [filters, setFilters] = useState<ListTransactionsRequest>({
		month: new Date().getMonth(),
		year: new Date().getFullYear(),
	});

	const { transactions, isInitialLoading, isFetching, refetch } = useTransactions(filters);

	useEffect(() => {
		refetch();
	}, [filters, refetch]);

	const handleChangeFilter = <T extends keyof ListTransactionsRequest>(filter: T) => {
		return (value: ListTransactionsRequest[T]) => {
			if (value === filters[filter]) {
				return;
			}

			setFilters((prevState) => ({
				...prevState,
				[filter]: value,
			}));
		};
	};

	const handleApplyFilters = ({ bankAccountId, year }: HandleApplyFiltersParams) => {
		handleChangeFilter("bankAccountId")(bankAccountId);
		handleChangeFilter("year")(year);
		setIsFiltersModalOpen(false);
	};

	const handleOpenFiltersModal = () => {
		setIsFiltersModalOpen(true);
	};

	const handleCloseFiltersModal = () => {
		setIsFiltersModalOpen(false);
	};

	const handleOpenEditModal = (transaction: ITransaction) => {
		setIsEditModalOpen(true);
		setTransactionBeingEdited(transaction);
	};

	const handleCloseEditModal = () => {
		setIsEditModalOpen(false);
		setTransactionBeingEdited(null);
	};

	return {
		areValuesVisible,
		isInitialLoading,
		isLoading: isFetching,
		transactions,
		isFiltersModalOpen,
		filters,
		transactionBeingEdited,
		handleOpenFiltersModal,
		handleCloseFiltersModal,
		handleChangeFilter,
		handleApplyFilters,
		isEditModalOpen,
		handleOpenEditModal,
		handleCloseEditModal,
	};
};
