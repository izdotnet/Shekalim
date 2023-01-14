<script lang="ts">
  import Header from './Header.svelte';
  import { invoices, loadInvoices } from '$lib/stores/invoiceStore';
  import { onMount } from 'svelte';
  import CircledAmount from '$lib/components/CircledAmount.svelte';
  import Search from '$lib/components/Search.svelte';
  import type { PageData } from './$types';
  import InvoiceRow from './InvoiceRow.svelte';
  import { sumInvoices } from '$lib/utils/moneyHelpers';
  import BlankState from './BlankState.svelte';
  import Button from '$lib/components/Button.svelte';
  import SlidePanel from '$lib/components/SlidePanel.svelte';
  import InvoiceForm from './InvoiceForm.svelte';

  // export let data: PageData;

  let isInvoiceFormShowing = false;

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
    <Button
      label="+ Invoice"
      onClick={() => {
        isInvoiceFormShowing = true;
      }}
    />
  </div>
</div>

<!-- List of invoices -->
<div>
  <!-- invoices -->
  {#if $invoices === null}
    Loading ...
  {:else if $invoices.length === 0}
    <BlankState />
  {:else}
    <Header className="text-blue-700" />
    <div class="flex flex-col-reverse ">
      {#each $invoices as invoice}
        <InvoiceRow {invoice} />
      {/each}
    </div>
    <CircledAmount label="Total" amount={sumInvoices($invoices)} />
  {/if}
</div>

<!-- Slide panel -->
{#if isInvoiceFormShowing}
  <SlidePanel
    on:closePanel={() => {
      isInvoiceFormShowing = false;
    }}
  >
    <InvoiceForm closePanel={() => (isInvoiceFormShowing = false)} />
  </SlidePanel>
{/if}
