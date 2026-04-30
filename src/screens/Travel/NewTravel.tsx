import { DatePickerInput } from "@/src/components/DatePickerInput";
import { COLORS } from "@/src/constants/colors";
import type { TravelFormData } from "@/src/hooks/useCreateTravel";
import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";
import {
	type Control,
	Controller,
	type FieldErrors,
	type UseFormHandleSubmit,
	useWatch,
} from "react-hook-form";
import {
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type NewTravelScreenProps = {
	control: Control<TravelFormData>;
	isSubmitting: boolean;
	errors: FieldErrors<TravelFormData>;
	handleSubmit: UseFormHandleSubmit<TravelFormData>;
	createNewTravel: (data: TravelFormData) => Promise<void>;
};

export default function NewTravelScreen({
	control,
	isSubmitting,
	errors,
	handleSubmit,
	createNewTravel,
}: NewTravelScreenProps) {
	const startDate = useWatch({
		control,
		name: "start_date",
	});

	return (
		<SafeAreaView style={styles.safeArea}>
			<ScrollView style={styles.container}>
				<View style={styles.row}>
					<Link href="/(panel)/Home">
						<Feather name="arrow-left" size={40} color={COLORS.white} />
					</Link>
					<Text style={styles.title}>Planejei</Text>
				</View>
				<Text style={styles.subtitle}>Vamos cadastrar sua próxima viagem!</Text>

				<Controller
					control={control}
					name="title"
					render={({ field: { onChange, onBlur, value } }) => (
						<View style={styles.field}>
							<Text style={styles.label}>Objetivo da viagem</Text>
							<TextInput
								placeholder="Digite o título da viagem..."
								placeholderTextColor={COLORS.gray50}
								style={styles.input}
								value={value}
								onChangeText={onChange}
								onBlur={onBlur}
							/>
							{errors.title && (
								<Text style={styles.errorText}>{errors.title.message}</Text>
							)}
						</View>
					)}
				/>

				<Controller
					control={control}
					name="city"
					render={({ field: { onChange, onBlur, value } }) => (
						<View style={styles.field}>
							<Text style={styles.label}>Cidade/Estado</Text>
							<TextInput
								placeholder="Digite a cidade e o estado..."
								placeholderTextColor={COLORS.gray50}
								style={styles.input}
								value={value}
								onChangeText={onChange}
								onBlur={onBlur}
							/>
							{errors.city && (
								<Text style={styles.errorText}>{errors.city.message}</Text>
							)}
						</View>
					)}
				/>

				<Text style={styles.categoryDescription}>Detalhes da viagem</Text>

				<Controller
					control={control}
					name="hotel_address"
					render={({ field: { onChange, onBlur, value } }) => (
						<View style={styles.field}>
							<Text style={styles.label}>Endereço do hotel</Text>
							<TextInput
								placeholder="Digite o endereço do hotel..."
								placeholderTextColor={COLORS.gray50}
								style={styles.input}
								value={value}
								onChangeText={onChange}
								onBlur={onBlur}
							/>
							{errors.hotel_address && (
								<Text style={styles.errorText}>
									{errors.hotel_address.message}
								</Text>
							)}
						</View>
					)}
				/>

				<Controller
					control={control}
					name="start_date"
					render={({ field: { onChange, value } }) => (
						<>
							<DatePickerInput
								label="Selecione a data de ida"
								value={value}
								onChange={onChange}
							/>
							{errors.start_date && (
								<Text style={styles.errorText}>
									{errors.start_date.message}
								</Text>
							)}
						</>
					)}
				/>

				{startDate && (
					<Controller
						control={control}
						name="end_date"
						render={({ field: { onChange, value } }) => (
							<>
								<DatePickerInput
									label="Selecione a data de volta"
									minDate={startDate}
									value={value}
									onChange={onChange}
								/>
								{errors.end_date && (
									<Text style={styles.errorText}>
										{errors.end_date.message}
									</Text>
								)}
							</>
						)}
					/>
				)}

				<TouchableOpacity
					style={styles.button}
					onPress={handleSubmit(createNewTravel)}
					disabled={isSubmitting}
				>
					<Text style={styles.buttonText}>
						{isSubmitting ? "Cadastrando..." : "Cadastrar Viagem"}
					</Text>
				</TouchableOpacity>
			</ScrollView>
		</SafeAreaView>
	);
}

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
		alignItems: "center",
		gap: 14,
	},
	title: {
		fontSize: 30,
		fontWeight: "bold",
		color: COLORS.orange,
	},
	subtitle: {
		fontSize: 22,
		color: COLORS.white,
		marginVertical: 14,
		fontWeight: "500",
	},
	field: {
		marginBottom: 12,
	},
	categoryDescription: {
		color: COLORS.white,
		fontSize: 18,
		marginVertical: 16,
		fontWeight: "500",
	},
	label: {
		color: COLORS.white,
		marginBottom: 4,
		fontWeight: "500",
	},
	input: {
		backgroundColor: COLORS.white,
		borderRadius: 4,
		padding: 12,
	},
	errorText: {
		color: COLORS.red,
		marginBottom: 8,
	},
	button: {
		backgroundColor: COLORS.orange,
		padding: 12,
		borderRadius: 4,
		alignItems: "center",
		justifyContent: "center",
	},
	buttonText: {
		color: COLORS.white,
		fontWeight: "bold",
	},
});
