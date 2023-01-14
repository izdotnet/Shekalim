<script lang="ts">
  import AdditionalOptions from '$lib/components/AdditionalOptions.svelte';
  import ThreeDots from '$lib/components/icons/ThreeDots.svelte';
  import View from '$lib/components/icons/View.svelte';
  import Tag from '$lib/components/Tag.svelte';
  import { isLate } from '$lib/utils/dateHelpers';
  import { invoiceTotal, sumLineItems, toShekels } from '$lib/utils/moneyHelpers';
  import Trash from '$lib/components/icons/Trash.svelte';
  import Edit from '$lib/components/icons/Edit.svelte';
  import Send from '$lib/components/icons/Send.svelte';
  import SlidePanel from '$lib/components/SlidePanel.svelte';
  import InvoiceForm from './InvoiceForm.svelte';
  import ConfirmDelete from './ConfirmDelete.svelte';

  export let invoice: Invoice;
  let isAdditionalOptionsOpen = false;
  let isOptionsDisabled = false;
  let isModalShowing = false;
  let isInvoiceFormShowing = false;

  const handleDelete = () => {
    isModalShowing = true;
    isAdditionalOptionsOpen = false;
    console.log('delete');
  };

  const handleEdit = () => {
    isInvoiceFormShowing = true;
    isAdditionalOptionsOpen = false;
  };

  const handleSendInvoice = () => {};

  const getInvoiceLabel = () => {
    if (invoice.invoiceStatus === 'draft') return 'draft';
    if (invoice.invoiceStatus === 'sent' && !isLate(invoice.dueDate)) {
      isOptionsDisabled = true;
      return 'sent';
    }
    if (invoice.invoiceStatus === 'sent' && isLate(invoice.dueDate)) {
      isOptionsDisabled = true;
      return 'late';
    }
    if (invoice.invoiceStatus === 'paid') {
      isOptionsDisabled = true;
      return 'paid';
    }
  };
</script>

<div
  class="invoice-table invoice-row items-center bg-white py-3 lg:py-6 rounded-lg shadow-tableRow"
>
  <!-- Invoice -->
  <div class="status"><Tag label={getInvoiceLabel()} className="ml-auto lg:ml-0" /></div>
  <div class="text-sm lg:text-lg dueDate">{invoice.dueDate}</div>
  <div class="text-sm lg:text-lg invoiceNumber">{invoice.invoiceNumber}</div>
  <div class="text-base lg:text-xl font-bold clientName whitespace-nowrap truncate">
    {invoice.client.name}
  </div>
  <div class="text-sm lg:text-lg font-mono font-bold amount text-right">
    {toShekels(invoiceTotal(invoice.lineItems, invoice.discount) * 1.17)}
  </div>

  <!-- View BTN -->
  <div class="items-center justify-center viewButton hidden text-sm lg:flex lg:text-lg">
    <a href="#" class="text-blue-700 hover:text-yellow-400"><View /></a>
  </div>

  <!-- More BTN -->
  <div class="items-center justify-center moreButton hidden text-sm lg:flex lg:text-lg relative">
    <button
      on:click={() => (isAdditionalOptionsOpen = !isAdditionalOptionsOpen)}
      class="text-blue-700 hover:text-yellow-400"><ThreeDots /></button
    >
    {#if isAdditionalOptionsOpen}
      <AdditionalOptions
        options={[
          { label: 'Edit', icon: Edit, onClick: handleEdit, disabled: isOptionsDisabled },
          { label: 'Delete', icon: Trash, onClick: handleDelete, disabled: false },
          { label: 'Send', icon: Send, onClick: handleSendInvoice, disabled: isOptionsDisabled }
        ]}
      />
    {/if}
  </div>
</div>

<ConfirmDelete {invoice} {isModalShowing} on:close={() => (isModalShowing = false)} />

<!-- Slide panel -->
{#if isInvoiceFormShowing}
  <SlidePanel
    on:closePanel={() => {
      isInvoiceFormShowing = false;
    }}
  >
    <InvoiceForm formState="edit" {invoice} closePanel={() => (isInvoiceFormShowing = false)} />
  </SlidePanel>
{/if}

<style lang="postcss">
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
