<script lang="ts">
	import { drawerStore } from '@skeletonlabs/skeleton';

	export let href = '';
	export let reload = false;
	export let keep_opened = false;

	function closeDrawer(): void {
		if (!keep_opened) drawerStore.close();
	}
</script>

<li>
	{#if href}
		{#if reload}
			<a {href} class="flex w-full gap-1" on:click={closeDrawer} data-sveltekit-reload>
				<slot />
			</a>
		{:else}
			<a {href} class="flex w-full gap-1" on:click={closeDrawer}>
				<slot />
			</a>
		{/if}
	{:else}
		<button class="flex w-full gap-1" on:click={closeDrawer}><slot /></button>
	{/if}
</li>
