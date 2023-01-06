<script lang="ts">
  import CircledAmount from '$lib/components/CircledAmount.svelte';
  import ThreeDots from '$lib/components/icons/ThreeDots.svelte';
  import View from '$lib/components/icons/View.svelte';
  import Search from '$lib/components/Search.svelte';
  import Tag from '$lib/components/Tag.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<svelte:head>
  <title>Invoices | Shekalim</title>
</svelte:head>

<div class="flex justify-between items-center mb-16">
  <!-- Search -->
  <Search />
  <!-- New Invoice BTN -->
  <div>
    <button
      class="relative whitespace-nowrap px-8 py-2 bg-blue-600 text-white rounded-lg font-sansSerif shadow-colored hover:shadow-coloredHover font-semibold text-lg tranlate-y-0 hover:-translate-y-1 transition-all "
      >+ Invoice</button
    >
  </div>
</div>

<!-- List of invoices -->

<div>
  <!-- Header -->
  <div class="table-header invoice-table text-blue-700 ">
    <h3>Status</h3>
    <h3>Due Date</h3>
    <h3>ID</h3>
    <h3>Client</h3>
    <h3>Amount</h3>
    <div />
    <div />
  </div>
  <!-- invoices -->
  <div class="invoice-table items-center bg-white py-6 rounded-lg shadow-tableRow">
    <!-- Invoice -->
    <div class="text-lg"><Tag label="paid" /></div>
    <div class="text-lg">23/5/1990</div>
    <div class="text-lg">12345</div>
    <div class="text-xl font-bold">Zion Hotel</div>
    <div class="text-lg font-mono font-bold">₪5,500.00</div>
    <div class="text-lg center">
      <a href="#" class="text-blue-700 hover:text-blue-600"><View /></a>
    </div>
    <div class="text-lg center">
      <button class=" text-blue-700 hover:text-blue-600 "><ThreeDots /></button>
    </div>
  </div>
</div>

<CircledAmount label="Total" amount="₪1200.00" />

<style lang="postcss">
  .table-header h3 {
    @apply text-xl font-black leading-snug;
  }
</style>
