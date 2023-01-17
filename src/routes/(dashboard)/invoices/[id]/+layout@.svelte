<script lang="ts">
  import { fly } from 'svelte/transition';
  import { afterNavigate, goto } from '$app/navigation';
  import Arrow from '$lib/components/icons/Arrow.svelte';

  let previousPage: string | undefined = undefined;

  afterNavigate((navigation) => {
    previousPage = navigation?.from?.url?.pathname;
  });
</script>

<svelte:window
  on:keydown={(e) => {
    if (e.key === 'Escape') goto(previousPage || '/invoices');
  }}
/>

<div
  class="bg-gray-50 print:bg-transparent h-full min-h-screen w-screen pt-16 lg:pt-12 pb-32 print:pt-0 print:pb-0"
>
  <main transition:fly={{ y: 500, duration: 300 }} class="mx-auto max-w-screen-lg min-h-screen">
    <a class="fixed top-7 left-7 text-blue-700 print:hidden" href={previousPage ?? '/invoices'}
      ><Arrow /></a
    >
    <slot><!-- optional fallback --></slot>
  </main>
</div>
