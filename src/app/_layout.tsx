import { router, Stack } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
	useEffect(() => {
		const signed = false;

		// Garantir que a navegação ocorra após a renderização do componente
		requestAnimationFrame(() => {
			if (!signed) {
				router.replace("/(auth)/SignIn");
				return;
			}

			router.replace("/(panel)/Home");
		});
	}, []);

	return (
		<Stack>
			<Stack.Screen name="index" options={{ headerShown: false }} />
			<Stack.Screen name="(auth)" options={{ headerShown: false }} />
			<Stack.Screen name="(panel)" options={{ headerShown: false }} />
		</Stack>
	);
}
