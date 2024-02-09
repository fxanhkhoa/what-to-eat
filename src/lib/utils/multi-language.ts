import { lANGUAGES } from '$lib/constant/multi-language';
import type { MultiLanguage } from '$lib/type/multi-language.type';

export const initStringMultiLanguage = (): MultiLanguage<string>[] => {
	return lANGUAGES.map((lang) => ({
		lang: lang === 'en-US' ? 'en' : lang,
		data: ''
	}));
};

export const getLanguageCode = (code: string) => {
	if (code === 'en') {
		return 'en-US';
	}

	return code;
};
