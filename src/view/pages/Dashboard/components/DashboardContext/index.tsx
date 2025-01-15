import { createContext, useCallback, useState } from "react";

type DashboardContextValue = {
	areValuesVisible: boolean;
	toggleValuesVisibility(): void;
	isNewAccountModalOpen: boolean;
	openNewAccountModal(): void;
	closeNewAccountModal(): void;
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
	const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(true); // TODO: pass to false

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

	return (
		<DashboardContext.Provider
			value={{
				areValuesVisible,
				toggleValuesVisibility,
				isNewAccountModalOpen,
				openNewAccountModal,
				closeNewAccountModal,
			}}
		>
			{children}
		</DashboardContext.Provider>
	);
};
