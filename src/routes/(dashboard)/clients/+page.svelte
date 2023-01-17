<script lang="ts">
  import { clients, loadClients } from '$lib/stores/clientStore';
  import Button from '$lib/components/Button.svelte';
  import Search from '$lib/components/Search.svelte';
  import ClientRow from './ClientRow.svelte';
  import ClientRowHeader from './ClientRowHeader.svelte';
  import { onMount } from 'svelte';
  import ClientsBlankState from './ClientsBlankState.svelte';
  import SlidePanel from '$lib/components/SlidePanel.svelte';
  import ClientForm from './ClientForm.svelte';

  let isClientsFormShowing: boolean = false;

  const closePanel = () => {
    isClientsFormShowing = false;
  };

  onMount(() => {
    loadClients();
  });
</script>

<svelte:head>
  <title>Clients Page | Shekalim</title>
</svelte:head>

<div
  class="flex flex-col-reverse md:flex-row justify-between items-start md:items-center mb-7 gap-y-6 md:gap-y-4 lg:mb-16"
>
  <!-- Search -->
  {#if $clients.length > 0}
    <Search />
  {:else}
    <div />
  {/if}
  <!-- New client BTN -->
  <div>
    <Button
      label="+ Client"
      onClick={() => {
        isClientsFormShowing = true;
      }}
    />
  </div>
</div>

<!-- Clients -->
<div>
  {#if $clients === null}
    <p>Loading ...</p>
  {:else if $clients.length === 0}
    <ClientsBlankState />
  {:else}
    <ClientRowHeader />
    <!-- client rows -->
    <div class="flex flex-col-reverse">
      {#each $clients as client}
        <ClientRow {client} />
      {/each}
    </div>
  {/if}
</div>

<!-- Slide panel -->
{#if isClientsFormShowing}
  <SlidePanel on:closePanel={closePanel}>
    <ClientForm {closePanel} />
  </SlidePanel>
{/if}
