import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { remindersService } from "../services/reminders-service";

export type Reminder = {
	id: string;
	travel_id: string;
	description: string;
	created_at: string;
};

export type UseRemindersReturn = {
	newReminder: string;
	setNewReminder: React.Dispatch<React.SetStateAction<string>>;
	loading: boolean;
	addReminder: () => Promise<void>;
	deleteReminder: (reminderId: string) => Promise<void>;
	reminders: Reminder[];
};

export const useReminders = (): UseRemindersReturn => {
	const [newReminder, setNewReminder] = useState("");
	const [reminders, setReminders] = useState<Reminder[]>([]);
	const [loading, setLoading] = useState(false);
	const { id } = useLocalSearchParams<{ id: string }>();

	const addReminder = async () => {
		if (!newReminder.trim()) {
			return;
		}

		setLoading(true);
		try {
			remindersService.create({
				travel_id: id,
				description: newReminder.trim(),
			});

			setNewReminder("");
			setReminders((prev) => [
				...prev,
				{
					id: Math.random().toString(36), // Gera um ID temporário
					travel_id: id,
					description: newReminder.trim(),
					created_at: new Date().toISOString(),
				},
			]);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (!id) return;

		const fetchReminders = async () => {
			setLoading(true);
			try {
				const reminders = await remindersService.getRemindersByTravelId(id);
				setReminders(reminders);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		fetchReminders();
	}, [id]);

	const deleteReminder = async (reminderId: string) => {
		try {
			await remindersService.delete(reminderId);
			setReminders((prev) => prev.filter((r) => r.id !== reminderId));
		} catch (error) {
			console.error(error);
		}
	};

	return {
		newReminder,
		reminders,
		setNewReminder,
		loading,
		addReminder,
		deleteReminder,
	};
};
