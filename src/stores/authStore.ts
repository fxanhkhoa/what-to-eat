import type { User } from 'firebase/auth';
import { writable } from 'svelte/store';

export type AuthStore = {
	isLoading: boolean;
	currentUser: User | null;
};

export const authStore = writable<AuthStore>({
	isLoading: true,
	currentUser: null
});
