import { toast } from '@zerodevx/svelte-toast';

export const showSuccess = (text: string) => {
	toast.push(text, {
		theme: {
			'--toastColor': 'mintcream',
			'--toastBackground': 'rgba(72,187,120,0.9)',
			'--toastBarBackground': '#2F855A'
		}
	});
};

export const showError = (text: string) => {
	toast.push(text, {
		theme: {
			'--toastColor': 'mintcream',
			'--toastBackground': '#d40202',
			'--toastBarBackground': '#b30000'
		}
	});
};
