<script lang="ts">
	import EditButton from '$comp/listing/EditListingButton.svelte';
	import LikeButton from '$comp/listing/LikeListingButton.svelte';
	import { formatDate } from '$lib/helper';
	import { searchStore, userStore } from '$lib/store';
	import type { SupaListing } from '$lib/types';
	import { fade } from 'svelte/transition';

	export let listing: SupaListing;
</script>

<div in:fade={{ duration: 100, delay: 100 }} class="card relative flex h-64 w-full">
	<header class="relative z-30 h-full w-3/5 xl:w-1/3">
		<img
			src={listing.picture
				? listing.picture
				: 'https://placehold.co/30x20/000000/FFFFFF?text=' + listing.title.split(' ')[0]}
			alt="listing"
			class="aspect-[4/5] h-full w-full rounded-l-[4px] border border-r-0 border-b-surface-500 border-l-surface-500 border-t-surface-500 object-cover"
		/>
	</header>
	<div class="flex w-full flex-col">
		<a
			href="/l/{listing.uid}"
			id="listing-{listing.uid}"
			class="group/listing-card flex h-full w-full flex-col justify-between"
			aria-label="title: {listing.title} category: {listing.category} price: {listing.price}€"
		>
			<div class="card-header">
				<div class="flex w-full justify-between">
					<h3 class="h3 group-hover/listing-card:underline">
						{listing.title}
					</h3>
					<p class="badge variant-ghost h-fit text-base italic">
						{listing.price} €
					</p>
				</div>
				<p>
					{listing.description}
				</p>
			</div>
		</a>
		<div class="card-footer">
			<div class="flex flex-col gap-2 font-bold italic opacity-70 lg:flex-row">
				<button
					on:click={() => ($searchStore.category = listing.category)}
					class="self-start hover:underline"
				>
					{listing.category}
				</button>
				<span class="hidden self-center text-[8px] not-italic lg:flex"> ● </span>
				<div class="flex gap-2">
					<a href="/u/{listing.author?.username}" class="hover:underline">
						{listing.author?.username}
					</a>
					<span class="flex self-center text-[8px] not-italic"> ● </span>
					{formatDate(listing.createdAt?.getTime() || 0)}
				</div>
			</div>
			<div class="absolute bottom-3 right-3 z-20 flex items-center gap-3">
				{#if listing.author_uid === $userStore?.id}
					<EditButton listing_uid={listing.uid} />
				{/if}
				{#if $userStore && listing.author_uid !== $userStore.id}
					<LikeButton listing_uid={listing.uid} />
				{/if}
			</div>
		</div>
	</div>
</div>
