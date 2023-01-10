<script>
  import BlankRows from '$lib/components/BlankRows.svelte';
  import Header from './Header.svelte';
</script>

<div>
  <h2 class="md:text-right mb-14 font-handwriting text-2xl font-bold text-blueGem">
    Add your first Invoice
  </h2>
  <!-- Invoice header -->
  <Header className="text-indigo-200" />

  <!-- Blank rows -->
  <div class="space-y-2">
    <BlankRows />
    <BlankRows />
    <BlankRows />
  </div>
</div>
