import { useMemo, useState } from "react"
import { useWindowWidth } from "../../../../../app/hooks/useWindowWidth"
import { useDashboard } from "../DashboardContext/useDashboard"
import { useQuery } from "@tanstack/react-query"
import { bankAccountsService } from "../../../../../app/services/bankAccounts"

export const useAccountsController = () => {
	const windowWidth = useWindowWidth()
	const { areValuesVisible, toggleValuesVisibility, openNewAccountModal } = useDashboard()

	const [slider, setSliderState] = useState({
		isBeginning: true,
		isEnd: false
	})

	const {data, isFetching} = useQuery({
		queryKey: ['bankAccounts'],
		queryFn: bankAccountsService.list
	})

	const currentBalance = useMemo((
	) => {
		if (!data) {
			return 0
		}

		return data.bankAccounts.reduce((total, account) => total + account.currentBalance, 0)
	}, [data])


	return {
		slider,
		setSliderState,
		windowWidth,
		areValuesVisible,
		toggleValuesVisibility,
		openNewAccountModal,
		isLoading: isFetching,
		accounts: data === undefined ? [] : data.bankAccounts,
		currentBalance
	}
}