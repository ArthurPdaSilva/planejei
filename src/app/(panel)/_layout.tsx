import { Stack } from "expo-router";

export default function PanelLayout() {
	return (
		<Stack>
			<Stack.Screen name="Home" options={{ headerShown: false }} />
			<Stack.Screen name="Profile" options={{ headerShown: false }} />
			<Stack.Screen name="Travel/NewTravel" options={{ headerShown: false }} />
		</Stack>
	);
}
