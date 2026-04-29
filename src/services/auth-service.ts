import { supabase } from "../configs/supabase";

export const authService = {
	signUp: async (username: string, email: string, password: string) => {
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				data: {
					name: username,
				},
			},
		});

		if (error) {
			throw new Error(error.message);
		}

		return data;
	},
	signIn: async (email: string, password: string) => {
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			throw new Error(error.message);
		}

		return data;
	},
	signOut: async () => {
		const { error } = await supabase.auth.signOut();

		if (error) {
			throw new Error(error.message);
		}

		return true;
	},
	getLoggedUser: async () => {
		const { data, error } = await supabase.auth.getUser();

		if (error) {
			throw new Error(error.message);
		}

		return data;
	},
};
