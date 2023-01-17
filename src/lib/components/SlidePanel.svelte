<script lang="ts">
  import { clickOutside } from '$lib/actions/clickOutside';
  import { fly } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';
  import Portal from '$lib/components/Portal.svelte';
  import Arrow from './icons/Arrow.svelte';
  import Overlay from './Overlay.svelte';

  const dispatch = createEventDispatcher();
</script>

<svelte:window on:keydown={(event) => event.key === 'Escape' && dispatch('close')} />

<Portal>
  <Overlay />
  <div
    transition:fly={{ x: 1000, duration: 300 }}
    use:clickOutside={() => dispatch('closePanel')}
    class="bg-white fixed w-full lg:w-3/4 h-screen px-5 pt-16 lg:py-20 lg:px-32 right-0 top-0 z-slidePanel shadow-slidePanel overflow-scroll"
    use:clickOutside={() => {
      dispatch('closePanel');
    }}
  >
    <button
      class="absolute top-5 left-7 text-blue-700 hover:text-blue-800"
      on:click={() => dispatch('closePanel')}
    >
      <Arrow /></button
    >
    <slot><!-- optional fallback --></slot>
  </div>
</Portal>
