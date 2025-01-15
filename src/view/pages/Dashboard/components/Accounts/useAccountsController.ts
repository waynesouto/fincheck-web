import { useState } from "react"
import { useWindowWidth } from "../../../../../app/hooks/useWindowWidth"
import { useDashboard } from "../DashboardContext/useDashboard"

export const useAccountsController = () => {
	const windowWidth = useWindowWidth()
	const { areValuesVisible, toggleValuesVisibility, openNewAccountModal } = useDashboard()

	const [slider, setSliderState] = useState({
		isBeginning: true,
		isEnd: false
	})

	return {
		slider,
		setSliderState,
		windowWidth,
		areValuesVisible,
		toggleValuesVisibility,
		openNewAccountModal,
		isLoading: false,
		accounts: []
	}
}