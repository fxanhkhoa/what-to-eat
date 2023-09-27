import { addMessages, init, getLocaleFromNavigator } from 'svelte-i18n';

// register('en', () => import('./i18n/en.json'));
// register('vi', () => import('./i18n/vi.json'));

import en from './i18n/en.json';
import vi from './i18n/vi.json';

addMessages('en', en);
addMessages('vi', vi);


init({
	fallbackLocale: 'en',
	initialLocale: getLocaleFromNavigator()
});
