import { useDashboard } from "../../components/DashboardContext/useDashboard"

export const useNewTransactionModalController = () => {
	const {isNewTransactionModalOpen, newTransactionType, closeNewTransactionModal} = useDashboard()

	return {isNewTransactionModalOpen, newTransactionType, closeNewTransactionModal}
}