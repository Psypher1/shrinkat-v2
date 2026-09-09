<script setup>
const route = useRoute();
const email = route.query.email;
</script>

<template>
	<div class="flex flex-col items-center justify-center gap-4 p-4">
		<UCard class="w-full max-w-md">
			<template #header>
				<div class="flex flex-col items-center justify-center gap-1">
					<Icon name="lucide:mail-check" size="24" />
					<h2 class="text-xl font-semibold">Check your email</h2>
				</div>
			</template>

			<p class="text-center text-gray-500">
				We sent a magic link to
				<span class="font-medium text-gray-900">{{ email }}</span
				>. Click it to sign in.
			</p>

			<template #footer>
				<div class="flex justify-center">
					<UButton variant="ghost" to="/auth/sign-in">Use a different email</UButton>
				</div>
			</template>
		</UCard>
	</div>
</template>
