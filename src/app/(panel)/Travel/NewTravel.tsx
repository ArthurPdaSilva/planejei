import { useCreateTravel } from "@/src/hooks/useCreateTravel";
import NewTravelScreen from "@/src/screens/Travel/NewTravel";

export default function NewTravel() {
	const { control, isSubmitting, errors, handleSubmit, createNewTravel } =
		useCreateTravel();

	return (
		<NewTravelScreen
			control={control}
			isSubmitting={isSubmitting}
			errors={errors}
			handleSubmit={handleSubmit}
			createNewTravel={createNewTravel}
		/>
	);
}
