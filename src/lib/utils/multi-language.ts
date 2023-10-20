import { lANGUAGES } from '$lib/constant/multi-language';
import type { MultiLanguage } from '$lib/type/multi-language.type';

export const initStringMultiLanguage = (): MultiLanguage<string>[] => {
	return lANGUAGES.map((language) => ({
		language,
		data: ''
	}));
};
