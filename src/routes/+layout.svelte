<script>
	import '../app.pcss';
</script>

<slot />

<style lang="postcss">
	:global(body) {
		@apply text-indigo-100 bg-slate-900 mx-3;
	}
</style>