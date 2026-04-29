import { Link } from "expo-router";
import {
	Image,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { COLORS } from "../constants/colors";

export const SignInScreen = () => {
	return (
		<ScrollView
			showsVerticalScrollIndicator={false}
			style={styles.container}
			contentContainerStyle={styles.contentContainer}
		>
			<View style={styles.centerView}>
				<StatusBar backgroundColor={COLORS.zinc} barStyle="light-content" />
				<Image source={require("../assets/logo.png")} style={styles.logo} />

				<TextInput
					placeholder="Digite seu email..."
					placeholderTextColor={COLORS.gray50}
					style={styles.input}
					autoCapitalize="none"
					keyboardType="email-address"
					autoComplete="email"
				/>

				<TextInput
					placeholder="*********"
					placeholderTextColor={COLORS.gray50}
					style={styles.input}
					secureTextEntry
					autoCapitalize="none"
					autoComplete="password"
				/>

				<TouchableOpacity style={styles.button}>
					<Text style={styles.buttonText}>Acessar conta</Text>
				</TouchableOpacity>

				<Link href="/(auth)/SignUp" style={styles.link}>
					Não tem uma conta? Cadastre-se
				</Link>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.zinc,
	},
	contentContainer: {
		flexGrow: 1,
	},
	centerView: {
		flex: 1,
		padding: 16,
		justifyContent: "center",
		backgroundColor: COLORS.zinc,
	},
	logo: {
		width: 150,
		height: 150,
		alignSelf: "center",
		marginBottom: 34,
	},
	input: {
		backgroundColor: COLORS.white,
		borderWidth: 1,
		borderColor: COLORS.gray100,
		borderRadius: 4,
		marginBottom: 12,
		padding: 12,
	},
	button: {
		backgroundColor: COLORS.orange,
		borderRadius: 4,
		padding: 12,
		alignItems: "center",
		justifyContent: "center",
	},
	buttonText: {
		color: COLORS.white,
		fontSize: 16,
		fontWeight: "bold",
	},
	link: {
		color: COLORS.white,
		marginTop: 16,
		textAlign: "center",
	},
});
