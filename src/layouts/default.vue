<script setup>
const supabase = useSupabaseClient();
const user = useSupabaseUser();

const toast = useToast();

async function signOut() {
	const { error } = await supabase.auth.signOut();
	toast.add({ title: "Sign Out", description: "Signing you out" });
	return navigateTo("/auth/sign-in");
	return;
	if (error) console.log(error);
}
const links = [
	{
		label: "Home",
		to: "/",
	},
	{
		label: "Features",
		to: "/features",
	},
	{
		label: "Contact",
		to: "/contact",
	},
];

const items = computed(() => [
	[
		{
			label: user.value?.email ? user.value.email : "Nik Mutseyekwa",
			type: "label",
		},
	],
	[
		{
			label: "Dashboard",
			icon: "lucide:layout-grid",
			to: "/dashboard",
			component: "NuxtLink",
			// onSelect: () => (open.value = false),
		},
	],
	[
		{
			label: "Sign out",
			icon: "i-mdi-logout",
			color: "error",
			onSelect: signOut,
		},
	],
]);
</script>

<template>
	<div class="bg-">
		<UHeader class="bg-">
			<template #title>
				<div class="flex items-center">
					<NuxtImg src="/meerkat.png" class="w-8" alt="" />
					<span> Shrinkat </span>
				</div>
			</template>

			<template #body>
				<UNavigationMenu :items="links" orientation="vertical" />
			</template>
			<template #right>
				<UNavigationMenu :items="links" class="hidden md:flex" />
				<div v-if="user" class="flex gap-4">
					<!-- <UButton to="/dashboard" class="" size="md">Dashbord</UButton>
					<UButton @click="signOut" class="" variant="outline" color="error" size="md"
						>Sign out</UButton
					> -->
					<UDropdownMenu :items="items">
						<UButton class="" size="md" variant="ghost">
							<UUser
								:name="items[0][0].label"
								:avatar="{ src: 'https://github.com/psypher1.png' }"
							/>
						</UButton>
					</UDropdownMenu>
				</div>
				<div v-else class="flex gap-4">
					<UButton to="/auth/sign-in" class="" size="lg">Sign In</UButton>
				</div>
			</template>
		</UHeader>

		<UMain>
			<UContainer class="py-10">
				<slot />
			</UContainer>
		</UMain>
	</div>
</template>
