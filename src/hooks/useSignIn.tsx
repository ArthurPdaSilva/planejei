import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { authService } from "../services/auth-service";

const signInSchema = z.object({
	email: z.email("Email inválido"),
	password: z.string().min(6, "A senha deve conter pelo menos 6 caracteres"),
});

export type SignInFormData = z.infer<typeof signInSchema>;

export const useSignIn = () => {
	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignInFormData>({
		resolver: zodResolver(signInSchema),
	});

	const onSubmit = async (data: SignInFormData) => {
		try {
			await authService.signIn(data.email, data.password);
			router.replace("/(panel)/Home");
		} catch (error) {
			console.error("Erro ao fazer login:", error);
		}
	};

	return {
		control,
		isSubmitting,
		errors,
		handleSubmit,
		onSubmit,
	};
};
