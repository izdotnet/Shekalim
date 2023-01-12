<script lang="ts">
  import type { SvelteComponent } from 'svelte';
  export let label: string;
  export let onClick: () => void;
  export let isAnimated = true;
  export let style: 'primary' | 'secondary' | 'destructive' | 'outline' | 'textOnly' = 'primary';
  export let iconLeft: (new (...args: any[]) => SvelteComponent) | null = null;
  export let iconRight: (new (...args: any[]) => SvelteComponent) | null = null;
</script>

<button
  on:click|preventDefault={() => onClick()}
  class="relative flex items-center whitespace-nowrap rounded-lg px-5 py-2 font-sansSerif text-base font-semibold lg:px-10 lg:py-3 lg:text-xl"
  class:isAnimated
  class:primary={style === 'primary'}
  class:outline={style === 'outline'}
  class:textOnly={style === 'textOnly'}
  class:secondary={style === 'secondary'}
  class:destructive={style === 'destructive'}
>
  {#if iconLeft}
    <svelte:component this={iconLeft} class="mr-2" />
  {/if}
  {label}
  {#if iconRight}
    <svelte:component this={iconRight} class="ml-2" />
  {/if}
</button>

<style lang="postcss">
  .isAnimated {
    @apply translate-y-0 transition-all hover:-translate-y-1 hover:shadow-coloredHover;
  }
  .primary {
    @apply bg-blue-700 text-white;
  }
  .secondary {
    @apply bg-gallery text-blue-700;
  }
  .destructive {
    @apply bg-scarlet text-white;
  }
  .outline {
    @apply border-blue-700 bg-white text-blue-700 duration-200 hover:bg-blue-700 hover:text-white;
  }
  .textOnly {
    @apply bg-transparent px-0 text-scarlet underline hover:no-underline;
  }
</style>
