import { process } from "zod/v4/core";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2025-07-15",
	devtools: { enabled: true },
	modules: ["@nuxt/ui", "@nuxtjs/supabase", "@nuxt/image"],
	css: ["~/assets/css/main.css"],
	srcDir: "src",
	components: [
		{
			path: "~/components",
			pathPrefix: false,
		},
	],
	typescript: {
		typeCheck: false, // Disable TypeScript type checking
		strict: false,
	},
	app: {
		head: {
			title: "Shrinkat",
			meta: [
				{
					name: "description",
					content: "URL Shortener built with Nuxt 4 and NuxtUI",
				},
			],
			link: [{ rel: "icon", href: "/meerkat.png" }],
		},
	},
	runtimeConfig: {
		// private — server-only, never exposed to the client

		public: {
			// public — exposed to both server and client/browser
			appUrl: "",
		},
	},

	supabase: {
		redirectOptions: {
			login: "/auth/sign-in",
			callback: "/auth/confirm",
			// include: ["/dashboard"],
			exclude: ["/", "/dashboard", "/about", "/contact", "/features"],
		},
	},
	// ui: {
	//   theme: {
	//     colors: [
	//       "primary",
	//       "secondary",
	//       "success",
	//       "info",
	//       "warning",
	//       "error",
	//       "neutral",
	//     ],
	//   },
	// },
});
