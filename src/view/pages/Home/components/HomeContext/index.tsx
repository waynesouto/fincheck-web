import { createContext, useCallback, useState } from "react";
import { IBankAccount, TransactionType } from "../../../../../app/entities";

type HomeContextValue = {
	areValuesVisible: boolean;
	isNewAccountModalOpen: boolean;
	isEditAccountModalOpen: boolean;
	accountBeingEdited: IBankAccount | null;
	isNewTransactionModalOpen: boolean;
	newTransactionType: TransactionType | null;
	isPaidChanged: boolean;
	toggleValuesVisibility(): void;
	openNewAccountModal(): void;
	closeNewAccountModal(): void;
	openEditAccountModal(bankAccount: IBankAccount): void;
	closeEditAccountModal(): void;
	openNewTransactionModal(type: TransactionType): void;
	closeNewTransactionModal(): void;
	isPaidToggle(): void;
};

export const HomeContext = createContext({} as HomeContextValue);

export const HomeProvider = ({ children }: { children: React.ReactNode }) => {
	const [areValuesVisible, setAreValuesVisible] = useState(() => {
		return localStorage.getItem("@fincheck-are-values-visible") === "true";
	});
	const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
	const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);
	const [newTransactionType, setNewTransactionType] = useState<TransactionType | null>(null);
	const [isEditAccountModalOpen, setIsEditAccountModalOpen] = useState(false);
	const [accountBeingEdited, setAccountBeingEdited] = useState<IBankAccount | null>(null);
	const [isPaidChanged, setIsPaidChanged] = useState(false);

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

	const openEditAccountModal = useCallback((bankAccount: IBankAccount) => {
		setAccountBeingEdited(bankAccount);
		setIsEditAccountModalOpen(true);
	}, []);

	const closeEditAccountModal = useCallback(() => {
		setAccountBeingEdited(null);
		setIsEditAccountModalOpen(false);
	}, []);

	const openNewTransactionModal = useCallback((type: TransactionType) => {
		setNewTransactionType(type);
		setIsNewTransactionModalOpen(true);
	}, []);

	const closeNewTransactionModal = useCallback(() => {
		setNewTransactionType(null);
		setIsNewTransactionModalOpen(false);
	}, []);

	const isPaidToggle = useCallback(() => {
		setIsPaidChanged(true);
	}, []);

	return (
		<HomeContext.Provider
			value={{
				areValuesVisible,
				isNewAccountModalOpen,
				isEditAccountModalOpen,
				accountBeingEdited,
				isNewTransactionModalOpen,
				newTransactionType,
				isPaidChanged,
				toggleValuesVisibility,
				openNewAccountModal,
				closeNewAccountModal,
				openEditAccountModal,
				closeEditAccountModal,
				openNewTransactionModal,
				closeNewTransactionModal,
				isPaidToggle,
			}}
		>
			{children}
		</HomeContext.Provider>
	);
};
