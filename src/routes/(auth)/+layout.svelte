<script>
  import SnackBar from '$lib/components/SnackBar.svelte';
</script>

<SnackBar />

<div class="min-h-screen w-full bg-gradient-to-b from-gray-800 via-blue-900 to-gray-700">
  <div
    class="flex flex-col md:flex-row justify-center items-center gap-x-16 md:gap-y-8 pt-12 md:pt-32"
  >
    <div>
      <img src="shekel.svg" alt="Shekelim logo" class="mx-auto" height="300px" width="300px" />
    </div>

    <div class="">
      <slot><!-- optional fallback --></slot>
    </div>
  </div>
</div>
