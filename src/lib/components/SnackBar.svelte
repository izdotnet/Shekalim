<script lang="ts">
  import { fly, fade } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import Portal from '$lib/components/Portal.svelte';
  import Cancel from './icons/Cancel.svelte';
  import SnackbarMessage from '$lib/components/SnackbarMessage.svelte';
  import { snackbar } from '$lib/stores/snackbarStore';
</script>

<Portal>
  <div class="fixed top-5 left-1/2 -translate-x-1/2 z-toaster">
    {#each $snackbar as content (content.id)}
      <div
        in:fly={{
          opacity: 0,
          y: -100
        }}
        out:fade={{
          duration: 300
        }}
        animate:flip
      >
        <div
          class="inline-block rounded-lg px-5 py-4 text-lg font-bold mb-2"
          class:info={content.type === 'info'}
          class:warning={content.type === 'warning'}
          class:error={content.type === 'error'}
          class:success={content.type === 'success'}
        >
          <div class="flex gap-4">
            <SnackbarMessage message={content.message} />
            <button
              on:click={() => {
                snackbar.remove(content.id);
              }}><Cancel /></button
            >
          </div>
        </div>
      </div>
    {/each}
  </div>
</Portal>

<style lang="postcss">
  .info {
    @apply border border-blue-500 bg-whisper text-blue-700;
  }

  .warning {
    @apply border border-scarlet bg-whisper text-scarlet;
  }

  .error {
    @apply border border-whisper bg-scarlet text-whisper;
  }

  .success {
    @apply border border-whisper bg-green-600 text-whisper;
  }
</style>
