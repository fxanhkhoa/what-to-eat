<script lang="ts">
	import '../i18n';
	import Toaster from '$lib/components/common/Toaster.svelte';
	import './styles.css';
	import '../app.scss';
</script>

<Toaster />

<slot />
