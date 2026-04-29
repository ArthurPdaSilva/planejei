import { router } from "expo-router";
import { authService } from "../services/auth-service";

export const useProfile = () => {
	const logout = async () => {
		try {
			await authService.signOut();
			router.replace("/(auth)/SignIn");
		} catch (error) {
			console.error("Error signing out:", error);
		}
	};

	return {
		logout,
	};
};
