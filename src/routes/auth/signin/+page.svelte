<script lang="ts">
	import { enhance } from '$app/forms';
	import Icon from '$comp/widgets/Icon.svelte';
	import { TITLE } from '$lib/helper';
	import type { SubmitFunction } from './$types';

	export let form;

	let show_password = false;
	let loading = false;

	const handleSubmit: SubmitFunction = ({ formElement, formData, action, cancel, submitter }) => {
		loading = true;
		return async ({ update }: { update: any }) => {
			loading = false;
			update();
		};
	};
</script>

<svelte:head>
	<title>{TITLE} Sign In</title>
	<meta
		name="description"
		content="SignIn to LePtitCoin to see your published and liked listings."
	/>
</svelte:head>

<section id="signin" class="flex h-full w-full justify-center md:items-center">
	<form
		action="/auth/signin"
		method="post"
		class="card mx-2 mt-3 flex h-fit w-full flex-col gap-6 p-5 md:mt-0 md:w-2/3 lg:w-1/3"
		use:enhance={handleSubmit}
	>
		{#if form?.message}
			<p class="mx-auto text-error-500">{form.message}</p>
		{/if}
		<p class="text-center">
			Don't have an account yet? <a
				href="/auth/signup"
				class="anchor"
				aria-label="create an account">Create one.</a
			>
		</p>
		<section>
			<label for="email">Email</label>
			<!-- svelte-ignore a11y-autofocus -->
			<input
				type="email"
				id="email"
				name="email"
				class="input"
				autofocus
				autocomplete="email"
				aria-label="email"
				value={form?.email || ''}
				required
			/>
		</section>

		<section>
			<label for="password">Password</label>
			<div class="input-group flex flex-row">
				<input
					type={show_password ? 'text' : 'password'}
					id="password"
					name="password"
					class="w-full"
					autocomplete="current-password"
					aria-label="password"
					value={form?.password || ''}
					required
				/>
				<button
					type="button"
					aria-label="show password"
					on:click={() => (show_password = !show_password)}
				>
					{#if show_password}
						<Icon name="eye_closed" />
					{:else}
						<Icon name="eye_opened" />
					{/if}
				</button>
			</div>
			<a href="/auth/forgot-password" class="anchor" aria-label="forgot password?"
				>Forgot password ?</a
			>
		</section>

		<button
			type="submit"
			id="submit"
			aria-label="sign in"
			class="btn variant-ghost-surface mx-auto w-fit"
			disabled={loading}>{loading ? 'Loading... ' : 'Sign In'}</button
		>
	</form>
</section>
