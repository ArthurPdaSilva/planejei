import { useSignIn } from "@/src/hooks/useSignIn";
import { SignInScreen } from "@/src/screens/SignIn";

export default function SignIn() {
	const { control, isSubmitting, errors, handleSubmit, onSubmit } = useSignIn();

	return (
		<SignInScreen
			control={control}
			isSubmitting={isSubmitting}
			errors={errors}
			handleSubmit={handleSubmit}
			onSubmit={onSubmit}
		/>
	);
}
