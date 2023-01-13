<script lang="ts">
  import Trash from '$lib/components/icons/Trash.svelte';
  import { twoDecimals } from '$lib/utils/moneyHelpers';
  import { createEventDispatcher } from 'svelte';
  import { shekelToAgorot } from '$lib/utils/moneyHelpers';

  export let lineItem: LineItem;
  export let canDelete: boolean = false;

  let unitPrice: string = twoDecimals(lineItem.amount / lineItem.quantity);
  let amount: string = twoDecimals(lineItem.amount);

  let dispatch = createEventDispatcher();

  function init(el: HTMLElement) {
    el.focus();
  }

  $: {
    amount = twoDecimals(lineItem.quantity * Number(unitPrice));
    lineItem.amount = shekelToAgorot(Number(amount));
  }
</script>

<div class="invoice-line-item border-b-2 border-stone-300 py-2">
  <div>
    <input
      class="line-item"
      type="text"
      name="description"
      use:init
      bind:value={lineItem.description}
    />
  </div>

  <div>
    <input
      class="line-item text-right"
      type="number"
      name="unitPrice"
      step="0.01"
      min="0"
      bind:value={unitPrice}
      on:blur={() => {
        unitPrice = twoDecimals(Number(unitPrice));
        dispatch('updateLineItem');
      }}
    />
  </div>

  <div>
    <input
      class="line-item text-center"
      type="number"
      name="quantity"
      min="0"
      bind:value={lineItem.quantity}
      on:blur={() => {
        dispatch('updateLineItem');
      }}
    />
  </div>

  <div>
    <input
      class="line-item text-right"
      type="number"
      name="amount"
      step="0.01"
      min="0"
      bind:value={amount}
      disabled
    />
  </div>

  <div>
    {#if canDelete}
      <button
        on:click|preventDefault={() => dispatch('removeLineItem', lineItem.id)}
        class="center h-10 w-10 text-blue-700 hover:text-red-500"><Trash /></button
      >
    {/if}
  </div>
</div>

<style lang="postcss">
  input[type='text'],
  input[type='number'] {
    @apply h-10 w-full border-b-2 border-dashed border-blue-200;
  }

  input[type='text'] {
    @apply font-sansSerif text-xl font-bold;
  }

  input[type='number'] {
    @apply font-mono text-base;
  }

  input[type='text']:focus,
  input[type='number']:focus {
    @apply border-solid border-blue-700 outline-none;
  }

  input[type='number']:disabled,
  input[type='text']:disabled {
    @apply border-b-0 bg-transparent px-0;
  }
</style>
