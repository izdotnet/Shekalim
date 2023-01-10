<script lang="ts">
  import AdditionalOptions from '$lib/components/AdditionalOptions.svelte';
  import ThreeDots from '$lib/components/icons/ThreeDots.svelte';
  import View from '$lib/components/icons/View.svelte';
  import Tag from '$lib/components/Tag.svelte';
  import { isLate } from '$lib/utils/dateHelpers';
  import { sumLineItems, toShekels } from '$lib/utils/moneyHelpers';
  import Trash from '$lib/components/icons/Trash.svelte';
  import Edit from '$lib/components/icons/Edit.svelte';
  import Send from '$lib/components/icons/Send.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import Button from '$lib/components/Button.svelte';
  import { deleteInvoice } from '$lib/stores/invoiceStore';

  export let invoice: Invoice;
  let isAdditionalOptionsOpen = false;
  let isOptionsDisabled = false;
  let isModalShowing = false;

  const handleDelete = () => {
    isModalShowing = true;
    isAdditionalOptionsOpen = false;
    console.log('delete');
  };

  const handleEdit = () => {
    console.log('edit');
  };

  const handleSendInvoice = () => {
    console.log('send');
  };

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
    {toShekels(sumLineItems(invoice.lineItems))}
  </div>

  <!-- View BTN -->
  <div class="center viewButton hidden text-sm lg:flex lg:text-lg">
    <a href="#" class="text-blue-700 hover:text-yellow-400"><View /></a>
  </div>

  <!-- More BTN -->
  <div class="center moreButton hidden text-sm lg:flex lg:text-lg relative">
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

<Modal isVisible={isModalShowing} on:close={() => (isModalShowing = false)}>
  <div class="flex flex-col justify-between items-center gap-6 h-full min-h-[175px]">
    <div class="text-center text-xl mt-7 font-bold text-blue-700">
      Delete invoice to <span class="text-scarlet">{invoice.client.name}</span> for
      <span class="text-scarlet">{toShekels(sumLineItems(invoice.lineItems))}</span>
    </div>
    <div class="flex gap-x-6 ">
      <Button
        label="Cancel"
        onClick={() => (isModalShowing = false)}
        isAnimated={false}
        style="secondary"
      />
      <Button
        label="Delete"
        onClick={() => {
          isModalShowing = false;
          deleteInvoice(invoice);
        }}
        isAnimated={false}
        style="destructive"
      />
    </div>
  </div>
</Modal>

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
