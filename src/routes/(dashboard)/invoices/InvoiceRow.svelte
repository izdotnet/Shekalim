<script lang="ts">
  import { clickOutside } from '$lib/actions/clickOutside';
  import AdditionalOptions from '$lib/components/AdditionalOptions.svelte';
  import ThreeDots from '$lib/components/icons/ThreeDots.svelte';
  import View from '$lib/components/icons/View.svelte';
  import Tag from '$lib/components/Tag.svelte';
  import { isLate } from '$lib/utils/dateHelpers';
  import { invoiceTotal, toShekels } from '$lib/utils/moneyHelpers';
  import Trash from '$lib/components/icons/Trash.svelte';
  import Edit from '$lib/components/icons/Edit.svelte';
  import Send from '$lib/components/icons/Send.svelte';
  import SlidePanel from '$lib/components/SlidePanel.svelte';
  import InvoiceForm from './InvoiceForm.svelte';
  import ConfirmDelete from './ConfirmDelete.svelte';
  import { swipe } from '$lib/actions/swipe';
  import Cancel from '$lib/components/icons/Cancel.svelte';

  export let invoice: Invoice;
  let isAdditionalOptionsOpen = false;
  let isOptionsDisabled = false;
  let isModalShowing = false;
  let isInvoiceFormShowing = false;
  let triggerReset = false;

  const handleDelete = () => {
    isModalShowing = true;
    isAdditionalOptionsOpen = false;
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

<div class="relative">
  <div
    use:swipe={{ triggerReset }}
    on:outOfView={() => (triggerReset = false)}
    class="z-row relative invoice-table invoice-row items-center bg-white py-3 lg:py-6 rounded-lg shadow-tableRow"
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
      <a href={`/invoices/${invoice.id}`} class="text-blue-700 hover:text-yellow-400"><View /></a>
    </div>

    <!-- More BTN -->
    <div
      class="items-center justify-center moreButton hidden text-sm lg:flex lg:text-lg relative"
      use:clickOutside={() => {
        isAdditionalOptionsOpen = false;
      }}
    >
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
  <!-- swipe to reaveal -->
  <div class="z-rowActions flex w-full items-center justify-around absolute inset-0 h-full">
    <button class="action-button" on:click={() => (triggerReset = true)}>
      <Cancel width={32} height={32} />
      Cancel
    </button>
    {#if !isOptionsDisabled}
      <button class="action-button" on:click={handleEdit}>
        <Edit width={32} height={32} />
        Edit
      </button>
      <button class="action-button" on:click={handleSendInvoice}>
        <Send width={32} height={32} />
        Send
      </button>
    {/if}
    <button class="action-button" on:click={handleDelete}>
      <Trash width={32} height={32} />
      Delete
    </button>
    <a href={`/invoices/${invoice.id}`} class="action-button">
      <View width={32} height={32} />
      View
    </a>
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
  .action-button {
    @apply flex cursor-pointer flex-col items-center justify-center font-bold text-blue-800;
  }
</style>
