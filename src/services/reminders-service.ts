import { supabase } from "../configs/supabase";
import type { Reminder } from "../hooks/useReminders";

type CreateReminderPayload = {
	travel_id: string;
	description: string;
};

export const remindersService = {
	create: async (payload: CreateReminderPayload) => {
		const { error } = await supabase.from("reminders").insert([payload]);

		if (error) {
			console.error("Erro ao criar o lembrete:", error);
			throw error;
		}
	},
	delete: async (id: string) => {
		const { error } = await supabase.from("reminders").delete().eq("id", id);

		if (error) {
			console.error("Erro ao deletar o lembrete:", error);
			throw error;
		}
	},
	getRemindersByTravelId: async (travelId: string): Promise<Reminder[]> => {
		const { data, error } = await supabase
			.from("reminders")
			.select("*")
			.eq("travel_id", travelId)
			.order("created_at", { ascending: true });

		if (error) {
			console.error("Erro ao buscar os lembretes:", error);
			return [];
		}

		return data;
	},
};
