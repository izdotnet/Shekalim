<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Button from '$lib/components/Button.svelte';
  import CircledAmount from '$lib/components/CircledAmount.svelte';
  import LineItemRow from './LineItemRow.svelte';
  import { sumLineItems, toShekels } from '$lib/utils/moneyHelpers';
  export let lineItems: LineItem[] | undefined = undefined;
  let dispatch = createEventDispatcher();

  let subtotal: string = '0.00';
  let discount: number = 0;
  let discountedAmount: string;
  let vat: string;
  let total: string = '0.00';

  $: subtotal = toShekels(sumLineItems(lineItems));
  $: vat = toShekels(sumLineItems(lineItems) * 1.17);
  $: discountedAmount = `- ${toShekels(sumLineItems(lineItems) * 1.17 * (discount / 100))}`;
  $: total = toShekels(
    sumLineItems(lineItems) * 1.17 - sumLineItems(lineItems) * 1.17 * (discount / 100)
  );
</script>

<svelte:window on:keydown={(event) => event.key === 'Enter' && dispatch('addLineItem')} />

<div class="invoice-line-item border-b-2 border-blue-700 pb-2">
  <div class="table-header">Description</div>
  <div class="table-header text-right">Unit Price</div>
  <div class="table-header text-center">Qty</div>
  <div class="table-header text-right">Amount</div>
</div>

{#if lineItems}
  {#each lineItems as lineItem, index}
    <LineItemRow {lineItem} on:removeLineItem canDelete={index > 0} on:updateLineItem />
  {/each}
{/if}

<div class="invoice-line-item">
  <div class="col-span-2">
    <Button
      label="+ Line Item"
      style="textOnly"
      isAnimated={false}
      onClick={() => {
        dispatch('addLineItem');
      }}
    />
  </div>
  <div class="font-bold py-5 text-right text-monsoon">Subtotal</div>
  <div class="py-5 text-right font-mono whitespace-nowrap">{subtotal}</div>
</div>

<div class="invoice-line-item">
  <div class="col-span-3 text-right font-bold py-5 text-monsoon">+ V.A.T</div>
  <div class="py-5 text-right font-mono whitespace-nowrap">{vat}</div>
</div>

<div class="invoice-line-item">
  <div class="col-span-2 text-right font-bold py-5 text-monsoon">Discount</div>
  <div class="relative">
    <input
      class="line-item h-10 w-full border-b-2 border-dashed border-stone-300 pr-4 text-right focus:border-solid focus:border-blue-700 focus:outline-none"
      type="number"
      name="discount"
      min="0"
      max="100"
      bind:value={discount}
    />
    <span class="absolute right-0 top-2 text-mono">%</span>
  </div>
  <div class="py-5 text-right font-mono whitespace-nowrap">{discountedAmount}</div>
</div>

<div class="invoice-line-item">
  <div class="col-span-6">
    <CircledAmount label="Total:" amount={total} />
  </div>
</div>

<style class="postcss">
  .table-header {
    @apply text-sm font-bold text-blue-700;
  }
</style>
