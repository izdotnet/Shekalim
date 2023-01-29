<script lang="ts">
  import { clickOutside } from '$lib/actions/clickOutside';
  import AdditionalOptions from '$lib/components/AdditionalOptions.svelte';
  import ThreeDots from '$lib/components/icons/ThreeDots.svelte';
  import Tag from '$lib/components/Tag.svelte';
  import Edit from '$lib/components/icons/Edit.svelte';
  import Activate from '$lib/components/icons/Activate.svelte';
  import Archive from '$lib/components/icons/Archive.svelte';
  import Trash from '$lib/components/icons/Trash.svelte';
  import Cancel from '$lib/components/icons/Cancel.svelte';
  import View from '$lib/components/icons/View.svelte';
  import { sumInvoices } from '$lib/utils/moneyHelpers';
  import SlidePanel from '$lib/components/SlidePanel.svelte';
  import ClientForm from './ClientForm.svelte';
  import ClientDelete from './ClientDelete.svelte';
  import { swipe } from '$lib/actions/swipe';

  export let client: Client;

  let isAdditionalMenuShowing: boolean = false;
  let isClientsFormShowing = false;
  let isModalShowing = false;
  let triggerReset = false;

  const closePanel = () => {
    isClientsFormShowing = false;
  };

  const handleEdit = () => {
    isClientsFormShowing = true;
    isAdditionalMenuShowing = false;
  };

  const handleDelete = () => {
    isModalShowing = true;
    isAdditionalMenuShowing = false;
  };

  const handleArhive = () => {
    client.clientStatus = 'archive';
    isAdditionalMenuShowing = false;
  };

  const handleSendInvoice = () => {
    isAdditionalMenuShowing = false;
  };

  const receivedInvoices = () => {
    if (!client?.invoices) return '₪0.00';
    //find paid invoices
    const paidInvoices = client.invoices?.filter((invoice) => invoice.invoiceStatus === 'paid');

    //get sum of paid invoices
    return sumInvoices(paidInvoices, true);
  };

  const balanceInvoices = () => {
    if (!client?.invoices) return '₪0.00';
    const paidInvoices = client.invoices?.filter((invoice) => invoice.invoiceStatus !== 'paid');
    return sumInvoices(paidInvoices, true);
  };
</script>

<div class="relative">
  <div
    class="z-row relative client-table client-row rounded-lg bg-white py-3 shadow-tableRow lg:py-6"
    use:swipe={{ triggerReset }}
    on:outOfView={() => (triggerReset = false)}
  >
    <div class="status"><Tag className="ml-auto" label={client.clientStatus} /></div>
    <div class="client-name truncate whitespace-nowrap text-base font-bold lg:text-xl">
      {client.name}
    </div>
    <div class="received text-right font-mono text-sm font-bold lg:text-lg">
      {receivedInvoices()}
    </div>
    <div class="balance text-right font-mono text-sm font-bold text-scarlet lg:text-lg">
      {balanceInvoices()}
    </div>
    <div class="view relative hidden items-center justify-center lg:flex">
      <a href={`/clients/${client.id}`} class="text-pastelPurple hover:text-daisyBush"><View /></a>
    </div>
    <div
      class="three-dots relative hidden items-center justify-center lg:flex"
      use:clickOutside={() => {
        isAdditionalMenuShowing = false;
      }}
    >
      <button
        class="text-pastelPurple hover:text-daisyBush"
        on:click={() => {
          isAdditionalMenuShowing = !isAdditionalMenuShowing;
        }}><ThreeDots /></button
      >
      {#if isAdditionalMenuShowing}
        <AdditionalOptions
          options={[
            { label: 'Edit', icon: Edit, onClick: handleEdit, disabled: false },
            {
              label: 'Activate',
              icon: Activate,
              onClick: () => {
                client.clientStatus = 'active';
                isAdditionalMenuShowing = false;
              },
              disabled: client.clientStatus === 'active'
            },
            {
              label: 'Archive',
              icon: Archive,
              onClick: handleArhive,
              disabled: client.clientStatus === 'archive'
            },
            { label: 'Delete', icon: Trash, onClick: handleDelete, disabled: false }
          ]}
        />
      {/if}
      <ClientDelete {client} {isModalShowing} on:close={() => (isModalShowing = false)} />
    </div>
  </div>

  <!-- swipe to reaveal -->
  <div class="z-rowActions flex w-full items-center justify-around absolute inset-0 h-full">
    <button class="action-button" on:click={() => (triggerReset = true)}>
      <Cancel width={32} height={32} />
      Cancel
    </button>
    <button class="action-button" on:click={handleEdit}>
      <Edit width={32} height={32} />
      Edit
    </button>
    {#if client.clientStatus === 'active'}
      <button class="action-button" on:click={handleArhive}>
        <Archive width={32} height={32} />
        Archive
      </button>
    {/if}
    {#if client.clientStatus === 'archive'}
      <button class="action-button" on:click={handleSendInvoice}>
        <Activate width={32} height={32} />
        Activate
      </button>
    {/if}
    <button class="action-button" on:click={handleDelete}>
      <Trash width={32} height={32} />
      Delete
    </button>
    <a href={`/clients/${client.id}`} class="action-button">
      <View width={32} height={32} />
      View
    </a>
  </div>
</div>

<!-- Slide panel -->
{#if isClientsFormShowing}
  <SlidePanel on:closePanel={closePanel}>
    <ClientForm {closePanel} formStatus="edit" {client} />
  </SlidePanel>
{/if}

<style lang="postcss">
  .client-row {
    grid-template-areas:
      'clientName status'
      'received balance';
  }
  @media (min-width: 1024px) {
    .client-row {
      grid-template-areas: 'status clientName received balance view threeDots';
    }
  }
  .client-name {
    grid-area: clientName;
  }
  .status {
    grid-area: status;
  }
  .received {
    @apply text-left lg:text-right;
    grid-area: received;
  }
  .received:before {
    @apply block text-xs font-light lg:hidden;
    content: 'Received: ';
  }
  .balance {
    grid-area: balance;
  }
  .balance:before {
    @apply block text-xs font-light lg:hidden;
    content: 'Balance: ';
  }
</style>
