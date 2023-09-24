import { register, init, getLocaleFromNavigator } from 'svelte-i18n';

register('en', () => import('./i18n/en.json'));
register('vi', () => import('./i18n/vi.json'));

init({
	fallbackLocale: 'en',
	initialLocale: getLocaleFromNavigator()
});
