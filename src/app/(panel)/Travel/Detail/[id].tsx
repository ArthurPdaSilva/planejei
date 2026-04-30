import { useDetailTravel } from "@/src/hooks/useDetailTravel";
import { DetailTravelScreen } from "@/src/screens/Travel/DetailTravel";

export default function DetailTravel() {
	const { travel, loading, handleDeleteTravel } = useDetailTravel();

	return (
		<DetailTravelScreen
			handleDeleteTravel={handleDeleteTravel}
			travel={travel}
			loading={loading}
		/>
	);
}
