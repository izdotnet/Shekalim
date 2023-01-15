<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Button from '$lib/components/Button.svelte';
  import CircledAmount from '$lib/components/CircledAmount.svelte';
  import LineItemRow from './LineItemRow.svelte';
  import { sumLineItems, toShekels } from '$lib/utils/moneyHelpers';
  export let lineItems: LineItem[] | undefined = undefined;
  let dispatch = createEventDispatcher();

  export let editable: boolean = true;

  let subtotal: string = '0.00';
  export let discount: number = 0;
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
    <LineItemRow
      {lineItem}
      on:removeLineItem
      canDelete={index > 0}
      on:updateLineItem
      isRequired={index === 0}
      {editable}
    />
  {/each}
{/if}

<div class="invoice-line-item">
  <div class="col-span-1 sm:col-span-2">
    {#if editable}
      <Button
        label="+ Line Item"
        style="textOnly"
        isAnimated={false}
        onClick={() => {
          dispatch('addLineItem');
        }}
      />
    {/if}
  </div>
  <div class="font-bold py-5 text-right text-monsoon print:col-span-3">Subtotal</div>
  <div class="py-5 text-right font-mono whitespace-nowrap">{subtotal}</div>
</div>

<div class="invoice-line-item">
  <div class="col-span-2 sm:col-span-3 text-right font-bold py-5 text-monsoon print:col-span-4">
    + V.A.T
  </div>
  <div class="py-5 text-right font-mono whitespace-nowrap">{vat}</div>
</div>

<div class="invoice-line-item">
  <div class="col-span-1 sm:col-span-2 text-right font-bold py-5 text-monsoon print:col-span-3">
    Discount
  </div>
  <div class="relative">
    <input
      class="line-item print:pr-0 h-10 w-full border-b-2 border-dashed border-stone-300 pr-4 text-right focus:border-solid focus:border-blue-700 focus:outline-none"
      type="number"
      name="discount"
      min="0"
      max="100"
      disabled={!editable}
      bind:value={discount}
      on:change={() => dispatch('updateDiscount', { discount })}
    />
    <span class="absolute right-0 top-2 text-mono">%</span>
  </div>
  <div class="py-5 text-right font-mono whitespace-nowrap">{discountedAmount}</div>
</div>

<div class="invoice-line-item">
  <div class="col-span-3 sm:col-span-6 print:col-span-6">
    <CircledAmount label="Total:" amount={total} />
  </div>
</div>

<style lang="postcss">
  .table-header {
    @apply hidden text-sm font-bold text-blue-700 print:block sm:block;
  }
</style>
