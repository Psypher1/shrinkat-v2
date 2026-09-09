<script setup>
import * as z from "zod";
const config = useRuntimeConfig();
const appUrl = config.public.appUrl;
console.log("🚀 ~ appUrl:", appUrl);

const toast = useToast();
const supabase = useSupabaseClient();

const schema = z.object({
	email: z.email("Invalid is required"),
});
const state = reactive({
	email: "",
	password: "",
});

async function signInOTP(event) {
	const { email } = event.data;

	const { error } = await supabase.auth.signInWithOtp({
		email,
		options: { emailRedirectTo: `${appUrl}/auth/confirm` },
	});

	if (error) {
		toast.add({ title: "Couldn't send link", description: error.message, color: "error" });
		return;
	}

	// toast.add({
	// 	title: "Check your email",
	// 	description: "We sent you a magic link to sign in.",
	// });

	navigateTo({ path: "/auth/check-email", query: { email } });
}
</script>

<template>
	<div class="flex flex-col items-center justify-center gap-4 p-4">
		<UCard title="Sign In" description="We'll send you a magic link" class="w-full max-w-md">
			<template #header>
				<div class="flex flex-col items-center justify-center gap-1">
					<Icon name="lucide:user-lock" size="24" class="cursor-pointer" />
					<h2 class="text-xl font-semibold">Sign In</h2>
					<p class="text-gray-500">Well send a magic link to your email.</p>
				</div>
			</template>

			<UForm :schema="schema" :state="state" class="flex flex-col gap-4" @submit="signInOTP">
				<UFormField label="Email" name="email" size="lg" required>
					<UInput
						v-model="state.email"
						type="email"
						placeholder="Enter your email"
						class="w-full"
					/>
				</UFormField>

				<UButton type="submit" class="font-semibold" block size="lg">
					Send magic link
				</UButton>
			</UForm>
		</UCard>
	</div>
</template>
