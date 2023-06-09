<script lang="ts">
	import { page } from '$app/stores';
	import ListingRow from '$comp/listing/ListingRow.svelte';
	import ValidateListingButton from '$comp/listing/ValidateListingButton.svelte';
	import UserCardAdmin from '$comp/user/UserCardAdmin.svelte';
	import { TITLE } from '$lib/helper';
	import { supaUserStore } from '$lib/store';
	import type { SupaListing, SupaUser } from '$lib/types';
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';

	export let data: { listings: SupaListing[] | null; users: SupaUser[] | null };

	$: manageWhat = $page.url.searchParams.get('q') || 'listings';

	let { listings, users } = data;
	$: ({ listings, users } = data);
</script>

<svelte:head>
	<title>{TITLE} Admin Dashboard</title>
	<meta name="description" content="Monitor and manage users and listings." />
</svelte:head>

<section
	id="admin-dashboard"
	class="m-2 mx-auto flex h-full w-full flex-col gap-2 xl:w-[90%] 2xl:w-[70%]"
>
	<h3 class="h3 mx-auto">
		Admin Dashboard - {$supaUserStore?.username}
	</h3>

	<div class="mx-auto">
		<RadioGroup>
			<RadioItem bind:group={manageWhat} value="listings" name="listings"
				><a href="?q=listings">Listings</a></RadioItem
			>
			<RadioItem bind:group={manageWhat} value="users" name="users"
				><a href="?q=users">Users</a></RadioItem
			>
		</RadioGroup>
	</div>

	<div class="flex flex-col">
		{#if listings}
			<section id="listings" class="flex flex-col gap-2">
				{#each listings as listing}
					<div class="flex w-full gap-2 transition-all duration-200 ease-in-out">
						<ListingRow {listing} />
						{#if !listing.isValidated && $supaUserStore && $supaUserStore?.role >= 8}
							<ValidateListingButton
								listing_uid={listing.uid}
								on:validated={(event) => (listing.isValidated = event.detail.success)}
							/>
						{/if}
					</div>
				{/each}
			</section>
		{:else if users}
			<section id="users" class="grid gap-4 md:grid-cols-3 xl:grid-cols-4">
				{#each users as user}
					<UserCardAdmin {user} />
				{/each}
			</section>
		{/if}
	</div>
</section>
