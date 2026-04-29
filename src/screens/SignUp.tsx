import { Link } from "expo-router";
import {
	type Control,
	Controller,
	type FieldErrors,
	type UseFormHandleSubmit,
} from "react-hook-form";
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
import type { SignUpFormData } from "../hooks/useSignUp";

type SignUpScreenProps = {
	control: Control<SignUpFormData>;
	isSubmitting: boolean;
	errors: FieldErrors<SignUpFormData>;
	handleSubmit: UseFormHandleSubmit<SignUpFormData>;
	onSubmit: (data: SignUpFormData) => Promise<void>;
};

export const SignUpScreen = ({
	control,
	isSubmitting,
	errors,
	handleSubmit,
	onSubmit,
}: SignUpScreenProps) => {
	return (
		<ScrollView
			showsVerticalScrollIndicator={false}
			style={styles.container}
			contentContainerStyle={styles.contentContainer}
		>
			<View style={styles.centerView}>
				<StatusBar backgroundColor={COLORS.zinc} barStyle="light-content" />
				<Image source={require("../assets/logo.png")} style={styles.logo} />

				<Controller
					control={control}
					name="username"
					render={({ field: { onChange, onBlur, value } }) => (
						<View>
							<TextInput
								placeholder="Digite seu nome completo..."
								placeholderTextColor={COLORS.gray50}
								style={styles.input}
								autoCapitalize="none"
								keyboardType="email-address"
								autoComplete="email"
								value={value}
								onChangeText={onChange}
								onBlur={onBlur}
							/>
							{errors.username && (
								<Text style={styles.errorText}>{errors.username.message}</Text>
							)}
						</View>
					)}
				/>

				<Controller
					control={control}
					name="email"
					render={({ field: { onChange, onBlur, value } }) => (
						<View>
							<TextInput
								placeholder="Digite seu email..."
								placeholderTextColor={COLORS.gray50}
								style={styles.input}
								autoCapitalize="none"
								keyboardType="email-address"
								autoComplete="email"
								value={value}
								onChangeText={onChange}
								onBlur={onBlur}
							/>
							{errors.email && (
								<Text style={styles.errorText}>{errors.email.message}</Text>
							)}
						</View>
					)}
				/>

				<Controller
					control={control}
					name="password"
					render={({ field: { onChange, onBlur, value } }) => (
						<View>
							<TextInput
								placeholder="Digite sua senha..."
								placeholderTextColor={COLORS.gray50}
								style={styles.input}
								secureTextEntry
								autoCapitalize="none"
								autoComplete="password"
								value={value}
								onChangeText={onChange}
								onBlur={onBlur}
							/>
							{errors.password && (
								<Text style={styles.errorText}>{errors.password.message}</Text>
							)}
						</View>
					)}
				/>

				<Controller
					control={control}
					name="confirmPassword"
					render={({ field: { onChange, onBlur, value } }) => (
						<View>
							<TextInput
								placeholder="Digite novamente sua senha..."
								placeholderTextColor={COLORS.gray50}
								style={styles.input}
								secureTextEntry
								autoCapitalize="none"
								autoComplete="password"
								value={value}
								onChangeText={onChange}
								onBlur={onBlur}
							/>
							{errors.confirmPassword && (
								<Text style={styles.errorText}>
									{errors.confirmPassword.message}
								</Text>
							)}
						</View>
					)}
				/>

				<TouchableOpacity
					style={styles.button}
					onPress={handleSubmit(onSubmit)}
					disabled={isSubmitting}
				>
					<Text style={styles.buttonText}>
						{isSubmitting ? "Criando conta..." : "Criar conta"}
					</Text>
				</TouchableOpacity>

				<Link href="/(auth)/SignIn" style={styles.link}>
					Já tem uma conta? Faça login
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
	errorText: {
		color: COLORS.red,
		marginBottom: 8,
	},
});
