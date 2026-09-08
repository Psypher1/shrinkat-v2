<script setup>
const params = useRoute().params;
const client = useSupabaseClient();

const { data } = useAsyncData("link", async () => {
	const { data, error } = await client.from("links").select("*").eq("key", params.key).single();
	return data;
});

if (data.value?.long_url) {
	useExternalRedirect(data.value?.long_url);
}
</script>

<template>
	<div>link details</div>
	<!-- {{ id }} -->
	{{ params }}
	{{ data }}
</template>
