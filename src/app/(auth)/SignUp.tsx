import { useSignUp } from "@/src/hooks/useSignUp";
import { SignUpScreen } from "@/src/screens/SignUp";

export default function SignUp() {
	const { control, isSubmitting, errors, handleSubmit, onSubmit } = useSignUp();

	return (
		<SignUpScreen
			control={control}
			isSubmitting={isSubmitting}
			errors={errors}
			handleSubmit={handleSubmit}
			onSubmit={onSubmit}
		/>
	);
}
