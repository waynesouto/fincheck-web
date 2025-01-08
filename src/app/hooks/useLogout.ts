import { useMutation } from "@tanstack/react-query"
import { authService } from "../services/auth"

export const useLogout = () => {
	const { mutateAsync, isPending } = useMutation({
		mutationKey: ['auth', 'logout'],
		mutationFn: () => authService.logout()
	})

	return { mutateAsync, isPending }
}