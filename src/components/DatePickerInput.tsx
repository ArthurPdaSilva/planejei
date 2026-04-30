import { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Calendar, type DateData } from "react-native-calendars";
import { COLORS } from "../constants/colors";

type DatePickerInputProps = {
	label: string;
	minDate?: string;
	value: string;
	onChange: (date: string) => void;
};

export const DatePickerInput = ({
	label,
	value,
	minDate,
	onChange,
}: DatePickerInputProps) => {
	const [modalVisible, setModalVisible] = useState(false);

	const handleDayPress = (day: DateData) => {
		onChange(day.dateString);
		setModalVisible(false);
	};

	return (
		<View style={styles.safeArea}>
			<Text style={styles.label}>{label}</Text>
			<TouchableOpacity
				style={styles.input}
				onPress={() => setModalVisible(true)}
			>
				<Text style={{ color: value ? COLORS.orange : COLORS.gray50 }}>
					{value
						? new Intl.DateTimeFormat("pt-BR").format(new Date(value))
						: "Selecionar data..."}
				</Text>
			</TouchableOpacity>

			<Modal
				animationType="fade"
				transparent
				visible={modalVisible}
				onRequestClose={() => setModalVisible(false)}
			>
				<View style={styles.modalOverlay}>
					<View style={styles.modalContent}>
						<Calendar
							minDate={minDate || new Date().toISOString().split("T")[0]}
							onDayPress={handleDayPress}
							markedDates={
								value
									? {
											[value]: {
												selected: true,
												selectedColor: COLORS.orange,
												marked: true,
											},
										}
									: {}
							}
						/>

						<TouchableOpacity
							style={styles.closeButton}
							onPress={() => setModalVisible(false)}
						>
							<Text style={{ fontWeight: "bold", color: COLORS.red }}>
								Voltar
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	safeArea: {
		marginBottom: 16,
	},
	label: {
		color: COLORS.white,
		marginBottom: 4,
	},
	input: {
		backgroundColor: COLORS.white,
		padding: 12,
		borderRadius: 4,
		justifyContent: "center",
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.4)",
		justifyContent: "center",
		padding: 24,
	},
	modalContent: {
		backgroundColor: COLORS.white,
		borderRadius: 16,
		padding: 16,
	},
	closeButton: {
		marginTop: 16,
		marginBottom: 8,
		alignItems: "center",
	},
});
