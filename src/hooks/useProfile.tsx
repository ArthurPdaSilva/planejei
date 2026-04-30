import { router } from "expo-router";
import { useEffect, useState } from "react";
import { authService } from "../services/auth-service";

export type UseProfileReturn = {
	logout: () => Promise<void>;
	loading: boolean;
	profile: UserProfile | null;
};

export type UserProfile = {
	id: string;
	email: string;
	name: string;
	createdAt: string;
};

export const useProfile = (): UseProfileReturn => {
	const [loading, setLoading] = useState(false);
	const [profile, setProfile] = useState<UserProfile | null>(null);

	useEffect(() => {
		const loadUserProfile = async () => {
			setLoading(true);
			try {
				const { user } = await authService.getLoggedUser();
				if (!user) {
					router.replace("/(auth)/SignIn");
				}
				setProfile({
					id: user.id,
					email: user.email || "",
					name: user.user_metadata.name || "",
					createdAt: new Date(user.created_at).toLocaleDateString("pt-BR"),
				});
			} catch (error) {
				console.error("Error loading user profile:", error);
				router.replace("/(auth)/SignIn");
			} finally {
				setLoading(false);
			}
		};

		loadUserProfile();
	}, []);

	const logout = async () => {
		setLoading(true);
		try {
			await authService.signOut();
			router.replace("/(auth)/SignIn");
		} catch (error) {
			console.error("Error signing out:", error);
		} finally {
			setLoading(false);
		}
	};

	return {
		logout,
		profile,
		loading,
	};
};
