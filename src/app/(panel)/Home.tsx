import { useTravelList } from "@/src/hooks/useTravelList";
import { HomeScreen } from "@/src/screens/Home";

export default function Home() {
	const { travels, loading } = useTravelList();

	return <HomeScreen travels={travels} loading={loading} />;
}
