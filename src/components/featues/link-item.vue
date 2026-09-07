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
	navigator.clipboard.writeText(appUrl + props.link.key);
	isCopied.value = true;

	toast.add({ title: "Copied", description: "Copied to clipboard", color: "success" });
}
</script>

<template>
	<UCard>
		<div class="item-center flex justify-between">
			<div>
				<p class="text-2xl font-semibold text-kat-300">{{ link.key }}</p>
				<p class="truncate text-sm">{{ link.long_url.slice(0, 20) + "..." }}</p>
			</div>
			<UButton @click="handleCopy" size="xl" class="size-10 rounded-full">
				<!-- <Icon v-if="isCopied" name="lucide:check" /> -->
				<Icon name="lucide:copy" />
			</UButton>
		</div>
	</UCard>
</template>
