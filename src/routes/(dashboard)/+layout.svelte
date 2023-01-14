<script lang="ts">
  import Navbar from '$lib/components/Navbar.svelte';
  import SnackBar from '$lib/components/SnackBar.svelte';
</script>

<SnackBar />
<div class="grid grid-cols-12 md:gap-x-16 bg-gray-50 min-h-screen">
  <Navbar />
  <main class="px-4 pt-4  col-span-12 md:col-span-8 md:pt-10">
    <slot><!-- optional fallback --></slot>
  </main>
</div>
