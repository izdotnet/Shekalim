<script lang="ts">
  import { page } from '$app/stores';
  import Close from '$lib/components/icons/Close.svelte';
  import Hamburger from '$lib/components/icons/Hamburger.svelte';

  let isNavShowing: boolean = false;
</script>

<svelte:head>
  {#if isNavShowing}
    <style>
      body {
        @apply overflow-hidden md:overflow-auto;
      }
    </style>
  {/if}
</svelte:head>

<!-- Mobile Nav Control -->
<button
  class="fixed right-6 top-6 z-navBarToggle md:hidden"
  class:text-yellow-300={isNavShowing}
  on:click={() => (isNavShowing = !isNavShowing)}
>
  {#if isNavShowing}
    <Close width={32} height={32} />
  {:else}
    <Hamburger width={32} height={32} />
  {/if}
</button>

<header
  class="z-navBar transition-transform -translate-x-full md:translate-x-0 w-full h-screen md:h-full fixed md:col-span-3 md:relative bg-blue-900 text-center border-r-4 border-yellow-300 shadow-[0_35px_40px_-15px_rgba(0,0,0,1)]"
  class:translate-x-0={isNavShowing}
>
  <!-- Logo -->
  <div>
    <a href="/invoices">
      <img src="/shekel.svg" alt="Shekalim Logo" class="mx-auto mt-8 mb-8 h-48 w-48 " /></a
    >
    <p class="font-semibold text-yellow-300 text-4xl mb-14">שקלים</p>
  </div>

  <nav>
    <ul class="list-none text-2xl font-bold">
      <li>
        <a href="/invoices" class:active={$page.url.pathname === '/invoices'}>Invoices</a>
      </li>
      <li><a href="/clients" class:active={$page.url.pathname === '/clients'}>Clients</a></li>
      <li><a href="/settings" class:active={$page.url.pathname === '/settings'}>Settings</a></li>
      <li><a href="/logout">Logout</a></li>
    </ul>
  </nav>
</header>

<style lang="postcss">
  nav ul li {
    @apply mb-6;
  }

  nav ul li a {
    @apply font-bold text-white duration-200 hover:opacity-70;
  }

  nav ul li a.active {
    @apply text-3xl font-semibold text-goldenFizz;
  }
</style>
