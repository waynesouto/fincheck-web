import { useState } from "react"
import { useWindowWidth } from "../../../../../app/hooks/useWindowWidth"

export const useAccountsController = () => {
	const windowWidth = useWindowWidth()
	const [slider, setSliderState] = useState({
		isBeginning: true,
		isEnd: false
	})

	return {
		slider,
		setSliderState,
		windowWidth
		}
}