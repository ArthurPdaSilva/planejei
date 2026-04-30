import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LoadingComponent } from "../components/Loading";
import { COLORS } from "../constants/colors";
import type { UseProfileReturn } from "../hooks/useProfile";

export const ProfileScreen = ({
	logout,
	loading,
	profile,
}: UseProfileReturn) => {
	const router = useRouter();

	if (loading) {
		return <LoadingComponent />;
	}

	return (
		<SafeAreaView style={styles.safeArea}>
			<View style={styles.container}>
				<View style={styles.row}>
					<Pressable onPress={() => router.back()}>
						<Feather name="arrow-left" size={40} color={COLORS.white} />
					</Pressable>

					<Text style={styles.title}>Meu perfil</Text>
				</View>

				<View style={styles.card}>
					<Text style={styles.label}>Nome completo:</Text>
					<Text style={styles.value}>
						{profile?.name || "Nome não disponível"}
					</Text>

					<Text style={styles.label}>Email:</Text>
					<Text style={styles.value}>
						{profile?.email || "Email não disponível"}
					</Text>

					<Text style={styles.label}>Conta criada em:</Text>
					<Text style={styles.value}>
						{profile?.createdAt || "Data não disponível"}
					</Text>
				</View>

				<Pressable style={styles.logoutButton} onPress={logout}>
					<Text style={styles.logoutButtonText}>Sair da conta</Text>
				</Pressable>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	center: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	safeArea: {
		flex: 1,
		backgroundColor: COLORS.zinc,
		padding: Platform.OS === "ios" ? 16 : 0,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		gap: 14,
		marginBottom: 16,
	},
	title: {
		fontSize: 30,
		color: COLORS.orange,
		fontWeight: "600",
	},
	container: {
		flex: 1,
		padding: 16,
	},
	card: {
		backgroundColor: COLORS.gray200,
		borderRadius: 8,
		padding: 16,
		marginBottom: 16,
	},
	label: {
		fontSize: 16,
		fontWeight: "500",
		marginBottom: 4,
		color: COLORS.white,
	},
	value: {
		color: COLORS.gray100,
		marginBottom: 14,
	},
	logoutButton: {
		borderWidth: 1,
		borderColor: COLORS.red,
		borderRadius: 4,
		padding: 8,
		alignItems: "center",
		justifyContent: "center",
	},
	logoutButtonText: {
		color: COLORS.red,
	},
});
