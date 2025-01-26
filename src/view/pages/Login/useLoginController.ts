import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { authService } from "../../../app/services/auth";
import { LoginParams } from "../../../app/services/auth/login";
import { notification } from "../../../app/utils/notification";
import { useAuth } from "../../../app/hooks/useAuth";

const schema = z.object({
	email: z.string().min(1, "Insira seu e-mail para entrar").email("Informe um e-mail válido"),
	password: z.string().min(8, "Senha deve conter pelo menos 8 dígitos"),
});

type FormData = z.infer<typeof schema>;

export const useLoginController = () => {
	const {
		register,
		handleSubmit: hookFormSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	const { isPending, mutateAsync } = useMutation({
		mutationFn: (data: LoginParams) => {
			return authService.login(data);
		},
	});

	const { login } = useAuth();

	const handleSubmit = hookFormSubmit(async (data) => {
		try {
			await mutateAsync(data);
			login();
		} catch (err) {
			notification("Ocorreu um erro ao acessar a sua conta. " + err, "error");
		}
	});

	return { register, handleSubmit, errors, isLoading: isPending };
};
