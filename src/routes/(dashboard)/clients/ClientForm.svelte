<script lang="ts">
  import { addClient, updateClient } from '$lib/stores/clientStore';
  import { cities } from '$lib/utils/cities';
  import Button from '$lib/components/Button.svelte';
  import Trash from '$lib/components/icons/Trash.svelte';
  import { snackbar } from '$lib/stores/snackbarStore';

  export let client: Client = {} as Client;
  export let closePanel: () => void = () => {};

  export let formStatus: 'create' | 'edit' = 'create';

  const handleSubmit = () => {
    if (formStatus === 'create') {
      addClient(client);
      snackbar.send({
        message: 'Successfully created',
        type: 'success'
      });
    } else {
      updateClient(client);
      snackbar.send({
        message: 'Successfully updated',
        type: 'success'
      });
    }

    closePanel();
  };
</script>

<h2 class="mb-7 font-sansSerif text-3xl font-bold text-blue-700">
  {formStatus === 'edit' ? 'Edit Client' : 'Add a Client'}
</h2>

<form class="grid grid-cols-6 gap-x-5" on:submit|preventDefault={handleSubmit}>
  <div class="field col-span-6">
    <label for="name">Client Name</label>
    <input type="text" name="name" required bind:value={client.name} />
  </div>

  <div class="field col-span-6">
    <label for="email">Email</label>
    <input type="email" name="email" required bind:value={client.email} />
  </div>

  <div class="field col-span-6">
    <label for="street">Address</label>
    <input type="text" name="street" required bind:value={client.street} />
  </div>

  <div class="field col-span-2">
    <label for="country">Country</label>
    <select name="country" id="country" bind:value={client.country}>
      <option value="Israel">Israel</option>
    </select>
  </div>

  <div class="field col-span-2">
    <label for="city">City</label>
    <select name="city" id="city" bind:value={client.city}>
      <option />
      {#each cities as city}
        <option value={city.value}>{city.name}</option>
      {/each}
    </select>
  </div>

  <div class="field col-span-2">
    <label for="postalCode">Postal Code</label>
    <input type="text" name="postalCode" required minlength="5" bind:value={client.postalCode} />
  </div>

  <div class="field col-span-3">
    <Button
      label="Delete"
      onClick={() => {}}
      isAnimated={false}
      style="textOnly"
      iconLeft={Trash}
    />
  </div>

  <div class="field col-span-3 flex justify-end gap-x-5">
    <Button label="Cancel" style="secondary" onClick={closePanel} isAnimated={false} />
    <button
      type="submit"
      class="btn btn-success w-32 text-lg h-14 text-white shadow-colored hover:shadow-coloredHover translate-y-0 hover:-translate-y-2 transition-all"
      >Submit</button
    >
  </div>
</form>
