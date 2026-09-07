<script setup></script>

<template>
  <section>
    <h1 class="text-4xl font-bold text-center">Shrinkat</h1>
    <div class="grid place-items-center mt-12">
      <NuxtImg src="/meerkat.png" alt="" class="w-24" />
      <p class="text-2xl font-semibold">
        This is <span class="italic text-brand-100">shrinky</span>, he likes
        making things tiny.
      </p>
      <p class="text-xl mt-2">Give him a link and see...</p>
    </div>

    <div class="grid place-items-center mt-8">
      <UButton to="/auth/sign-in" size="xl">Sign In</UButton>
    </div>
  </section>
  <section class="mt-16">
    <h2 class="text-center text-xl font-medium capitalize">
      Shrinky's Top Links
    </h2>
  </section>
</template>
