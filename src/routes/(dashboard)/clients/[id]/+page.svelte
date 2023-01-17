<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Header from '../../invoices/Header.svelte';
  import { loadInvoices } from '$lib/stores/invoiceStore';
  import { onMount } from 'svelte';
  import CircledAmount from '$lib/components/CircledAmount.svelte';
  import Search from '$lib/components/Search.svelte';
  import InvoiceRow from '../../invoices/InvoiceRow.svelte';
  import { sumInvoices } from '$lib/utils/moneyHelpers';
  import BlankState from '../../invoices/BlankState.svelte';
  import SlidePanel from '$lib/components/SlidePanel.svelte';
  import Edit from '$lib/components/icons/Edit.svelte';
  import ClientForm from '../ClientForm.svelte';
  import { isLate } from '$lib/utils/dateHelpers';

  export let data: { client: Client };

  let isClientFormShowing = false;
  let isEditingCurrentClient: boolean = false;

  const editClient = () => {
    isEditingCurrentClient = true;
    isClientFormShowing = true;
  };

  const closePanel = () => (isClientFormShowing = false);

  const getDraft = (): string => {
    if (!data.client.invoices || data.client.invoices.length < 1) return '0.00';
    const draftInvoices = data?.client?.invoices?.filter(
      (invoice) => invoice.invoiceStatus === 'draft'
    );
    return sumInvoices(draftInvoices, false);
  };

  const getPaid = (): string => {
    if (!data.client.invoices || data.client.invoices.length < 1) return '0.00';
    const paidInvoices = data?.client?.invoices?.filter(
      (invoice) => invoice.invoiceStatus === 'paid'
    );
    return sumInvoices(paidInvoices, false);
  };

  const getTotalOverdue = (): string => {
    if (!data.client.invoices || data.client.invoices.length < 1) return '0.00';
    const paidInvoices = data?.client?.invoices?.filter(
      (invoice) => invoice.invoiceStatus === 'sent' && isLate(invoice.dueDate)
    );
    return sumInvoices(paidInvoices, false);
  };

  const getTotalOutstanding = (): string => {
    if (!data.client.invoices || data.client.invoices.length < 1) return '0.00';
    const paidInvoices = data?.client?.invoices?.filter(
      (invoice) => invoice.invoiceStatus === 'sent' && !isLate(invoice.dueDate)
    );
    return sumInvoices(paidInvoices, false);
  };

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
  {#if data?.client?.invoices && data?.client?.invoices?.length > 0}
    <Search />
  {:else}
    <div />
  {/if}
  <!-- New Client BTN -->
  <div>
    <Button
      label="+ Client"
      onClick={() => {
        isClientFormShowing = true;
      }}
    />
  </div>
</div>

<div class="flex justify-between items-center w-full mb-7">
  <h1 class="font-sansSerif text-3xl font-bold text-blue-800">{data?.client?.name}</h1>
  <Button label="Edit" isAnimated={false} style="textOnly" iconLeft={Edit} onClick={editClient} />
</div>

<!-- Summary block -->
<div class="mb-10 grid grid-cols-1 lg:grid-cols-4 gap-4 rounded-lg bg-gray-100 py-7 px-10">
  <div class="summary-block">
    <div class="label">Total Overdue</div>
    <div class="number"><sup>₪</sup>{getTotalOverdue()}</div>
  </div>
  <div class="summary-block">
    <div class="label">Total Outstanding</div>
    <div class="number"><sup>₪</sup>{getTotalOutstanding()}</div>
  </div>
  <div class="summary-block">
    <div class="label">Total Draft</div>
    <div class="number"><sup>₪</sup>{getDraft()}</div>
  </div>
  <div class="summary-block">
    <div class="label">Total Paid</div>
    <div class="number"><sup>₪</sup>{getPaid()}</div>
  </div>
</div>

<!-- List of invoices -->
<div>
  <!-- invoices -->
  {#if data?.client?.invoices === null}
    Loading ...
  {:else if data?.client?.invoices?.length === 0}
    <BlankState />
  {:else}
    <Header className="text-blue-700" />
    <div class="flex flex-col-reverse ">
      {#each data?.client?.invoices as invoice}
        <InvoiceRow {invoice} />
      {/each}
    </div>
    <CircledAmount label="Total" amount={sumInvoices(data?.client?.invoices, true)} />
  {/if}
</div>

<!-- Slide panel -->
{#if isClientFormShowing}
  <SlidePanel on:closePanel={() => closePanel}>
    <ClientForm
      {closePanel}
      formStatus={isEditingCurrentClient ? 'edit' : 'create'}
      client={isEditingCurrentClient ? data?.client : undefined}
    />
  </SlidePanel>
{/if}

<style lang="postcss">
  .summary-block {
    @apply text-center;
  }

  .label {
    @apply justify-center text-sm font-black text-blue-600;
  }

  .number {
    @apply truncate text-[2.5rem] font-black text-blue-800;
  }
</style>
