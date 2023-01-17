<script lang="ts">
  import { page } from '$app/stores';
</script>

<svelte:head>
  <title>404 Page | Shekalim</title>
</svelte:head>

<div class="center w-screen h-screen flex-col text-center overflow-x-hidden ">
  <h1 class="font-black text-blue-700 text-[8rem] leading-tight">{$page.status}</h1>
  <h2 class="text-3xl text-blue-700 font-black leading-loose ">Sorry!</h2>
  <p class="text-md font-semibold text-blue-700">
    {$page.error?.message}:
    {$page.url.pathname}
  </p>
</div>
