<script lang="ts">
  export let message: string = '';
</script>

{#if message}
  <div
    class="mb-8 h-14 rounded-md bg-blue-800 text-center text-base text-white flex justify-center"
  >
    <p class="center">{message}</p>
  </div>
{/if}
