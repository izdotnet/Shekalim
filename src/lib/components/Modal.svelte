<script lang="ts">
  import { clickOutside } from '$lib/actions/clickOutside';
  import { createEventDispatcher } from 'svelte';
  import Portal from './Portal.svelte';
  import Overlay from './Overlay.svelte';
  import Cancel from './icons/Cancel.svelte';

  export let isVisible = false;
  const dispatch = createEventDispatcher();
</script>

<svelte:window on:keydown={(event) => event.key === 'Escape' && dispatch('close')} />

{#if isVisible}
  <Portal>
    <Overlay className="!z-modalOverlay" />
    <div class="fixed inset-0 z-modal center">
      <div
        class="max-w-[450px] min-h-[230px] w-full rounded-lg bg-white px-10 py-7 relative"
        use:clickOutside={() => {
          dispatch('close');
        }}
      >
        <button
          on:click={() => dispatch('close')}
          class="right-4 top-4 absolute text-blue-700 hover:text-blue-800"><Cancel /></button
        >
        <slot><!-- optional fallback --></slot>
      </div>
    </div>
  </Portal>
{/if}
