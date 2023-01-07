<script lang="ts">
  type Tags = 'draft' | 'sent' | 'current' | 'paid' | 'late' | 'archive';
  export let label: Tags = 'draft';
  export let className = '';
</script>

<div
  class={`text-md w-20 rounded-full text-center font-bold capitalize border-[1px] ${className}`}
  class:inverted={label === 'draft'}
  class:success={label === 'sent' || label === 'current'}
  class:archive={label === 'paid' || label === 'archive'}
  class:overdue={label === 'late'}
>
  {label}
</div>

<style lang="postcss">
  .inverted {
    @apply border-blue-700 text-blue-700;
  }
  .success {
    @apply border-robinEggBlue bg-robinEggBlue text-blueGem;
  }
  .archive {
    @apply border-blue-700 bg-blue-700 text-white;
  }
  .overdue {
    @apply border-scarlet bg-scarlet text-white;
  }
</style>
