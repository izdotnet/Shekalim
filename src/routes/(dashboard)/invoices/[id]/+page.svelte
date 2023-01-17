<script lang="ts">
  import { page } from '$app/stores';
  import Button from '$lib/components/Button.svelte';
  import LineItemRows from '../LineItemRows.svelte';
  import { settings, loadSettings } from '$lib/stores/settingsStore';
  import { onMount } from 'svelte';
  import SvelteMarkdown from 'svelte-markdown';

  export let data: { invoice: Invoice };

  let copyLinkLabel = 'Copy Link';

  const printInvoice = () => {
    window.print();
  };
  const copyLink = () => {
    navigator.clipboard.writeText($page.url.href);
    copyLinkLabel = 'Copied!';

    setTimeout(() => {
      copyLinkLabel = 'Copy Link';
    }, 2000);
  };
  const payInvoice = () => {};
  const sendInvoice = () => {};

  onMount(() => {
    loadSettings();
  });
</script>

<div
  class="fixed z-0 mb-16 flex justify-between w-full max-w-screen-lg flex-col md:flex-row gap-y-5 px-4 lg:px-0 print:hidden"
>
  <h1 class="text-3xl font-bold text-blue-800">Invoice</h1>
  <div class="flex items-center gap-2 sm:gap-4 flex-wrap sm:flex-nowrap">
    <Button height="short" label="Print" style="outline" onClick={printInvoice} />
    <Button
      height="short"
      label={copyLinkLabel}
      style="outline"
      onClick={copyLink}
      className="sm:min-w-[168px] justify-center "
    />
    <Button height="short" label="Send" style="outline" onClick={sendInvoice} />
    <Button height="short" label="Pay Invoice" style="outline" onClick={payInvoice} />
  </div>
</div>

<div
  class="relative top-40 md:top-32 z-index-10 grid grid-cols-6 gap-x-5 gap-y-8 bg-white py-8 px-5 md:py-16 md:px-32 shadow-invoice print:py-0 print:shadow-none print:top-0 "
>
  <div class="sm:col-span-3 flex col-span-6 print:col-span-3">
    <!-- <img src="" alt="" /> -->
    <p class="text-[4rem] font-extrabold font-handwriting">LOGO</p>
    <span class="text-monsoon text-md font-handwriting pl-4">Placeholder</span>
  </div>

  <div class="col-span-6 sm:col-span-2 sm:col-start-5 pt-4 print:col-span-3">
    {#if $settings && $settings.myName}
      <div class="label">From</div>
      <p>
        {$settings.myName} <br />
        {#if $settings.city && $settings.country && $settings.postalCode && $settings.street}
          {$settings.street} <br />
          {$settings.city}
          {$settings.postalCode} <br />
          {$settings.country}
        {/if}
      </p>
    {:else}
      <div class="center min-h-[60px] rounded-xl bg-gray-50">
        <a href="#" class="text-stone-600 hover:text-blue-700 ">Add your contact info</a>
      </div>
    {/if}
  </div>

  <div class="col-span-6 sm:col-span-2 print:col-span-3">
    <div class="label">Bill To:</div>
    <p>
      <strong>{data.invoice.client.name}</strong><br />
      {data.invoice.client.email}<br />
      {data.invoice.client.street}
      {data.invoice.client.city}
      {data.invoice.client.postalCode}
    </p>
  </div>

  <div class="col-span-6 sm:col-span-2 sm:col-start-5">
    <div class="label">Invoice ID</div>
    <p>{data.invoice.invoiceNumber}</p>
  </div>

  <div class="col-span-3">
    <div class="label">Due Date</div>
    <p>{data.invoice.dueDate}</p>
  </div>

  <div class="col-span-3 sm:col-span-2 sm:col-start-5">
    <div class="label">Issue Date</div>
    <p>{data.invoice.issueDate}</p>
  </div>

  <div class="col-span-6">
    <div class="label">Subject</div>
    <p>{data.invoice.subject}</p>
  </div>

  <div class="col-span-6">
    <LineItemRows
      lineItems={data.invoice.lineItems}
      editable={false}
      discount={data?.invoice?.discount ?? 0}
    />
  </div>

  {#if data.invoice.notes}
    <div class="col-span-6">
      <div class="label">Notes</div>
      <p>
        <SvelteMarkdown source={data.invoice.notes} />
      </p>
    </div>
  {/if}

  {#if data.invoice.terms}
    <div class="col-span-6">
      <div class="label">Terms and Conditions</div>
      <p>
        <SvelteMarkdown source={data.invoice.terms} />
      </p>
    </div>
  {/if}
</div>

<style lang="postcss">
  .label {
    @apply font-black text-monsoon;
  }
</style>
