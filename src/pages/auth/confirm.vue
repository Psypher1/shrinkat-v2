<script setup>
const route = useRoute();
const supabase = useSupabaseClient();
const toast = useToast();

const user = useSupabaseUser();

watch(
	user,
	() => {
		if (user.value) {
			// Redirect to protected page
			return navigateTo("/dashboard");
		}
	},
	{ immediate: true },
);

// const status = ref("verifying"); // 'verifying' | 'error'

// onMounted(async () => {
// 	const token_hash = route.query.token_hash;
// 	const type = route.query.type;

// 	if (!token_hash || !type) {
// 		status.value = "error";
// 		return;
// 	}

// 	const { error } = await supabase.auth.verifyOtp({ token_hash, type });

// 	if (error) {
// 		status.value = "error";
// 		toast.add({ title: "Link invalid or expired", description: error.message, color: "error" });
// 		return;
// 	}

// 	await navigateTo("/dashboard");
// });
</script>

<template>
	<div class="flex flex-col items-center justify-center gap-2 p-4">
		<p v-if="status === 'verifying'">Signing you in...</p>
		<div v-else class="text-center">
			<p>This link is invalid or has expired.</p>
			<NuxtLink to="/auth/sign-in" class="underline">Back to sign in</NuxtLink>
		</div>
	</div>
</template>
<!-- <script setup>
const user = useSupabaseUser();

watch(
	user,
	() => {
		if (user.value) {
			// Redirect to protected page
			return navigateTo("/dashboard");
		}
	},
	{ immediate: true },
);
</script>

<template>
	<div>Waiting for login...</div>
</template> -->
