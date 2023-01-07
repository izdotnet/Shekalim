<script lang="ts">
  import ThreeDots from '$lib/components/icons/ThreeDots.svelte';
  import View from '$lib/components/icons/View.svelte';
  import Tag from '$lib/components/Tag.svelte';
  import { isLate } from '$lib/utils/dateHelpers';
  import { sumLineItems, toShekels } from '$lib/utils/moneyHelpers';

  export let invoice: Invoice;

  const getInvoiceLabel = () => {
    if (invoice.invoiceStatus === 'draft') return 'draft';
    if (invoice.invoiceStatus === 'sent' && !isLate(invoice.dueDate)) return 'sent';
    if (invoice.invoiceStatus === 'sent' && isLate(invoice.dueDate)) return 'late';
    if (invoice.invoiceStatus === 'paid') return 'paid';
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
  <div class="text-sm lg:text-lg center viewButton">
    <a href="#" class="text-blue-700 hover:text-blue-600 hidden lg:block"><View /></a>
  </div>
  <div class="text-sm lg:text-lg center moreButton">
    <button class=" text-blue-700 hover:text-blue-600 hidden lg:block"><ThreeDots /></button>
  </div>
</div>

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
