import { LoadingComponent } from "@/src/components/Loading";
import { COLORS } from "@/src/constants/colors";
import type { Travel } from "@/src/hooks/useTravelList";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { Link } from "expo-router";
import { useCallback } from "react";
import {
	Platform,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type DetailTravelScreenProps = {
	travel: Travel | null;
	loading: boolean;
	handleDeleteTravel: () => Promise<void>;
};

export const DetailTravelScreen = ({
	loading,
	travel,
	handleDeleteTravel,
}: DetailTravelScreenProps) => {
	const formatDate = useCallback((date: string) => {
		return format(parseISO(date), "dd MMMM yyyy", {
			locale: ptBR,
		});
	}, []);

	if (loading || !travel) {
		return <LoadingComponent />;
	}

	return (
		<SafeAreaView style={styles.safeArea}>
			<View style={styles.container}>
				<View style={styles.row}>
					<Link href="/(panel)/Home">
						<Feather name="arrow-left" size={40} color={COLORS.white} />
					</Link>

					<Text style={styles.title}>Planejei</Text>
				</View>

				<View style={{ marginTop: 14 }}>
					<Text style={styles.header}>Detalhes da sua viagem para</Text>
					<Text
						style={[styles.header, { marginBottom: 14, fontWeight: "bold" }]}
					>
						{travel.city}
					</Text>
				</View>

				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={[styles.infoRow, { marginBottom: 8 }]}>
						<MaterialCommunityIcons
							name="airplane-takeoff"
							size={24}
							color={COLORS.white}
						/>
						<Text style={styles.infoText}>{formatDate(travel.start_date)}</Text>
					</View>
					<View style={styles.infoRow}>
						<MaterialCommunityIcons
							name="airplane-landing"
							size={24}
							color={COLORS.white}
						/>
						<Text style={styles.infoText}>{formatDate(travel.end_date)}</Text>
					</View>

					<View style={styles.card}>
						<Text style={styles.label}>Cidade:</Text>
						<Text style={styles.value}>{travel?.city}</Text>

						<Text style={styles.label}>Endereço hotel:</Text>
						<Text style={styles.value}>{travel?.hotel_address}</Text>

						<Pressable style={styles.deleteButton} onPress={handleDeleteTravel}>
							<Text style={styles.deleteButtonText}>Excluir viagem</Text>
						</Pressable>
					</View>

					<Text style={styles.sectionTitle}>Lembretes</Text>

					<View style={styles.reminderInputContainer}>
						<TextInput
							placeholder="Digite um lembrete..."
							style={styles.reminderInput}
							placeholderTextColor={COLORS.gray100}
						/>

						<Pressable style={styles.addButton}>
							<Text style={{ color: COLORS.white }}>+</Text>
						</Pressable>
					</View>

					<View style={styles.spacingVertical}>
						<View style={styles.reminderItem}>
							<Text style={styles.reminderText}>
								Lembrar de pegar a chave do AP
							</Text>

							<Pressable>
								<Feather name="trash" size={20} color={COLORS.red} />
							</Pressable>
						</View>
					</View>
				</ScrollView>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: COLORS.zinc,
		padding: Platform.OS === "ios" ? 16 : 0,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		gap: 14,
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
	header: {
		color: COLORS.white,
		fontSize: 24,
	},
	infoRow: {
		flexDirection: "row",
		alignItems: "center",
	},
	infoText: {
		color: COLORS.white,
		fontSize: 16,
		marginLeft: 8,
	},
	card: {
		backgroundColor: COLORS.white,
		padding: 16,
		borderRadius: 4,
		marginTop: 16,
		marginBottom: 16,
	},
	label: {
		color: COLORS.zinc,
		marginBottom: 4,
	},
	value: {
		color: COLORS.black,
		fontSize: 16,
		fontWeight: "500",
		marginBottom: 8,
	},
	deleteButton: {
		backgroundColor: "transparent",
		borderWidth: 1,
		borderColor: COLORS.red,
		padding: 8,
		borderRadius: 4,
		alignItems: "center",
		justifyContent: "center",
	},
	deleteButtonText: {
		color: COLORS.red,
		fontWeight: "500",
	},
	sectionTitle: {
		color: COLORS.white,
		fontSize: 18,
		marginBottom: 8,
		fontWeight: "600",
	},
	reminderInputContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: COLORS.gray200,
		borderRadius: 8,
		paddingHorizontal: 8,
		marginBottom: 14,
		paddingTop: 8,
		paddingBottom: 8,
	},
	reminderInput: {
		flex: 1,
		color: COLORS.white,
		paddingVertical: 8,
	},
	addButton: {
		backgroundColor: COLORS.orange,
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderRadius: 4,
	},
	spacingVertical: {
		marginBottom: 14,
	},
	reminderItem: {
		backgroundColor: COLORS.gray200,
		padding: 10,
		borderRadius: 8,
		marginBottom: 14,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	reminderText: {
		color: COLORS.white,
		flex: 1,
	},
});
