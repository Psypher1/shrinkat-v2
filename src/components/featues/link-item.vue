<script setup>
const config = useRuntimeConfig();
const appUrl = config.public.appUrl;
const toast = useToast();

const props = defineProps({
	link: {
		type: Object,
		required: true,
	},
});

const isCopied = ref(false);

function handleCopy() {
	navigator.clipboard.writeText(`${appUrl}/${props.link.key}`);
	isCopied.value = true;

	toast.add({ title: "Copied", description: "Copied to clipboard", color: "success" });

	setTimeout(() => {
		isCopied.value = false;
	}, 2000);
}
</script>

<template>
	<UCard>
		<div class="item-center flex justify-between">
			<div>
				<NuxtLink :to="`/dashboard/${link.id}`">
					<p class="text-2xl font-semibold text-kat-300">{{ link.key }}</p>
				</NuxtLink>
				<p class="truncate text-sm">
					{{
						link.long_url.length > 20
							? link.long_url.slice(0, 20) + "..."
							: link.long_url
					}}
				</p>
			</div>
			<UButton @click="handleCopy" size="xl" class="size-10 rounded-full">
				<Icon v-if="isCopied" name="lucide:check" />
				<Icon v-else name="lucide:copy" />
			</UButton>
		</div>
	</UCard>
</template>
