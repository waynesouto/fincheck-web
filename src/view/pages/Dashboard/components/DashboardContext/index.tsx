import { createContext, useCallback, useState } from "react";
import { TransactionType } from "../../../../../app/utils/models";

type DashboardContextValue = {
	areValuesVisible: boolean;
	isNewAccountModalOpen: boolean;
	isNewTransactionModalOpen: boolean;
	newTransactionType: TransactionType | null;
	toggleValuesVisibility(): void;
	openNewAccountModal(): void;
	closeNewAccountModal(): void;
	openNewTransactionModal(type: TransactionType): void;
	closeNewTransactionModal(): void;
};

export const DashboardContext = createContext({} as DashboardContextValue);

export const DashboardProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [areValuesVisible, setAreValuesVisible] = useState(() => {
		return localStorage.getItem("@fincheck-are-values-visible") === "true";
	});
	const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
	const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
		useState(false);
	const [newTransactionType, setNewTransactionType] =
		useState<TransactionType | null>(null);

	const toggleValuesVisibility = useCallback(() => {
		setAreValuesVisible((prevState) => {
			const value = !prevState;
			localStorage.setItem("@fincheck-are-values-visible", value.toString());

			return value;
		});
	}, []);

	const openNewAccountModal = useCallback(() => {
		setIsNewAccountModalOpen(true);
	}, []);

	const closeNewAccountModal = useCallback(() => {
		setIsNewAccountModalOpen(false);
	}, []);

	const openNewTransactionModal = useCallback((type: TransactionType) => {
		setNewTransactionType(type);
		setIsNewTransactionModalOpen(true);
	}, []);

	const closeNewTransactionModal = useCallback(() => {
		setNewTransactionType(null);
		setIsNewTransactionModalOpen(false);
	}, []);

	return (
		<DashboardContext.Provider
			value={{
				areValuesVisible,
				isNewAccountModalOpen,
				isNewTransactionModalOpen,
				newTransactionType,
				toggleValuesVisibility,
				openNewAccountModal,
				closeNewAccountModal,
				openNewTransactionModal,
				closeNewTransactionModal,
			}}
		>
			{children}
		</DashboardContext.Provider>
	);
};
