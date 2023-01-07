<script lang="ts">
  import { invoices, loadInvoices } from '$lib/stores/invoiceStore';
  import { onMount } from 'svelte';
  import CircledAmount from '$lib/components/CircledAmount.svelte';
  import ThreeDots from '$lib/components/icons/ThreeDots.svelte';
  import View from '$lib/components/icons/View.svelte';
  import Search from '$lib/components/Search.svelte';
  import Tag from '$lib/components/Tag.svelte';
  import type { PageData } from './$types';
  import InvoiceRow from './InvoiceRow.svelte';
  import { sumInvoices } from '$lib/utils/moneyHelpers';

  // export let data: PageData;

  onMount(() => {
    loadInvoices();
  });
</script>

<svelte:head>
  <title>Invoices | Shekalim</title>
</svelte:head>

<div
  class="flex flex-col-reverse md:flex-row justify-between items-start md:items-center mb-7 gap-y-6 md:gap-y-4 lg:mb-16"
>
  <!-- Search -->
  <Search />
  <!-- New Invoice BTN -->
  <div>
    <button
      class="relative whitespace-nowrap text-base px-5 py-2 lg:px-8 lg:py-2  bg-blue-600 text-white rounded-lg font-sansSerif shadow-colored hover:shadow-coloredHover font-semibold lg:text-lg tranlate-y-0 hover:-translate-y-1 transition-all "
      >+ Invoice</button
    >
  </div>
</div>

<!-- List of invoices -->

<div>
  <!-- Header -->
  <div class="table-header invoice-table text-blue-700 hidden lg:grid ">
    <h3>Status</h3>
    <h3>Due Date</h3>
    <h3>ID</h3>
    <h3>Client</h3>
    <h3 class="text-right">Amount</h3>
    <div />
    <div />
  </div>
  <!-- invoices -->
  {#each $invoices as invoice}
    <InvoiceRow {invoice} />
  {/each}
</div>

<CircledAmount label="Total" amount={sumInvoices($invoices)} />

<style lang="postcss">
  .table-header h3 {
    @apply text-xl font-black leading-snug;
  }
</style>
