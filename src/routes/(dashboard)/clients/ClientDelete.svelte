<script lang="ts">
  import Modal from '$lib/components/Modal.svelte';
  import Button from '$lib/components/Button.svelte';
  import { createEventDispatcher } from 'svelte';
  import { snackbar } from '$lib/stores/snackbarStore';
  import { deleteClient } from '$lib/stores/clientStore';

  export let client: Client;
  export let isModalShowing = false;

  let dispatch = createEventDispatcher();
</script>

<Modal isVisible={isModalShowing} on:close>
  <div class="flex flex-col justify-between items-center gap-6 h-full min-h-[175px]">
    <div class="text-center text-xl mt-7 font-bold text-blue-700">
      Delete Client <span class="text-scarlet">{client.name}?</span>
    </div>
    <div class="flex gap-x-6 ">
      <Button
        label="Cancel"
        onClick={() => dispatch('close')}
        isAnimated={false}
        style="secondary"
      />
      <Button
        label="Delete"
        onClick={() => {
          dispatch('close');
          deleteClient(client);
          snackbar.send({
            message: 'Invoice was deleted',
            type: 'success'
          });
        }}
        isAnimated={false}
        style="destructive"
      />
    </div>
  </div>
</Modal>
