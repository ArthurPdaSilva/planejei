import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { authService } from "../services/auth-service";
import { travelService } from "../services/travel-service";

const travelSchema = z.object({
	title: z
		.string()
		.nonempty("O nome da viagem é obrigatório")
		.min(2, "O nome da viagem é obrigatório"),
	city: z
		.string()
		.nonempty("A cidade é obrigatória")
		.min(2, "A cidade é obrigatória"),
	hotel_address: z
		.string()
		.nonempty("O endereço do hotel é obrigatório")
		.min(2, "O endereço do hotel é obrigatório"),
	start_date: z
		.string()
		.nonempty("A data de início é obrigatória")
		.min(2, "A data de início é obrigatória"),
	end_date: z
		.string()
		.nonempty("A data de volta é obrigatória")
		.min(2, "A data de volta é obrigatória"),
});

export type TravelFormData = z.infer<typeof travelSchema>;

export const useCreateTravel = () => {
	const [userId, setUserId] = useState<string | null>(null);
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<TravelFormData>({
		resolver: zodResolver(travelSchema),
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { user } = await authService.getLoggedUser();
				setUserId(user.id);
			} catch (error) {
				console.error("Erro ao usuário logado:", error);
			}
		};

		fetchData();
	}, []);

	const createNewTravel = async (data: TravelFormData) => {
		try {
			if (!userId) {
				console.error("Usuário não encontrado. Não é possível criar a viagem.");
				return;
			}

			await travelService.createTravel(data, userId);
			reset();
			router.replace("/(panel)/Home");
		} catch (error) {
			console.error("Erro ao criar a viagem:", error);
		}
	};

	return {
		control,
		handleSubmit,
		errors,
		isSubmitting,
		createNewTravel,
	};
};
