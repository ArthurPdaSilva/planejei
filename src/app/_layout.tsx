import { router, Stack } from "expo-router";
import { useEffect } from "react";
import { supabase } from "../configs/supabase";

export default function RootLayout() {
	useEffect(() => {
		supabase.auth.onAuthStateChange((_event, session) => {
			if (session) {
				console.log("Usuário autenticado!");
				router.replace("/(panel)/Home");
				return;
			}
			console.log("Usuário não autenticado!");
			router.replace("/(auth)/SignIn");
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
