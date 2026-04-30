import { useEffect, useState } from "react";
import { authService } from "../services/auth-service";
import { travelService } from "../services/travel-service";

export interface Travel {
	id: string;
	title: string;
	city: string;
	hotel_address: string;
	start_date: string;
	end_date: string;
}

export const useTravelList = () => {
	const [travels, setTravels] = useState<Travel[]>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const { user } = await authService.getLoggedUser();

				const data = await travelService.getTravels(user.id);

				if (!data) {
					setTravels([]);
					return;
				}

				setTravels(data);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	return {
		travels,
		loading,
	};
};
