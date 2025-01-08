import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { authService } from "../../../app/services/auth";
import { RegisterParams } from "../../../app/services/auth/register";
import { notification } from "../../../app/utils/notification";
import { useAuth } from "../../../app/hooks/useAuth";

const schema = z.object({
  name: z.string().min(2, "Nome é obrigatório"),
  email: z
    .string()
    .min(1, "E-mail é obrigatório")
    .email("Informe um e-mail válido"),
  password: z.string().min(8, "Senha deve conter pelo menos 8 dígitos"),
});

type FormData = z.infer<typeof schema>

export const useRegisterController = () => {
  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (data: RegisterParams) => {
      return authService.register(data);
    },
  });

	const { login } = useAuth()

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
			await mutateAsync(data);
			login()
    } catch (err) {
      notification(err as string, "error");
    }
  });

  return { register, handleSubmit, errors, isPending };
}
