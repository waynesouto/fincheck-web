import { useState } from "react"
import { useDashboard } from "../DashboardContext/useDashboard"

export const useTransactionsController = () => {
	const { areValuesVisible } = useDashboard()

	const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false)

	 const handleOpenFiltersModal = () => {
		setIsFiltersModalOpen(true)
	}

	const handleCloseFiltersModal = () => {
		setIsFiltersModalOpen(false)
	}

	return {
		areValuesVisible,
		isInitialLoading: false,
		isLoading: false,
		transactions: [],
		isFiltersModalOpen,
		handleOpenFiltersModal,
		handleCloseFiltersModal
	 }
}