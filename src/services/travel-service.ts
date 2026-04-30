import { supabase } from "../configs/supabase";
import type { TravelFormData } from "../hooks/useCreateTravel";
import type { Travel } from "../hooks/useTravelList";

export const travelService = {
	createTravel: async (travel: TravelFormData, userId: string) => {
		const { data, error } = await supabase.from("travels").insert({
			...travel,
			user_id: userId,
		});

		if (error) {
			console.error("Erro ao criar a viagem:", error);
		}

		return data;
	},
	getTravels: async (userId: string): Promise<Travel[] | null> => {
		const today = new Date().toISOString().split("T")[0]; // Formata a data para "YYYY-MM-DD"
		const { data, error } = await supabase
			.from("travels")
			.select("*")
			.eq("user_id", userId)
			// Filtra as viagens que ainda não terminaram
			.gte("end_date", today)
			.order("start_date", { ascending: false });

		if (error) {
			console.error("Erro ao buscar as viagens:", error);
		}

		return data;
	},
	getTravelById: async (id: string): Promise<Travel | null> => {
		const { data, error } = await supabase
			.from("travels")
			.select("*")
			.eq("id", id)
			.single();

		if (error) {
			console.error("Erro ao buscar a viagem:", error);
		}

		return data;
	},
	deleteTravel: async (id: string) => {
		const { error } = await supabase.from("travels").delete().eq("id", id);

		if (error) {
			console.error("Erro ao deletar a viagem:", error);
		}
	},
};
