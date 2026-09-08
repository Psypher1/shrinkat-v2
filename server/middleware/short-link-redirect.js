import { serverSupabaseServiceRole } from "#supabase/server";

export default defineEventHandler(async (event) => {
	if (event.node.req.method !== "GET") return;

	const url = getRequestURL(event);
	const path = url.pathname;

	// skip assets, api routes, nuxt internals
	if (path.includes(".")) return;
	if (path.startsWith("/api")) return;
	if (path.startsWith("/_nuxt")) return;

	const match = path.match(/^\/([a-zA-Z0-9_-]{4,12})$/);
	if (!match) return;

	const key = match[1];

	// top-level page routes that should never be treated as a short key
	const reserved = ["auth/sign-in", "auth/confirm", "dashboard"];
	if (reserved.includes(key)) return;

	const client = serverSupabaseServiceRole(event);

	const { data, error } = await client.from("links").select("long_url").eq("key", key).single();

	if (error || !data) return; // no match — let Nuxt render its normal page/404

	return sendRedirect(event, data.long_url, 302);
});
