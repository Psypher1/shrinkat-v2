<script setup>
const user = useSupabaseUser;
</script>

<template>
	<section>
		<h1 class="text-center text-4xl font-bold">Shrinkat</h1>
		<div class="mt-12 grid place-items-center">
			<NuxtImg src="/meerkat.png" alt="" class="w-24" />
			<p class="mt-4 text-2xl font-semibold">
				This is <span class="text-brand-100 italic">shrinky</span>, he likes making things
				tiny.
			</p>
			<p class="mt-1 text-xl">Give him a link and see...</p>
		</div>

		<div class="mt-8 grid place-items-center">
			<UButton :to="user ? '/dashboard' : '/auth/sign-in'" size="xl">
				{{ user ? "Dashboard" : "Sign In" }}
			</UButton>
		</div>
	</section>
	<section class="mt-16">
		<h2 class="text-center text-xl font-medium capitalize">Shrinky's Top Links</h2>
	</section>
</template>
