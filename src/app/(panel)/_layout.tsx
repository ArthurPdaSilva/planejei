import { Stack } from "expo-router";

export default function PanelLayout() {
	return (
		<Stack>
			<Stack.Screen name="Home" options={{ headerShown: false }} />
		</Stack>
	);
}
