import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { travelService } from "../services/travel-service";
import type { Travel } from "./useTravelList";

export const useDetailTravel = () => {
	const { id } = useLocalSearchParams<{ id: string }>();
	const [travel, setTravel] = useState<Travel | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				if (!id) {
					throw new Error("ID da viagem não fornecido");
				}

				const travel = await travelService.getTravelById(id);
				setTravel(travel);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [id]);

	const onDelete = async () => {
		try {
			if (!id) {
				throw new Error("ID da viagem não fornecido");
			}

			await travelService.deleteTravel(id);
			router.replace("/(panel)/Home");
		} catch (error) {
			console.error(error);
		}
	};

	const handleDeleteTravel = async () => {
		Alert.alert(
			"Deletar viagem",
			"Tem certeza que deseja deletar esta viagem?",
			[
				{ text: "Cancelar", style: "cancel" },
				{
					text: "Deletar",
					style: "destructive",
					onPress: async () => {
						await onDelete();
					},
				},
			],
		);
	};

	return { travel, handleDeleteTravel, loading };
};
