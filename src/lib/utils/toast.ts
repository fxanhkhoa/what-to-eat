import { addToast } from '$lib/components/common/Toaster.svelte';

export const showSuccess = (description: string, title: string) => {
	addToast({
		data: {
			title: title,
			description: description,
			color: 'bg-green-500'
		}
	});
};

export const showError = (description: string, title: string) => {
	addToast({
		data: {
			title: title,
			description: description,
			color: 'bg-red-500'
		}
	});
};
