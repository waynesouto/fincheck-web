import { useDashboard } from "../DashboardContext/useDashboard"

export const useTransactionsController = () => {
	const { areValuesVisible } = useDashboard()

	return {
		areValuesVisible,
		isInitialLoading: false,
		isLoading: false,
		transactions: [{}],
	 }
}