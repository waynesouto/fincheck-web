import { useMutation } from "@tanstack/react-query"
import { authService } from "../services/auth"

export const useRefreshToken = () => {
	const { mutateAsync, isPending } = useMutation({
		mutationKey: ['auth', 'refresh'],
		mutationFn: () => authService.refresh()
	})

	return { mutateAsync, isPending }
}