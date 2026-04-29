import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants/colors";

export const HomeScreen = () => {
	return (
		<SafeAreaView style={styles.safeArea}>
			<View style={styles.container}>
				<StatusBar backgroundColor={COLORS.zinc} barStyle="light-content" />
				<View style={styles.row}>
					<Text style={styles.title}>Planejei</Text>
					<View style={styles.contentLinks}>
						<Link href="/(panel)/Profile" style={styles.buttonAdd}>
							<Feather name="home" size={30} color={COLORS.white} />
						</Link>
						<Link
							href="/(panel)/Travel/NewTravel"
							style={[styles.buttonAdd, { backgroundColor: COLORS.orange }]}
						>
							<Feather name="plus" size={30} color={COLORS.white} />
						</Link>
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: COLORS.zinc,
		paddingTop: Platform.OS === "ios" ? 16 : 0,
	},
	container: {
		padding: 16,
		flex: 1,
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 16,
	},
	title: {
		color: COLORS.orange,
		fontSize: 30,
		fontWeight: "bold",
	},
	contentLinks: {
		flexDirection: "row",
		gap: 8,
		alignItems: "center",
		justifyContent: "center",
	},
	buttonAdd: {
		padding: 8,
		borderRadius: 99,
	},
});
