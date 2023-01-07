<script lang="ts">
  import CircledAmount from '$lib/components/CircledAmount.svelte';
  import ThreeDots from '$lib/components/icons/ThreeDots.svelte';
  import View from '$lib/components/icons/View.svelte';
  import Search from '$lib/components/Search.svelte';
  import Tag from '$lib/components/Tag.svelte';
  import type { PageData } from './$types';

  // export let data: PageData;
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
    <h3>Amount</h3>
    <div />
    <div />
  </div>
  <!-- invoices -->
  <div
    class="invoice-table invoice-row items-center bg-white py-3 lg:py-6 rounded-lg shadow-tableRow"
  >
    <!-- Invoice -->
    <div class="status"><Tag label="paid" className="ml-auto lg:ml-0" /></div>
    <div class="text-sm lg:text-lg dueDate">23/5/1990</div>
    <div class="text-sm lg:text-lg invoiceNumber">12345</div>
    <div class="text-base lg:text-xl font-bold clientName">Zion Hotel</div>
    <div class="text-sm lg:text-lg font-mono font-bold amount text-right">₪5,500.00</div>
    <div class="text-sm lg:text-lg center viewButton">
      <a href="#" class="text-blue-700 hover:text-blue-600 hidden lg:block"><View /></a>
    </div>
    <div class="text-sm lg:text-lg center moreButton">
      <button class=" text-blue-700 hover:text-blue-600 hidden lg:block"><ThreeDots /></button>
    </div>
  </div>
</div>

<CircledAmount label="Total" amount="₪1200.00" />

<style lang="postcss">
  .table-header h3 {
    @apply text-xl font-black leading-snug;
  }

  .invoice-row {
    grid-template-areas:
      'invoiceNumber invoiceNumber'
      'clientName amount'
      'dueDate status';
  }
  @media (min-width: 1024px) {
    .invoice-row {
      grid-template-areas: 'status dueDate invoiceNumber clientName amount viewButton moreButton';
    }
  }

  .invoice-row .status {
    grid-area: status;
  }
  .invoice-row .dueDate {
    grid-area: dueDate;
  }
  .invoice-row .invoiceNumber {
    grid-area: invoiceNumber;
  }
  .invoice-row .clientName {
    grid-area: clientName;
  }
  .invoice-row .amount {
    grid-area: amount;
  }
  .invoice-row .viewButton {
    grid-area: viewButton;
  }
  .invoice-row .moreButton {
    grid-area: moreButton;
  }
</style>
