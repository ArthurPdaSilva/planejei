import { Feather } from "@expo/vector-icons";
import {
	differenceInCalendarDays,
	endOfDay,
	format,
	isBefore,
	isWithinInterval,
	parseISO,
} from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { Link, router } from "expo-router";
import { useCallback, useMemo } from "react";
import {
	FlatList,
	Platform,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LoadingComponent } from "../components/Loading";
import { COLORS } from "../constants/colors";
import type { Travel } from "../hooks/useTravelList";

type HomeScreenProps = {
	travels: Travel[];
	loading: boolean;
};

export const HomeScreen = ({ travels, loading }: HomeScreenProps) => {
	const [nextTravel, ...otherTravels] = travels;

	const statusMessage = useMemo(() => {
		const today = new Date();
		if (!nextTravel) {
			return "Nenhuma viagem planejada";
		}

		const startDate = parseISO(nextTravel?.start_date);
		const endDate = parseISO(nextTravel?.end_date);

		if (isBefore(today, startDate)) {
			const daysUntilStart = differenceInCalendarDays(startDate, today);
			return `Faltam ${daysUntilStart} dias para a viagem!`;
		} else if (
			isWithinInterval(today, { start: startDate, end: endOfDay(endDate) })
		) {
			return "Sua viagem está acontecendo agora!";
		}
	}, [nextTravel?.end_date, nextTravel?.start_date, nextTravel]);

	const formatDateRange = useCallback((startDate: string, endDate: string) => {
		const formatStartDate = format(parseISO(startDate), "dd MMMM", {
			locale: ptBR,
		});
		const formatEndDate = format(parseISO(endDate), "dd MMMM yyyy", {
			locale: ptBR,
		});

		return `${formatStartDate} até ${formatEndDate}`;
	}, []);

	if (loading) {
		return <LoadingComponent />;
	}

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

				{/* Card viagem destaque*/}
				{nextTravel && (
					<View style={styles.highlightCard}>
						<Text style={styles.highlightTitle}>{statusMessage}</Text>
						<Text style={styles.rangeText}>
							{formatDateRange(nextTravel.start_date, nextTravel.end_date)}
						</Text>
						<Text style={styles.highlightCity}>{nextTravel.city}</Text>

						<TouchableOpacity
							onPress={() =>
								router.push(`/(panel)/Travel/Detail/${nextTravel.id}`)
							}
							activeOpacity={0.4}
							style={styles.buttonDetails}
						>
							<Text style={styles.buttonDetailsText}>Acessar viagem</Text>
						</TouchableOpacity>
					</View>
				)}

				{otherTravels.length > 0 && (
					<>
						<Text style={styles.subTitle}>Próximas viagens</Text>
						<FlatList
							data={otherTravels}
							keyExtractor={(item) => item.id}
							renderItem={({ item }) => (
								<View style={styles.card}>
									<Text style={styles.cardRange}>
										{formatDateRange(item.start_date, item.end_date)}
									</Text>
									<Text style={styles.cardCity}>{item.city}</Text>

									<TouchableOpacity
										onPress={() =>
											router.push(`/(panel)/Travel/Detail/${item.id}`)
										}
										activeOpacity={0.4}
										style={styles.cardButton}
									>
										<Text style={styles.cardButtonText}>Acessar viagem</Text>
									</TouchableOpacity>
								</View>
							)}
						/>
					</>
				)}
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
	highlightCard: {
		backgroundColor: COLORS.white,
		padding: 24,
		marginBottom: 16,
		borderRadius: 8,
	},
	highlightTitle: {
		color: COLORS.zinc,
		fontSize: 16,
		marginBottom: 4,
		fontWeight: "500",
	},
	rangeText: {
		color: COLORS.gray,
	},
	highlightCity: {
		color: COLORS.zinc,
		fontSize: 18,
		fontWeight: "600",
		marginVertical: 14,
	},
	buttonDetails: {
		backgroundColor: COLORS.orange,
		padding: 8,
		borderRadius: 4,
		marginTop: 4,
		alignItems: "center",
		justifyContent: "center",
	},
	buttonDetailsText: {
		color: COLORS.white,
		fontWeight: "500",
	},
	subTitle: {
		color: COLORS.white,
		fontSize: 18,
		fontWeight: "600",
		marginTop: 14,
		marginBottom: 8,
	},
	card: {
		backgroundColor: COLORS.gray200,
		padding: 20,
		borderRadius: 8,
		marginBottom: 14,
	},
	cardRange: {
		color: COLORS.white,
		marginBottom: 8,
	},
	cardCity: {
		color: COLORS.white,
		fontSize: 18,
		fontWeight: "600",
		marginBottom: 14,
	},
	cardButton: {
		backgroundColor: COLORS.white,
		padding: 8,
		borderRadius: 4,
		alignItems: "center",
		justifyContent: "center",
	},
	cardButtonText: {
		color: COLORS.zinc,
		fontWeight: "500",
	},
});
