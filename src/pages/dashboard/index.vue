<script setup>
definePageMeta({
	middleware: ["auth"],
});

import { z } from "zod";
const supabase = useSupabaseClient();

const user = useSupabaseUser();

import { nanoid } from "nanoid";
const toast = useToast();

const schema = z.object({
	long_url: z.string().min(1, "Long URL is required").url("Must be a valid URL"),
	key: z.string().min(1, "Short Key is required"),
});

const state = reactive({
	long_url: "",
	key: "",
});

async function onSubmit(event) {
	const { long_url, key } = event.data;
	console.log(long_url, key);

	console.log("user at submit time:", user.value.sub);

	if (!user.value) {
		toast.add({
			title: "Error",
			description: "You must be signed in to create a link.",
			color: "error",
		});
		return;
	}

	try {
		const { data, error } = await supabase.from("links").insert({
			long_url,
			key,
			user_id: user.value?.sub,
		});

		if (error) {
			toast.add({ title: "Error", description: error.message, color: "error" });
			return;
		}

		if (data) {
			createShortKey();
			state.long_url = "";
			toast.add({ title: "Success", description: "Link created" });
			return;
		}
		toast.add({ title: "Success", description: "Link created" });
	} catch (error) {
		toast.add({ title: "Error", description: error.message, color: "error" });
	}
}
console.log("user keys:", Object.keys(user.value));
console.log("user json:", JSON.stringify(user.value));
console.log("user.value.id specifically:", user.value.id);

watch(user, (val) => console.log("user changed:", val), { immediate: true });

onMounted(() => {
	console.log("user on mount:", user.value);
});

function createShortKey() {
	state.key = nanoid(6);
}

async function signOut() {
	const { error } = await supabase.auth.signOut();
	if (error) console.log(error);
}

const links = [
	{
		key: "/Lmdkela",
		long_url: "dantealighieri.com",
	},
	{
		key: "/Lddkela",
		long_url: "danteofsparda.com",
	},
	{
		key: "/Smghlel",
		long_url: "languagehub.com",
	},
];

onMounted(() => {
	createShortKey();
});
</script>

<template>
	<div class="mx-auto max-w-5xl">
		<h1 class="text-5xl font-semibold">Dashboard</h1>

		<section class="mt-6">
			<UCard class="h-32">
				<UForm
					:state="state"
					:schema="schema"
					@submit="onSubmit"
					class="flex items-end gap-5"
				>
					<UFormField label="Long URL" name="long_url" class="flex-1" size="xl">
						<UInput
							v-model="state.long_url"
							placeholder="Enter long url"
							class="w-full"
						/>
					</UFormField>
					<UFormField label="Short Key" name="key" class="flex-1" size="xl">
						<UInput
							readonly
							v-model="state.key"
							placeholder="Short key"
							class="w-full"
						/>
					</UFormField>
					<UButton type="submit" sized="xl" class="h-fit">Shrink</UButton>
				</UForm>
			</UCard>
		</section>

		<section class="mt-12 space-y-4">
			<LinkItem v-for="link in links" :link="link" />
			<!-- <UCard class="">
				<div class="item-center flex justify-between">
					<div>
						<p class="text-2xl font-semibold text-kat-300">/Lm1dksh</p>
						<p class="text-sm">https://dantedeck.com</p>
					</div>
					<UButton icon="lucide:copy" size="xl" class="size-10 rounded-full" />
				</div>
			</UCard> -->
		</section>
	</div>
</template>
