<script setup>
defineProps({
	link: {
		type: Object,
		required: true,
	},
});
</script>

<template>
	<UCard>
		<div class="item-center flex justify-between">
			<div>
				<p class="text-2xl font-semibold text-kat-300">{{ link.key }}</p>
				<p class="text-sm">{{ link.long_url }}</p>
			</div>
			<UButton icon="lucide:copy" size="xl" class="size-10 rounded-full" />
		</div>
	</UCard>
</template>
