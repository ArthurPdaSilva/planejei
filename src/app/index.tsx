import { ActivityIndicator, View } from "react-native";
import { COLORS } from "../constants/colors";

export default function Index() {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: COLORS.zinc,
			}}
		>
			<ActivityIndicator size="large" color={COLORS.orange} />
		</View>
	);
}
