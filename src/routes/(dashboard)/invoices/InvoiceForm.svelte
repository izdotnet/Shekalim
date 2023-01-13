<script lang="ts">
  import { clients, loadClients } from '$lib/stores/clientStore';
  import { slide } from 'svelte/transition';
  import LineItemRows from './LineItemRows.svelte';
  import Button from '$lib/components/Button.svelte';
  import Trash from '$lib/components/icons/Trash.svelte';
  import { v4 as uuid } from 'uuid';
  import { cities } from '$lib/utils/cities';
  import { onMount } from 'svelte';

  const blankLineItem = {
    id: uuid(),
    description: '',
    quantity: 0,
    amount: 0
  };

  let lineItems: LineItem[] = [{ ...blankLineItem }];
  let isNewClient: boolean = false;

  const addLineItem = () => (lineItems = [...lineItems, { ...blankLineItem, id: uuid() }]);

  const removeLineItem = (event: any) =>
    (lineItems = lineItems.filter((item) => item.id !== event.detail));

  const updateLineItem = () => {
    lineItems = lineItems;
  };

  onMount(() => {
    loadClients();
  });
</script>

<h2 class="mb-7 font-sansSerif text-3xl font-bold text-blue-700">Add an Invoice</h2>

<form class="grid grid-cols-6 gap-x-5">
  <!-- client -->
  <div class="field col-span-4">
    {#if !isNewClient}
      <label for="client">Client</label>
      <div class="flex items-end gap-x-5">
        <select name="client" id="client">
          {#each $clients as client}
            <option value={client.id}>{client.name}</option>
          {/each}
        </select>

        <div class="text-base font-bold leading-[3.5rem] text-monsoon">or</div>
        <Button
          label="+ Client"
          onClick={() => {
            isNewClient = true;
          }}
          style="outline"
          isAnimated={false}
        />
      </div>
    {:else}
      <label for="newClient">New Client</label>
      <div class="flex items-end gap-x-5">
        <input type="text" name="newClient" />
        <div class="text-base font-bold leading-[3.5rem] text-monsoon">or</div>
        <Button
          label="Existing Client"
          onClick={() => {
            isNewClient = false;
          }}
          style="outline"
          isAnimated={false}
        />
      </div>
    {/if}
  </div>

  <!-- invoice id -->
  <div class="field col-span-2">
    <label for="id">Invoice ID</label>
    <input type="number" name="id" />
  </div>

  <!-- New client -->
  {#if isNewClient}
    <div class="field grid col-span-6 gap-x-3" transition:slide>
      <div class="field col-span-6">
        <label for="email">Client's Email</label>
        <input type="email" name="email" id="email" />
      </div>

      <div class="col-span-6">
        <label for="street">Street</label>
        <input type="text" name="street" id="street" />
      </div>

      <div class="field col-span-4">
        <label for="city">City</label>
        <select name="country" id="country">
          {#each cities as city}
            <option value={city.value}>{city.name}</option>
          {/each}
        </select>
      </div>

      <div class="field col-span-2">
        <label for="zipCode">Zip Code</label>
        <input type="text" name="zipCode" id="zipCode" />
      </div>
    </div>
  {/if}

  <!-- due date -->
  <div class="field col-span-2">
    <label for="dueDate">Due Date</label>
    <input type="date" name="dueDate" />
  </div>

  <!-- issue date -->
  <div class="field col-span-2 col-start-5">
    <label for="issueDate">Issue Date</label>
    <input type="date" name="issueDate" />
  </div>

  <!-- subject -->
  <div class="field col-span-6">
    <label for="subject">Subject</label>
    <input type="text" name="subject" />
  </div>

  <!-- line items -->
  <div class="field col-span-6">
    <LineItemRows
      {lineItems}
      on:addLineItem={addLineItem}
      on:removeLineItem={removeLineItem}
      on:updateLineItem={updateLineItem}
    />
  </div>

  <!-- notes -->
  <div class="field col-span-6">
    <label for="notes"
      >Notes <span class="font-normal">(optional, displayed on invoice)</span></label
    >
    <textarea name="notes" id="notes" />
  </div>

  <!-- terms -->
  <div class="field col-span-6">
    <label for="terms"
      >Terms <span class="font-normal">(optional, enter your terms and conditions)</span></label
    >
    <textarea name="terms" id="terms" />
    <div class="text-xs text-gray-400">
      Formatting tips: <strong>*bold*</strong>, <em>_italics_</em>.
    </div>
  </div>

  <!-- buttons -->
  <div class="field col-span-2">
    <!-- only be visible if editing -->
    <Button
      style="textOnlyDestructive"
      label="Delete"
      isAnimated={false}
      onClick={() => {}}
      iconLeft={Trash}
    />
  </div>
  <div class="field col-span-4 flex justify-end gap-x-5">
    <Button label="Cancel" style="secondary" isAnimated={false} onClick={() => {}} />
    <Button label="Save" onClick={() => {}} />
  </div>
</form>
