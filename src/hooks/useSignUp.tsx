import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { authService } from "../services/auth-service";

const signUpSchema = z
	.object({
		username: z.string().min(3, "O nome deve conter pelo menos 3 caracteres"),
		email: z.email("Email inválido"),
		password: z.string().min(6, "A senha deve conter pelo menos 6 caracteres"),
		confirmPassword: z
			.string()
			.min(6, "A confirmação de senha deve conter pelo menos 6 caracteres"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "As senhas não coincidem",
		path: ["confirmPassword"],
	});

export type SignUpFormData = z.infer<typeof signUpSchema>;

export const useSignUp = () => {
	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignUpFormData>({
		resolver: zodResolver(signUpSchema),
	});

	const onSubmit = async (data: SignUpFormData) => {
		try {
			await authService.signUp(data.username, data.email, data.password);
			router.replace("/(panel)/Home");
		} catch (error) {
			console.error("Erro ao criar conta:", error);
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
