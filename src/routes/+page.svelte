<script lang="ts">
	import { redirect } from '@sveltejs/kit';
	import { getLocaleFromNavigator } from 'svelte-i18n';

	const lang = getLocaleFromNavigator() ?? 'en-US';
	redirect(301, `/${lang}`);
</script>
