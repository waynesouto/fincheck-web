import { useMemo, useState } from "react";
import { useWindowWidth } from "../../../../../app/hooks/useWindowWidth";
import { useDashboard } from "../DashboardContext/useDashboard";
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";

export const useAccountsController = () => {
	const windowWidth = useWindowWidth();
	const { areValuesVisible, toggleValuesVisibility, openNewAccountModal } = useDashboard();

	const [slider, setSliderState] = useState({
		isBeginning: true,
		isEnd: false,
	});

	const { accounts, isFetching } = useBankAccounts();

	const currentBalance = useMemo(
		() => accounts.reduce((total, account) => total + account.currentBalance, 0),
		[accounts],
	);

	return {
		slider,
		setSliderState,
		windowWidth,
		areValuesVisible,
		toggleValuesVisibility,
		openNewAccountModal,
		isLoading: isFetching,
		accounts,
		currentBalance,
	};
};
