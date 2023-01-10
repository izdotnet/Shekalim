<script lang="ts">
  export let label: string;
  export let onClick: () => void;
  export let isAnimated = true;
  export let style: 'primary' | 'secondary' | 'destructive' = 'primary';
</script>

<button
  on:click|preventDefault={() => onClick()}
  class="relative whitespace-nowrap text-base px-5 py-2 lg:px-8 lg:py-2 rounded-lg font-sansSerif shadow-colored  font-semibold lg:text-lg "
  class:isAnimated
  class:primary={style === 'primary'}
  class:secondary={style === 'secondary'}
  class:destructive={style === 'destructive'}>{label}</button
>

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
</style>
