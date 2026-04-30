import { useDetailTravel } from "@/src/hooks/useDetailTravel";
import { useReminders } from "@/src/hooks/useReminders";
import { DetailTravelScreen } from "@/src/screens/Travel/DetailTravel";

export default function DetailTravel() {
	const { travel, loading, handleDeleteTravel } = useDetailTravel();
	const remindersHook = useReminders();

	return (
		<DetailTravelScreen
			handleDeleteTravel={handleDeleteTravel}
			travel={travel}
			loading={loading}
			remindersHook={remindersHook}
		/>
	);
}
